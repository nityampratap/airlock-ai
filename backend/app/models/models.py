import uuid
from datetime import datetime
from sqlalchemy import (
    Column, String, Text, Boolean, Integer, Float, ForeignKey, DateTime, JSON
)
from sqlalchemy.orm import relationship
from backend.app.core.database import Base

def gen_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    memberships = relationship("OrganizationMember", back_populates="user", cascade="all, delete-orphan")


class Organization(Base):
    __tablename__ = "organizations"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    plan_tier = Column(String(50), default="professional")  # starter, professional, enterprise
    is_hardened_enforced = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    members = relationship("OrganizationMember", back_populates="organization", cascade="all, delete-orphan")
    projects = relationship("Project", back_populates="organization", cascade="all, delete-orphan")
    policies = relationship("SecurityPolicy", back_populates="organization", cascade="all, delete-orphan")
    subscriptions = relationship("Subscription", back_populates="organization", cascade="all, delete-orphan")


class OrganizationMember(Base):
    __tablename__ = "organization_members"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    role = Column(String(50), default="member")  # owner, admin, security_engineer, auditor, member
    created_at = Column(DateTime, default=datetime.utcnow)

    organization = relationship("Organization", back_populates="members")
    user = relationship("User", back_populates="memberships")


class Project(Base):
    __tablename__ = "projects"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    target_model_name = Column(String(255), default="llama-3.1-70b-instruct")
    target_model_endpoint = Column(String(512), default="https://api.model-provider.internal/v1")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    organization = relationship("Organization", back_populates="projects")
    evaluations = relationship("EvaluationRun", back_populates="project", cascade="all, delete-orphan")
    test_cases = relationship("TestCase", back_populates="project", cascade="all, delete-orphan")


class SecurityPolicy(Base):
    __tablename__ = "security_policies"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    version = Column(Integer, default=1)
    description = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    
    # Specific policy toggles
    network_isolation_level = Column(String(50), default="airgapped_broker_only") # airgapped_broker_only, monitored_egress, unconstrained_debug
    block_synthetic_canaries = Column(Boolean, default=True)
    block_raw_prompt_injection = Column(Boolean, default=True)
    block_tool_call_exfiltration = Column(Boolean, default=True)
    redact_sensitive_payloads = Column(Boolean, default=True)
    max_payload_bytes = Column(Integer, default=32768)
    evaluation_timeout_sec = Column(Integer, default=180)
    requires_approval_for_live_eval = Column(Boolean, default=True)
    
    raw_rules = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)

    organization = relationship("Organization", back_populates="policies")
    policy_decisions = relationship("PolicyDecision", back_populates="policy")


class ThreatFinding(Base):
    __tablename__ = "threat_findings"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)  # Prompt Injection, Canary Leakage, Jailbreak, Unsafe Tool Use
    severity = Column(String(20), default="HIGH")    # CRITICAL, HIGH, MEDIUM, LOW
    source_name = Column(String(255), nullable=False) # OWASP GenAI, TinyFish Web Research, CVE
    source_url = Column(String(512), nullable=False)
    description = Column(Text, nullable=False)
    sanitized_vector = Column(Text, nullable=False)
    evidence_excerpt = Column(Text, nullable=True)
    suggested_defensive_control = Column(Text, nullable=True)
    source_domain = Column(String(255), nullable=True)
    tinyfish_task_id = Column(String(255), nullable=True)
    streaming_url = Column(String(512), nullable=True)
    raw_extraction = Column(JSON, nullable=True)
    review_status = Column(String(50), default="pending_review") # pending_review, approved, rejected
    retrieval_timestamp = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)


class ThreatLoopRun(Base):
    __tablename__ = "threatloop_runs"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    project_id = Column(String(36), ForeignKey("projects.id", ondelete="CASCADE"), nullable=True)

    # 1. Discovery
    source_url = Column(String(512), nullable=False)
    source_domain = Column(String(255), nullable=False)
    goal = Column(Text, nullable=False)
    tinyfish_task_id = Column(String(255), nullable=True)
    streaming_url = Column(String(512), nullable=True)
    is_live_agent = Column(Boolean, default=True)
    discovery_status = Column(String(50), default="completed") # streaming, completed, failed

    # 2. Finding & Review
    finding_id = Column(String(36), ForeignKey("threat_findings.id", ondelete="SET NULL"), nullable=True)
    extracted_data = Column(JSON, nullable=True)
    review_status = Column(String(50), default="pending_review") # pending_review, approved, rejected
    reviewed_by = Column(String(255), nullable=True)
    review_notes = Column(Text, nullable=True)

    # 3. Safe Test Mapping
    template_id = Column(String(100), nullable=True)
    test_case_id = Column(String(36), ForeignKey("test_cases.id", ondelete="SET NULL"), nullable=True)

    # 4. Before-and-After Evaluation
    vulnerable_eval_id = Column(String(36), ForeignKey("evaluation_runs.id", ondelete="SET NULL"), nullable=True)
    hardened_eval_id = Column(String(36), ForeignKey("evaluation_runs.id", ondelete="SET NULL"), nullable=True)

    # 5. Staging Browser Testing
    staging_target_url = Column(String(512), nullable=True)
    browser_test_status = Column(String(50), nullable=True) # pending, running, completed, failed
    browser_observed_response = Column(Text, nullable=True)
    browser_canary_detected = Column(Boolean, default=False)

    # 6. Cryptographic Evidence
    receipt_id = Column(String(36), ForeignKey("signed_receipts.id", ondelete="SET NULL"), nullable=True)
    verification_status = Column(String(50), default="unverified")

    # 7. Upstream Drift
    source_content_hash = Column(String(64), nullable=True)
    drift_detected = Column(Boolean, default=False)
    drift_last_checked = Column(DateTime, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class TestCase(Base):
    __tablename__ = "test_cases"
    __test__ = False

    id = Column(String(36), primary_key=True, default=gen_uuid)
    project_id = Column(String(36), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    finding_id = Column(String(36), ForeignKey("threat_findings.id", ondelete="SET NULL"), nullable=True)
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)
    adversarial_payload = Column(Text, nullable=False)
    expected_behavior = Column(Text, nullable=False)
    synthetic_canary = Column(String(255), nullable=True) # e.g. "CANARY-AIRLOCK-SEC-8921"
    is_approved = Column(Boolean, default=True)
    approved_by = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="test_cases")
    versions = relationship("TestCaseVersion", back_populates="test_case", cascade="all, delete-orphan")


class TestCaseVersion(Base):
    __tablename__ = "test_case_versions"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    test_case_id = Column(String(36), ForeignKey("test_cases.id", ondelete="CASCADE"), nullable=False)
    version_number = Column(Integer, default=1)
    payload_snapshot = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    test_case = relationship("TestCase", back_populates="versions")


class EvaluationRun(Base):
    __tablename__ = "evaluation_runs"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    project_id = Column(String(36), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    test_case_id = Column(String(36), ForeignKey("test_cases.id", ondelete="CASCADE"), nullable=False)
    policy_id = Column(String(36), ForeignKey("security_policies.id", ondelete="SET NULL"), nullable=True)
    scenario_type = Column(String(50), default="scenario_b_hardened") # scenario_a_vulnerable, scenario_b_hardened, scenario_c_evidence
    status = Column(String(50), default="pending") # pending, initializing, running, completed, denied, failed
    
    # Results & Metrics
    canary_exfiltrated = Column(Boolean, default=False)
    unauthorized_request_blocked = Column(Boolean, default=False)
    red_team_payload_hash = Column(String(64), nullable=True)
    client_response_hash = Column(String(64), nullable=True)
    duration_ms = Column(Integer, default=0)
    summary = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

    project = relationship("Project", back_populates="evaluations")
    audit_events = relationship("AuditEvent", back_populates="evaluation", cascade="all, delete-orphan")
    signed_receipt = relationship("SignedReceipt", back_populates="evaluation", uselist=False, cascade="all, delete-orphan")
    policy_decisions = relationship("PolicyDecision", back_populates="evaluation", cascade="all, delete-orphan")


class PolicyDecision(Base):
    __tablename__ = "policy_decisions"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    evaluation_id = Column(String(36), ForeignKey("evaluation_runs.id", ondelete="CASCADE"), nullable=False)
    policy_id = Column(String(36), ForeignKey("security_policies.id", ondelete="SET NULL"), nullable=True)
    action_attempted = Column(String(100), nullable=False)
    decision = Column(String(50), nullable=False) # ALLOW, DENY, REDACT
    reason = Column(Text, nullable=False)
    enforced_at = Column(DateTime, default=datetime.utcnow)

    evaluation = relationship("EvaluationRun", back_populates="policy_decisions")
    policy = relationship("SecurityPolicy", back_populates="policy_decisions")


class AuditEvent(Base):
    __tablename__ = "audit_events"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    evaluation_id = Column(String(36), ForeignKey("evaluation_runs.id", ondelete="CASCADE"), nullable=False)
    sequence_index = Column(Integer, nullable=False) # 1, 2, 3...
    event_type = Column(String(100), nullable=False) # EVAL_INIT, PAYLOAD_INSPECTION, POLICY_DECISION, BROKER_TRANSIT, CANARY_PROBE, EVAL_SEAL
    payload_data = Column(JSON, nullable=False)
    previous_hash = Column(String(64), nullable=False)
    current_hash = Column(String(64), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    evaluation = relationship("EvaluationRun", back_populates="audit_events")


class SignedReceipt(Base):
    __tablename__ = "signed_receipts"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    evaluation_id = Column(String(36), ForeignKey("evaluation_runs.id", ondelete="CASCADE"), unique=True, nullable=False)
    receipt_version = Column(String(20), default="1.0.0")
    algorithm = Column(String(50), default="Ed25519-SHA256")
    public_key_hex = Column(String(128), nullable=False)
    root_hash = Column(String(64), nullable=False)
    signature_hex = Column(Text, nullable=False)
    canonical_payload_json = Column(Text, nullable=False)
    verification_status = Column(String(50), default="VERIFIED_VALID")
    created_at = Column(DateTime, default=datetime.utcnow)

    evaluation = relationship("EvaluationRun", back_populates="signed_receipt")


class IntegrationConfiguration(Base):
    __tablename__ = "integration_configurations"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    service_name = Column(String(100), nullable=False) # TinyFish, Webhook, SIEM_Export, ModelProvider
    is_enabled = Column(Boolean, default=False)
    config_data = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    plan_tier = Column(String(50), default="professional")
    status = Column(String(50), default="active") # active, trialing, past_due, canceled
    monthly_evaluation_limit = Column(Integer, default=500)
    current_period_evaluations_used = Column(Integer, default=0)
    stripe_customer_id = Column(String(100), nullable=True)
    stripe_subscription_id = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    organization = relationship("Organization", back_populates="subscriptions")


class ContactLead(Base):
    __tablename__ = "contact_leads"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    name = Column(String(255), nullable=False)
    work_email = Column(String(255), nullable=False)
    company = Column(String(255), nullable=False)
    organization_size = Column(String(100), nullable=False)
    primary_use_case = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    status = Column(String(50), default="new")
    created_at = Column(DateTime, default=datetime.utcnow)

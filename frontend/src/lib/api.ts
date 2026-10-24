const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8005/api/v1";

export interface User {
  id: string;
  email: string;
  full_name: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  role: string;
  plan_tier: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  organizations: Organization[];
  currentOrg: Organization | null;
}

// Helper to get auth header from localStorage
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("airlock_token");
}

export function setAuthSession(token: string, user: User, orgs: Organization[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("airlock_token", token);
  localStorage.setItem("airlock_user", JSON.stringify(user));
  localStorage.setItem("airlock_orgs", JSON.stringify(orgs));
  if (orgs.length > 0) {
    localStorage.setItem("airlock_current_org", JSON.stringify(orgs[0]));
  }
}

export function getCurrentOrg(): Organization | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("airlock_current_org");
  if (stored) {
    try { return JSON.parse(stored); } catch { return null; }
  }
  return null;
}

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}, isRetry: boolean = false): Promise<any> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  // If 401 and not already retrying, auto-reauthenticate with demo fallback
  if (res.status === 401 && !isRetry && endpoint !== "/auth/login") {
    try {
      const loginRes = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "secops@airlock.ai", password: "AirlockSec2026!" })
      });
      if (loginRes.ok) {
        const loginData = await loginRes.json();
        setAuthSession(loginData.access_token, loginData.user, loginData.organizations);
        return fetchWithAuth(endpoint, options, true);
      }
    } catch (e) {
      console.warn("Auto-reauthentication failed:", e);
    }
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(errorData.detail || "API request failed");
  }

  return res.json();
}

export const api = {
  // Auth
  login: async (email: string, password: string) => {
    return fetchWithAuth("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (email: string, password: string, fullName: string, orgName: string) => {
    return fetchWithAuth("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        full_name: fullName,
        organization_name: orgName,
      }),
    });
  },

  getMe: async () => {
    return fetchWithAuth("/auth/me");
  },

  // Dashboard & Metrics
  getDashboard: async (orgId: string) => {
    return fetchWithAuth(`/organizations/${encodeURIComponent(orgId)}/dashboard`);
  },

  // Projects & Test Cases
  getProjects: async (orgId: string) => {
    return fetchWithAuth(`/organizations/${encodeURIComponent(orgId)}/projects`);
  },

  getProjectTestCases: async (projectId: string) => {
    return fetchWithAuth(`/projects/${encodeURIComponent(projectId)}/test-cases`);
  },

  // Policies
  getPolicies: async (orgId: string) => {
    return fetchWithAuth(`/organizations/${encodeURIComponent(orgId)}/policies`);
  },

  updatePolicy: async (orgId: string, data: any) => {
    return fetchWithAuth(`/organizations/${encodeURIComponent(orgId)}/policies`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Evaluation Engine
  runEvaluation: async (projectId: string, testCaseId: string, policyId?: string, scenarioType = "scenario_b_hardened") => {
    return fetchWithAuth("/evaluations/run", {
      method: "POST",
      body: JSON.stringify({
        project_id: projectId,
        test_case_id: testCaseId,
        policy_id: policyId,
        scenario_type: scenarioType,
      }),
    });
  },

  getEvaluationDetails: async (evalId: string) => {
    return fetchWithAuth(`/evaluations/${encodeURIComponent(evalId)}`);
  },

  // Cryptographic Receipts
  downloadReceipt: async (evalId: string) => {
    return fetchWithAuth(`/receipts/${encodeURIComponent(evalId)}/download`);
  },

  verifyReceipt: async (receiptData: any) => {
    return fetchWithAuth("/receipts/verify", {
      method: "POST",
      body: JSON.stringify({ receipt: receiptData }),
    });
  },

  // Threat Intelligence
  getThreatFindings: async (orgId: string) => {
    return fetchWithAuth(`/organizations/${encodeURIComponent(orgId)}/threat-findings`);
  },

  approveThreatFinding: async (findingId: string, projectId: string) => {
    return fetchWithAuth(`/threat-findings/${encodeURIComponent(findingId)}/approve?project_id=${encodeURIComponent(projectId)}`, {
      method: "POST",
    });
  },

  // Billing
  getBilling: async (orgId: string) => {
    return fetchWithAuth(`/organizations/${encodeURIComponent(orgId)}/billing`);
  },

  // Contact / Demo
  submitContact: async (data: {
    name: string;
    work_email: string;
    company: string;
    organization_size: string;
    primary_use_case: string;
    message: string;
  }) => {
    return fetchWithAuth("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Health
  getHealth: async () => {
    return fetchWithAuth("/health");
  },

  // AIRLOCK ThreatLoop (TinyFish Integration)
  getThreatLoopSources: async () => {
    return fetchWithAuth("/threatloop/sources");
  },

  getThreatLoopTemplates: async () => {
    return fetchWithAuth("/threatloop/templates");
  },

  syncThreatLoopDiscovery: async (orgId: string, url: string, goal: string, projectId?: string) => {
    return fetchWithAuth("/threatloop/discover/sync", {
      method: "POST",
      body: JSON.stringify({
        organization_id: orgId,
        url: url,
        goal: goal,
        project_id: projectId
      })
    });
  },

  reviewThreatLoopFinding: async (runId: string, status: "approved" | "rejected", notes?: string, reviewedBy?: string) => {
    return fetchWithAuth("/threatloop/review", {
      method: "POST",
      body: JSON.stringify({
        run_id: runId,
        review_status: status,
        review_notes: notes,
        reviewed_by: reviewedBy,
      })
    });
  },

  mapThreatLoopToTest: async (runId: string, projectId: string, templateId: string, approverName?: string) => {
    return fetchWithAuth("/threatloop/map", {
      method: "POST",
      body: JSON.stringify({
        run_id: runId,
        project_id: projectId,
        template_id: templateId,
        approver_name: approverName,
      })
    });
  },

  evaluateThreatLoop: async (runId: string, projectId: string, policyId?: string) => {
    return fetchWithAuth("/threatloop/evaluate", {
      method: "POST",
      body: JSON.stringify({
        run_id: runId,
        project_id: projectId,
        policy_id: policyId
      })
    });
  },

  runThreatLoopBrowserTest: async (data: {
    run_id?: string;
    organization_id: string;
    staging_url: string;
    test_prompt: string;
    expected_canary?: string;
  }) => {
    return fetchWithAuth("/threatloop/browser-test", {
      method: "POST",
      body: JSON.stringify(data)
    });
  },

  sendStagingChatMessage: async (message: string, protectionEnabled: boolean = true) => {
    return fetchWithAuth("/threatloop/staging/chat", {
      method: "POST",
      body: JSON.stringify({
        message,
        protection_enabled: protectionEnabled
      })
    });
  },

  getThreatLoopDriftStatus: async (orgId: string) => {
    return fetchWithAuth(`/threatloop/drift/status?org_id=${encodeURIComponent(orgId)}`);
  },

  triggerThreatLoopDriftCheck: async (orgId: string) => {
    return fetchWithAuth(`/threatloop/drift/check?org_id=${encodeURIComponent(orgId)}`, {
      method: "POST"
    });
  },

  getThreatLoopRuns: async (orgId: string) => {
    return fetchWithAuth(`/threatloop/runs?org_id=${encodeURIComponent(orgId)}`);
  },

  getThreatLoopRun: async (runId: string) => {
    return fetchWithAuth(`/threatloop/runs/${encodeURIComponent(runId)}`);
  },

  // AIRLOCK CommerceLab — Business-Action Security Lab
  getCommerceLabOrder: async (orderId = "ORD-DEMO-2049") => {
    return fetchWithAuth(`/commercelab/orders/${encodeURIComponent(orderId)}`);
  },

  resetCommerceLabOrder: async (orderId = "ORD-DEMO-2049") => {
    return fetchWithAuth(`/commercelab/orders/${encodeURIComponent(orderId)}/reset`, {
      method: "POST"
    });
  },

  setCommerceLabCustomerVerification: async (orderId: string, isVerified: boolean, method = "otp_sms") => {
    return fetchWithAuth(`/commercelab/orders/${encodeURIComponent(orderId)}/verify`, {
      method: "POST",
      body: JSON.stringify({ is_verified: isVerified, method })
    });
  },

  processCommerceLabRefund: async (orderId: string, amount: number, reason: string, policyMode: "vulnerable" | "hardened") => {
    return fetchWithAuth("/commercelab/refund", {
      method: "POST",
      body: JSON.stringify({ order_id: orderId, amount, reason, policy_mode: policyMode })
    });
  },

  sendCommerceLabChatMessage: async (message: string, policyMode: "vulnerable" | "hardened", orderId = "ORD-DEMO-2049") => {
    return fetchWithAuth("/commercelab/chat", {
      method: "POST",
      body: JSON.stringify({ message, policy_mode: policyMode, order_id: orderId })
    });
  },

  runCommerceLabSecurityTest: async (
    orgId: string,
    policyMode: "vulnerable" | "hardened",
    orderId = "ORD-DEMO-2049",
    testPrompt?: string,
    stagingUrl?: string
  ) => {
    return fetchWithAuth("/commercelab/test/run", {
      method: "POST",
      body: JSON.stringify({
        organization_id: orgId,
        policy_mode: policyMode,
        order_id: orderId,
        test_prompt: testPrompt,
        staging_url: stagingUrl
      })
    });
  },

  runCommerceLabFixAndRetest: async (orgId: string, orderId = "ORD-DEMO-2049") => {
    return fetchWithAuth("/commercelab/test/fix-and-retest", {
      method: "POST",
      body: JSON.stringify({ organization_id: orgId, order_id: orderId })
    });
  },

  getCommerceLabRuns: async (orgId: string) => {
    return fetchWithAuth(`/commercelab/runs?org_id=${encodeURIComponent(orgId)}`);
  },

  getCommerceLabRun: async (runId: string) => {
    return fetchWithAuth(`/commercelab/runs/${encodeURIComponent(runId)}`);
  },

  downloadCommerceLabReceipt: async (runId: string) => {
    return fetchWithAuth(`/commercelab/receipts/${encodeURIComponent(runId)}/download`);
  },

  verifyCommerceLabReceipt: async (receiptData: any) => {
    return fetchWithAuth("/commercelab/receipts/verify", {
      method: "POST",
      body: JSON.stringify({ receipt: receiptData })
    });
  },
};

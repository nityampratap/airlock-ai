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

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
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
    return fetchWithAuth(`/organizations/${orgId}/dashboard`);
  },

  // Projects & Test Cases
  getProjects: async (orgId: string) => {
    return fetchWithAuth(`/organizations/${orgId}/projects`);
  },

  getProjectTestCases: async (projectId: string) => {
    return fetchWithAuth(`/projects/${projectId}/test-cases`);
  },

  // Policies
  getPolicies: async (orgId: string) => {
    return fetchWithAuth(`/organizations/${orgId}/policies`);
  },

  updatePolicy: async (orgId: string, data: any) => {
    return fetchWithAuth(`/organizations/${orgId}/policies`, {
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
    return fetchWithAuth(`/evaluations/${evalId}`);
  },

  // Cryptographic Receipts
  downloadReceipt: async (evalId: string) => {
    return fetchWithAuth(`/receipts/${evalId}/download`);
  },

  verifyReceipt: async (receiptData: any) => {
    return fetchWithAuth("/receipts/verify", {
      method: "POST",
      body: JSON.stringify({ receipt: receiptData }),
    });
  },

  // Threat Intelligence
  getThreatFindings: async (orgId: string) => {
    return fetchWithAuth(`/organizations/${orgId}/threat-findings`);
  },

  approveThreatFinding: async (findingId: string, projectId: string) => {
    return fetchWithAuth(`/threat-findings/${findingId}/approve?project_id=${projectId}`, {
      method: "POST",
    });
  },

  // Billing
  getBilling: async (orgId: string) => {
    return fetchWithAuth(`/organizations/${orgId}/billing`);
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

  reviewThreatLoopFinding: async (runId: string, status: "approved" | "rejected", notes?: string, reviewedBy = "Elena Vance") => {
    return fetchWithAuth("/threatloop/review", {
      method: "POST",
      body: JSON.stringify({
        run_id: runId,
        review_status: status,
        review_notes: notes,
        reviewed_by: reviewedBy
      })
    });
  },

  mapThreatLoopToTest: async (runId: string, projectId: string, templateId: string, approverName = "Elena Vance") => {
    return fetchWithAuth("/threatloop/map", {
      method: "POST",
      body: JSON.stringify({
        run_id: runId,
        project_id: projectId,
        template_id: templateId,
        approver_name: approverName
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
    return fetchWithAuth(`/threatloop/drift/status?org_id=${orgId}`);
  },

  triggerThreatLoopDriftCheck: async (orgId: string) => {
    return fetchWithAuth(`/threatloop/drift/check?org_id=${orgId}`, {
      method: "POST"
    });
  },

  getThreatLoopRuns: async (orgId: string) => {
    return fetchWithAuth(`/threatloop/runs?org_id=${orgId}`);
  },

  getThreatLoopRun: async (runId: string) => {
    return fetchWithAuth(`/threatloop/runs/${runId}`);
  },
};

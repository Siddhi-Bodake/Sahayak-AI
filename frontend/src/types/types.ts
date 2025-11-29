export type Language = "en" | "hi" | "mr";

export type Role = "farmer" | "student" | "self_employed" | "salaried" | "unemployed" | "other";

export interface User {
  id: string;
  name: string;
  email: string;
  mobileno: string;
  role: Role;
  language: Language;
  created_at?: string;
}

export interface BackendScheme {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  eligibility: string[];
  benefits: string[];
  requiredDocuments: string[];
  eligibleRoles: string[];
  tags: string[];
  ageRange?: string;
  incomeLimit?: string;
  applicationProcess?: string;
  officialWebsite?: string;
  source_url: string;
  is_new: boolean;
  created_at: string;
}

export interface Scheme {
  id: string;
  title: string;
  category: string;
  description: string;
  eligibility: string;
  benefits: string;
  application_process: string;
  source_url: string;
  is_new: boolean;
  created_at: string;
}

export interface Notification {
  user_id: string;
  message: string;
  type: string;
  scheme_id?: string;
  created_at: string;
  is_read: boolean;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface ChatResponse {
  response: string;
  schemes_count: number;
  data_source: string;
  cached: boolean;
  user?: {
    name: string;
    role: string;
  };
}

export interface SchemeExplanation {
  explanation: string;
}

// Legacy types to be removed or refactored later if needed
export interface TransactionSummary {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}

export interface ExpenseCategory {
  category: string;
  amount: number;
  percentage: number;
}

export interface CoachingTip {
  id: string;
  title: string;
  description: string;
  category: "saving" | "investment" | "budgeting" | "debt" | "planning";
  priority: "high" | "medium" | "low";
}

export interface ApplicationDraft {
  id: string;
  schemeId: string;
  schemeName: string;
  applicantName: string;
  applicantRole: Role;
  income: string;
  address: string;
  aadharNumber: string;
  phoneNumber: string;
  bankAccountNumber: string;
  ifscCode: string;
  createdAt: string;
  status: "draft" | "submitted" | "approved" | "rejected";
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export interface FinancialHealthScore {
  overall: number;
  savingsRate: number;
  debtRatio: number;
  budgetAdherence: number;
}

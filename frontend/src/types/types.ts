export type Language = "en" | "hi" | "mr";

export type Role = "farmer" | "student" | "self_employed" | "salaried" | "unemployed" | "other";

export interface User {
  name: string;
  email: string;
  role: Role;
  mobileno: string;
  language: Language;
}

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

export interface Scheme {
  id: string;
  name: string;
  category: "agriculture" | "business" | "pension" | "education" | "housing" | "general";
  shortDescription: string;
  eligibility: string[];
  benefits: string[];
  requiredDocuments: string[];
  eligibleRoles: Role[];
  tags: string[];
  ageRange?: string;
  incomeLimit?: string;
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

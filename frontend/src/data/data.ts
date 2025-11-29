import { User, TransactionSummary, ExpenseCategory, CoachingTip, Scheme, ApplicationDraft, ChatMessage } from "@/types/types";

export const mockUser: User = {
  name: "Rajesh Patil",
  role: "farmer",
  incomeRange: "₹25,000 - ₹35,000",
  fixedExpenses: 18000,
  language: "en"
};

export const mockTransactionSummary: TransactionSummary[] = [
  { month: "Jan", income: 32000, expenses: 24000, savings: 8000 },
  { month: "Feb", income: 28000, expenses: 22000, savings: 6000 },
  { month: "Mar", income: 35000, expenses: 26000, savings: 9000 },
];

export const mockExpenseCategories: ExpenseCategory[] = [
  { category: "Food & Groceries", amount: 8000, percentage: 33 },
  { category: "Utilities", amount: 4000, percentage: 17 },
  { category: "Transportation", amount: 3000, percentage: 13 },
  { category: "Healthcare", amount: 5000, percentage: 21 },
  { category: "Education", amount: 2000, percentage: 8 },
  { category: "Others", amount: 2000, percentage: 8 },
];

export const mockCoachingTips: CoachingTip[] = [
  {
    id: "tip1",
    title: "Build Emergency Fund",
    description: "Save at least 3 months of expenses for emergencies. You're doing well!",
    category: "saving",
    priority: "high"
  },
  {
    id: "tip2",
    title: "Reduce Utility Costs",
    description: "Your utility bills are higher than average. Consider energy-saving measures.",
    category: "budgeting",
    priority: "medium"
  },
  {
    id: "tip3",
    title: "Explore Investment Options",
    description: "Start a systematic investment plan with as little as ₹500/month.",
    category: "investment",
    priority: "medium"
  },
  {
    id: "tip4",
    title: "Track Daily Expenses",
    description: "Use a simple notebook or app to track every rupee you spend.",
    category: "budgeting",
    priority: "high"
  }
];

export const mockSchemes: Scheme[] = [
  {
    id: "scheme1",
    name: "PM-Kisan Credit Card (KCC)",
    category: "agriculture",
    shortDescription: "Short-term credit for farming operations at subsidized interest rates",
    eligibility: [
      "Farmers with valid land records",
      "Must own cultivable land",
      "Age: 18-75 years"
    ],
    benefits: [
      "Credit limit up to ₹3 lakh",
      "Interest rate: 7% per annum",
      "3% interest subvention",
      "Additional 3% for timely repayment"
    ],
    requiredDocuments: [
      "Land ownership documents",
      "Aadhar Card",
      "PAN Card",
      "Bank account details",
      "Passport size photos"
    ],
    eligibleRoles: ["farmer"],
    tags: ["agriculture", "credit", "subsidy"],
    ageRange: "18-75",
    incomeLimit: "No limit"
  },
  {
    id: "scheme2",
    name: "Mudra Loan - Shishu",
    category: "business",
    shortDescription: "Collateral-free loans up to ₹50,000 for micro-enterprises",
    eligibility: [
      "Small business owners",
      "Self-employed individuals",
      "Must have a viable business plan"
    ],
    benefits: [
      "Loan up to ₹50,000",
      "No collateral required",
      "Lower interest rates",
      "Easy repayment terms"
    ],
    requiredDocuments: [
      "Aadhar Card",
      "PAN Card",
      "Business plan",
      "Address proof",
      "Bank statements"
    ],
    eligibleRoles: ["self_employed", "farmer", "unemployed"],
    tags: ["business", "loan", "micro-finance"]
  },
  {
    id: "scheme3",
    name: "Mudra Loan - Kishor",
    category: "business",
    shortDescription: "Loans between ₹50,000 to ₹5 lakh for growing businesses",
    eligibility: [
      "Established micro-enterprises",
      "Business operational for at least 1 year",
      "Good credit history"
    ],
    benefits: [
      "Loan: ₹50,000 - ₹5 lakh",
      "Competitive interest rates",
      "Flexible repayment options",
      "Business growth support"
    ],
    requiredDocuments: [
      "Business registration",
      "Financial statements",
      "Aadhar & PAN Card",
      "Income tax returns",
      "Bank statements (6 months)"
    ],
    eligibleRoles: ["self_employed"],
    tags: ["business", "loan", "growth"]
  },
  {
    id: "scheme4",
    name: "PM SVANidhi",
    category: "business",
    shortDescription: "Micro-credit for street vendors up to ₹10,000",
    eligibility: [
      "Street vendors with Certificate of Vending",
      "Vendors in operation before March 24, 2020",
      "No formal business registration required"
    ],
    benefits: [
      "Initial loan: ₹10,000",
      "7% interest subsidy",
      "Incremental loans on timely repayment",
      "Digital payment incentives"
    ],
    requiredDocuments: [
      "Certificate of Vending / Identity Card",
      "Aadhar Card",
      "Bank account details",
      "Photograph",
      "Letter of Recommendation"
    ],
    eligibleRoles: ["self_employed", "unemployed"],
    tags: ["street-vendor", "micro-credit", "digital"]
  },
  {
    id: "scheme5",
    name: "Atal Pension Yojana",
    category: "pension",
    shortDescription: "Guaranteed minimum pension of ₹1,000 to ₹5,000 per month",
    eligibility: [
      "Indian citizens aged 18-40 years",
      "Must have a bank account",
      "Must have Aadhar Card"
    ],
    benefits: [
      "Guaranteed pension: ₹1,000-₹5,000/month",
      "Government co-contribution",
      "Tax benefits under 80CCD",
      "Pension to spouse on death"
    ],
    requiredDocuments: [
      "Aadhar Card",
      "Bank account details",
      "Mobile number",
      "Nominee details"
    ],
    eligibleRoles: ["farmer", "self_employed", "salaried", "unemployed"],
    tags: ["pension", "retirement", "social-security"],
    ageRange: "18-40"
  },
  {
    id: "scheme6",
    name: "Stand-Up India",
    category: "business",
    shortDescription: "Loans between ₹10 lakh to ₹1 crore for SC/ST and women entrepreneurs",
    eligibility: [
      "SC/ST or Women entrepreneurs",
      "Age: 18 years and above",
      "For new greenfield enterprises"
    ],
    benefits: [
      "Loan: ₹10 lakh - ₹1 crore",
      "Composite loan for service/trading/manufacturing",
      "Repayment: up to 7 years",
      "Margin money support"
    ],
    requiredDocuments: [
      "Detailed project report",
      "Aadhar Card & PAN Card",
      "Caste certificate (if applicable)",
      "Educational qualifications",
      "Bank statements",
      "Business plan"
    ],
    eligibleRoles: ["self_employed", "unemployed"],
    tags: ["women", "sc-st", "entrepreneurship", "loan"]
  },
  {
    id: "scheme7",
    name: "PMEGP",
    category: "business",
    shortDescription: "Subsidy for setting up micro-enterprises in manufacturing and services",
    eligibility: [
      "Age: Above 18 years",
      "Minimum 8th standard pass",
      "For new projects only",
      "Special benefits for SC/ST/OBC/Women"
    ],
    benefits: [
      "Subsidy: 15-35% of project cost",
      "Loan up to ₹25 lakh (manufacturing)",
      "Loan up to ₹10 lakh (services)",
      "Training support"
    ],
    requiredDocuments: [
      "Project proposal",
      "Educational certificates",
      "Caste certificate (if applicable)",
      "Aadhar Card & PAN Card",
      "Residence proof",
      "Bank account details"
    ],
    eligibleRoles: ["unemployed", "self_employed"],
    tags: ["self-employment", "subsidy", "manufacturing", "services"]
  }
];

export const mockApplicationDrafts: ApplicationDraft[] = [
  {
    id: "app1",
    schemeId: "scheme1",
    schemeName: "PM-Kisan Credit Card (KCC)",
    applicantName: "Rajesh Patil",
    applicantRole: "farmer",
    income: "₹30,000",
    address: "Village Shirpur, Tal. Shirpur, Dist. Dhule, Maharashtra - 425405",
    aadharNumber: "XXXX-XXXX-1234",
    phoneNumber: "+91 98765 43210",
    bankAccountNumber: "1234567890",
    ifscCode: "SBIN0001234",
    createdAt: "2024-01-15",
    status: "draft"
  }
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: "msg1",
    sender: "ai",
    text: "Namaste! I'm your financial coach. How can I help you today?",
    timestamp: "2024-01-20T10:00:00Z"
  },
  {
    id: "msg2",
    sender: "user",
    text: "I want to know about saving options for farmers",
    timestamp: "2024-01-20T10:01:00Z"
  },
  {
    id: "msg3",
    sender: "ai",
    text: "Great question! For farmers, I recommend:\n\n1. **PM-Kisan Credit Card** - Get credit up to ₹3 lakh at subsidized rates\n2. **Kisan Vikas Patra** - Double your money in 115 months\n3. **Post Office Savings** - Safe with good returns\n\nWould you like details on any of these?",
    timestamp: "2024-01-20T10:01:30Z"
  },
  {
    id: "msg4",
    sender: "user",
    text: "Tell me more about PM-Kisan Credit Card",
    timestamp: "2024-01-20T10:02:00Z"
  },
  {
    id: "msg5",
    sender: "ai",
    text: "PM-Kisan Credit Card (KCC) is perfect for you! Here's why:\n\n✅ **Interest Rate**: Only 7% per year\n✅ **Extra Discount**: 3% discount if you pay on time\n✅ **Credit Limit**: Up to ₹3 lakh\n✅ **No Collateral**: For loans up to ₹1.6 lakh\n\nYou'll need: Land documents, Aadhar, PAN, and bank account. Would you like me to help you apply?",
    timestamp: "2024-01-20T10:02:45Z"
  }
];

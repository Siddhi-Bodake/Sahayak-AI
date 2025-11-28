import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language, User, TransactionSummary, ExpenseCategory, CoachingTip, Scheme, ChatMessage, FinancialHealthScore, Role } from '@/types/types';
import { mockUser, mockTransactionSummary, mockExpenseCategories, mockCoachingTips, mockSchemes, mockChatMessages } from '@/data/data';

interface AppState {
  language: Language;
  user: User | null;
  isAuthenticated: boolean;
  transactionSummary: TransactionSummary[];
  expenseCategories: ExpenseCategory[];
  coachingTips: CoachingTip[];
  schemes: Scheme[];
  chatMessages: ChatMessage[];
  financialHealthScore: FinancialHealthScore;
  
  // Actions
  setLanguage: (language: Language) => void;
  setUser: (user: User) => void;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string, role: Role, incomeRange: string, fixedExpenses: number) => boolean;
  logout: () => void;
  updateProfile: (user: User) => void;
  addChatMessage: (message: ChatMessage) => void;
  loadMockData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'en',
      user: null,
      isAuthenticated: false,
      transactionSummary: [],
      expenseCategories: [],
      coachingTips: [],
      schemes: [],
      chatMessages: [],
      financialHealthScore: {
        overall: 0,
        savingsRate: 0,
        debtRatio: 0,
        budgetAdherence: 0
      },

      setLanguage: (language) => set({ language }),
      
      setUser: (user) => set({ user, isAuthenticated: true }),
      
      login: (email, password) => {
        // Mock login - in real app, this would call an API
        const storedUsers = localStorage.getItem('sahayak-users');
        if (storedUsers) {
          const users = JSON.parse(storedUsers);
          const foundUser = users.find((u: any) => u.email === email && u.password === password);
          if (foundUser) {
            set({ user: foundUser, isAuthenticated: true });
            return true;
          }
        }
        return false;
      },
      
      signup: (name, email, password, role, incomeRange, fixedExpenses) => {
        // Mock signup - in real app, this would call an API
        const storedUsers = localStorage.getItem('sahayak-users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        
        // Check if user already exists
        if (users.find((u: any) => u.email === email)) {
          return false;
        }
        
        const newUser = {
          name,
          email,
          password,
          role,
          incomeRange,
          fixedExpenses,
          language: 'en'
        };
        
        users.push(newUser);
        localStorage.setItem('sahayak-users', JSON.stringify(users));
        
        set({ 
          user: { name, role, incomeRange, fixedExpenses, language: 'en' }, 
          isAuthenticated: true 
        });
        
        return true;
      },
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        transactionSummary: [],
        expenseCategories: [],
        coachingTips: [],
        schemes: [],
        chatMessages: [],
        financialHealthScore: {
          overall: 0,
          savingsRate: 0,
          debtRatio: 0,
          budgetAdherence: 0
        }
      }),
      
      updateProfile: (user) => set({ user }),
      
      addChatMessage: (message) => 
        set((state) => ({ 
          chatMessages: [...state.chatMessages, message] 
        })),
      
      loadMockData: () => 
        set({
          user: mockUser,
          transactionSummary: mockTransactionSummary,
          expenseCategories: mockExpenseCategories,
          coachingTips: mockCoachingTips,
          schemes: mockSchemes,
          chatMessages: mockChatMessages,
          financialHealthScore: {
            overall: 72,
            savingsRate: 68,
            debtRatio: 85,
            budgetAdherence: 65
          }
        })
    }),
    {
      name: 'sahayak-storage',
      partialize: (state) => ({ 
        language: state.language,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

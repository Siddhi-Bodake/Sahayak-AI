import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language, User, TransactionSummary, ExpenseCategory, CoachingTip, Scheme, ChatMessage, FinancialHealthScore, Role } from '@/types/types';
import { mockUser, mockTransactionSummary, mockExpenseCategories, mockCoachingTips, mockSchemes, mockChatMessages } from '@/data/data';
import { authService } from '@/api/services/auth';

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
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, mobileno: string, language: Language) => Promise<boolean>;
  logout: () => void;
  updateProfile: (user: User) => void;
  addChatMessage: (message: ChatMessage) => void;
  loadMockData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set): AppState => ({
      language: 'en' as Language,
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

      login: async (email, password) => {
        try {
          const response = await authService.login({ email, password });
          if (response.access_token) {
            localStorage.setItem('token', response.access_token);

            // Fetch user data
            const userData = await authService.getMe();
            set({ user: userData, isAuthenticated: true });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },

      signup: async (name, email, password, mobileno, language) => {
        try {
          await authService.register({ name, email, password, mobileno, language });
          // After registration, log the user in
          const loginSuccess = await useAppStore.getState().login(email, password);
          return loginSuccess;
        } catch (error) {
          console.error('Signup error:', error);
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({
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
        });
      },

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

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language, User, TransactionSummary, ExpenseCategory, CoachingTip, Scheme, ChatMessage, FinancialHealthScore, Role } from '@/types/types';
import { mockUser, mockTransactionSummary, mockExpenseCategories, mockCoachingTips, mockSchemes, mockChatMessages } from '@/data/data';
import { authService } from '@/api/services/auth';
import { schemesService } from '@/api/services/schemes';
import { aiService } from '@/api/services/ai';

interface AppState {
  language: Language;
  user: User | null;
  isAuthenticated: boolean;
  transactionSummary: TransactionSummary[];
  expenseCategories: ExpenseCategory[];
  coachingTips: CoachingTip[];
  schemes: Scheme[];
  chatMessages: ChatMessage[];
  isChatLoading: boolean;
  financialHealthScore: FinancialHealthScore;

  // Actions
  setLanguage: (language: Language) => void;
  setUser: (user: User) => void;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, mobileno: string, language: Language) => Promise<boolean>;
  fetchSchemes: () => Promise<void>;
  logout: () => void;
  updateProfile: (user: User) => void;
  addChatMessage: (message: ChatMessage) => void;
  sendChatMessage: (message: string) => Promise<void>;
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
      isChatLoading: false,
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

      fetchSchemes: async () => {
        try {
          const schemes = await schemesService.getAllSchemes();
          set({ schemes });
        } catch (error) {
          console.error('Error fetching schemes:', error);
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

      sendChatMessage: async (message) => {
        try {
          // Add user message immediately
          const userMessage: ChatMessage = {
            id: `msg-${Date.now()}`,
            sender: 'user',
            text: message,
            timestamp: new Date().toISOString()
          };

          set((state) => ({
            chatMessages: [...state.chatMessages, userMessage],
            isChatLoading: true
          }));

          // Call AI API
          const response = await aiService.chat(message);

          // Add AI response
          const aiMessage: ChatMessage = {
            id: `msg-${Date.now()}-ai`,
            sender: 'ai',
            text: response.response,
            timestamp: new Date().toISOString()
          };

          set((state) => ({
            chatMessages: [...state.chatMessages, aiMessage],
            isChatLoading: false
          }));
        } catch (error) {
          console.error('Error sending chat message:', error);

          // Add error message
          const errorMessage: ChatMessage = {
            id: `msg-${Date.now()}-error`,
            sender: 'ai',
            text: 'I apologize, but I encountered an error. Please try again.',
            timestamp: new Date().toISOString()
          };

          set((state) => ({
            chatMessages: [...state.chatMessages, errorMessage],
            isChatLoading: false
          }));
        }
      },

      loadMockData: () =>
        set({
          user: mockUser,
          transactionSummary: mockTransactionSummary,
          expenseCategories: mockExpenseCategories,
          coachingTips: mockCoachingTips,
          schemes: mockSchemes, // Note: mockSchemes type might mismatch now, but we are fetching real data
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

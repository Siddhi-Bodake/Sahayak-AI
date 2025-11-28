import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { t } from "@/i18n/i18n";
import { Button } from "@/components/common/Button";
import { LanguageSwitcherModal } from "@/components/common/LanguageSwitcherModal";
import { Globe, User, LogOut } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const navigate = useNavigate();
  const { language, user, logout } = useAppStore();
  const translations = t(language);
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10 backdrop-blur-sm bg-card/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Sahayak AI
            </h1>
            {user && (
              <p className="text-sm text-muted-foreground">
                {translations.dashboard.welcome}, {user.name}!
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setLanguageModalOpen(true)}
              title="Change Language"
            >
              <Globe className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/profile")}
              title="Profile"
            >
              <User className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              title={translations.dashboard.logout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      <LanguageSwitcherModal 
        open={languageModalOpen} 
        onOpenChange={setLanguageModalOpen} 
      />
    </div>
  );
};

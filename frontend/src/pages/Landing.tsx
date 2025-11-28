import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { t } from "@/i18n/i18n";
import { Button } from "@/components/common/Button";
import { LanguageSelector } from "@/components/common/LanguageSelector";
import { Sparkles } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const { language } = useAppStore();
  const translations = t(language);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-12 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-3xl mb-4">
            <Sparkles className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-6xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {translations.landing.title}
          </h1>
          <p className="text-2xl font-medium text-secondary">
            {translations.landing.subtitle}
          </p>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            {translations.landing.tagline}
          </p>
        </div>
        
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-border space-y-6">
          <LanguageSelector />
          
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/signup")}
            className="w-full text-lg shadow-lg hover:shadow-xl"
          >
            {translations.landing.startDemo}
          </Button>
          
          <div className="text-center pt-2">
            <p className="text-sm text-muted-foreground">
              {translations.landing.haveAccount}{" "}
              <button 
                onClick={() => navigate("/login")} 
                className="text-primary hover:underline font-medium"
              >
                {translations.landing.login}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

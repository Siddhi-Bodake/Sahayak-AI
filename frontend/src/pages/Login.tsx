import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { t } from "@/i18n/i18n";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Sparkles, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { language, login } = useAppStore();
  const translations = t(language);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(formData.email, formData.password);
    
    if (success) {
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Error",
        description: translations.auth.loginError,
        variant: "destructive",
      });
    }
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-3xl">
            <Sparkles className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {translations.landing.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {translations.auth.welcome}
          </p>
        </div>
        
        <Card className="p-8 shadow-2xl" variant="elevated">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">{translations.auth.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={translations.auth.emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{translations.auth.password}</Label>
              <Input
                id="password"
                type="password"
                placeholder={translations.auth.passwordPlaceholder}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="h-12"
              />
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full shadow-lg"
            >
              <LogIn className="mr-2 h-5 w-5" />
              {translations.auth.loginButton}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {translations.auth.noAccount}{" "}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                {translations.auth.signup}
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;

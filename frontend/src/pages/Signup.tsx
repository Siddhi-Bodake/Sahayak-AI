import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { t } from "@/i18n/i18n";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Sparkles, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


const Signup = () => {
  const navigate = useNavigate();
  const { language, signup, loadMockData } = useAppStore();
  const translations = t(language);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobileno: "",
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await signup(
      formData.name,
      formData.email,
      formData.password,
      formData.mobileno,
      language
    );
    
    if (success) {
      loadMockData();
      toast({
        title: "Success",
        description: "Account created successfully",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Error",
        description: translations.auth.signupError,
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
            {translations.auth.getStarted}
          </p>
        </div>
        
        <Card className="p-8 shadow-2xl" variant="elevated">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">{translations.auth.name}</Label>
              <Input
                id="name"
                type="text"
                placeholder={translations.auth.namePlaceholder}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">{translations.auth.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={translations.auth.emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-11"
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
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mobileno">Phone Number</Label>
              <Input
                id="mobileno"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.mobileno}
                onChange={(e) => setFormData({ ...formData, mobileno: e.target.value })}
                required
                className="h-11"
              />
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full shadow-lg"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              {translations.auth.signupButton}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {translations.auth.haveAccount}{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                {translations.auth.login}
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;

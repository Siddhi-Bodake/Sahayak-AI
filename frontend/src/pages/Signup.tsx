import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { t } from "@/i18n/i18n";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role } from "@/types/types";
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
    role: "" as Role | "",
    incomeRange: "",
    fixedExpenses: ""
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.role) return;
    
    const success = signup(
      formData.name,
      formData.email,
      formData.password,
      formData.role as Role,
      formData.incomeRange,
      parseInt(formData.fixedExpenses)
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
  
  const roles: Role[] = ["farmer", "student", "self_employed", "salaried", "unemployed", "other"];
  
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
              <Label htmlFor="role">{translations.onboarding.role}</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value as Role })}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder={translations.onboarding.selectRole} />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {translations.onboarding.roles[role]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="income">{translations.onboarding.income}</Label>
              <Input
                id="income"
                type="text"
                placeholder={translations.onboarding.incomePlaceholder}
                value={formData.incomeRange}
                onChange={(e) => setFormData({ ...formData, incomeRange: e.target.value })}
                required
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expenses">{translations.onboarding.expenses}</Label>
              <Input
                id="expenses"
                type="number"
                placeholder={translations.onboarding.expensesPlaceholder}
                value={formData.fixedExpenses}
                onChange={(e) => setFormData({ ...formData, fixedExpenses: e.target.value })}
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

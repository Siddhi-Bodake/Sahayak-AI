import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { t } from "@/i18n/i18n";
import { Button } from "@/components/common/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { Role } from "@/types/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();
  const { language, setUser, loadMockData } = useAppStore();
  const translations = t(language);
  
  const [formData, setFormData] = useState({
    name: "",
    role: "" as Role | "",
    incomeRange: "",
    fixedExpenses: ""
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.role || !formData.incomeRange || !formData.fixedExpenses) {
      return;
    }
    
    setUser({
      name: formData.name,
      role: formData.role as Role,
      incomeRange: formData.incomeRange,
      fixedExpenses: parseInt(formData.fixedExpenses),
      language
    });
    
    loadMockData();
    navigate("/dashboard");
  };
  
  const roles: Role[] = ["farmer", "student", "self_employed", "salaried", "unemployed", "other"];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-display">{translations.onboarding.title}</CardTitle>
          <CardDescription className="text-base">{translations.onboarding.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">{translations.onboarding.name}</Label>
              <Input
                id="name"
                type="text"
                placeholder={translations.onboarding.namePlaceholder}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">{translations.onboarding.role}</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value as Role })}
              >
                <SelectTrigger className="h-12">
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
                className="h-12"
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
                className="h-12"
              />
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full shadow-lg"
            >
              {translations.onboarding.submit}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;

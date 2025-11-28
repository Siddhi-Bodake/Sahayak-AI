import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { t } from "@/i18n/i18n";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role } from "@/types/types";
import { Save, X, User as UserIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AppLayout } from "@/components/layout/AppLayout";

const Profile = () => {
  const { language, user, updateProfile } = useAppStore();
  const translations = t(language);
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    role: user?.role || "" as Role | "",
    incomeRange: user?.incomeRange || "",
    fixedExpenses: user?.fixedExpenses?.toString() || ""
  });
  
  const handleSave = () => {
    if (!formData.role) return;
    
    updateProfile({
      name: formData.name,
      role: formData.role as Role,
      incomeRange: formData.incomeRange,
      fixedExpenses: parseInt(formData.fixedExpenses),
      language
    });
    
    toast({
      title: "Success",
      description: translations.profile.updateSuccess,
    });
    
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      role: user?.role || "",
      incomeRange: user?.incomeRange || "",
      fixedExpenses: user?.fixedExpenses?.toString() || ""
    });
    setIsEditing(false);
  };
  
  const roles: Role[] = ["farmer", "student", "self_employed", "salaried", "unemployed", "other"];
  
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <UserIcon className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              {translations.profile.title}
            </h1>
          </div>
          
          {!isEditing && (
            <Button
              variant="primary"
              onClick={() => setIsEditing(true)}
            >
              {translations.profile.editProfile}
            </Button>
          )}
        </div>
        
        <Card className="p-8 shadow-lg" variant="elevated">
          <h2 className="text-xl font-semibold mb-6">
            {translations.profile.personalInfo}
          </h2>
          
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">{translations.profile.name}</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">{translations.profile.role}</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value as Role })}
                disabled={!isEditing}
              >
                <SelectTrigger className="h-12">
                  <SelectValue />
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
              <Label htmlFor="income">{translations.profile.income}</Label>
              <Input
                id="income"
                type="text"
                value={formData.incomeRange}
                onChange={(e) => setFormData({ ...formData, incomeRange: e.target.value })}
                disabled={!isEditing}
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expenses">{translations.profile.expenses}</Label>
              <Input
                id="expenses"
                type="number"
                value={formData.fixedExpenses}
                onChange={(e) => setFormData({ ...formData, fixedExpenses: e.target.value })}
                disabled={!isEditing}
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label>{translations.profile.language}</Label>
              <Input
                type="text"
                value={language === 'en' ? 'English' : language === 'hi' ? 'हिंदी' : 'मराठी'}
                disabled
                className="h-12 bg-muted"
              />
            </div>
          </div>
          
          {isEditing && (
            <div className="flex gap-3 mt-6">
              <Button
                variant="primary"
                onClick={handleSave}
                className="flex-1"
              >
                <Save className="mr-2 h-4 w-4" />
                {translations.profile.saveChanges}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
              >
                <X className="mr-2 h-4 w-4" />
                {translations.profile.cancel}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </AppLayout>
  );
};

export default Profile;

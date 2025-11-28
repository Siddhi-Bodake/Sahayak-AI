import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Language } from "@/types/types";
import { t } from "@/i18n/i18n";
import { Button } from "./Button";
import { Card } from "./Card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageSwitcherModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LanguageSwitcherModal = ({ open, onOpenChange }: LanguageSwitcherModalProps) => {
  const { language, setLanguage } = useAppStore();
  const translations = t(language);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  
  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "hi", name: "Hindi", nativeName: "हिंदी" },
    { code: "mr", name: "Marathi", nativeName: "मराठी" }
  ];
  
  const handleApply = () => {
    setLanguage(selectedLanguage);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            {translations.languageModal.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-3">
            {languages.map((lang) => (
              <Card
                key={lang.code}
                variant={selectedLanguage === lang.code ? "elevated" : "outlined"}
                interactive
                onClick={() => setSelectedLanguage(lang.code)}
                className={cn(
                  "p-4 text-center transition-all cursor-pointer",
                  selectedLanguage === lang.code && "ring-2 ring-primary ring-offset-2"
                )}
              >
                <div className="font-display font-semibold text-lg">{lang.nativeName}</div>
                <div className="text-sm text-muted-foreground mt-1">{lang.name}</div>
              </Card>
            ))}
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button
              variant="primary"
              onClick={handleApply}
              className="flex-1"
            >
              {translations.languageModal.apply}
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              {translations.languageModal.cancel}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

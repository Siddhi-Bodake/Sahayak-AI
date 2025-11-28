import { useAppStore } from "@/store/useAppStore";
import { Language } from "@/types/types";
import { Globe } from "lucide-react";
import { Card } from "./Card";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  onSelect?: (language: Language) => void;
  showLabel?: boolean;
}

export const LanguageSelector = ({ onSelect, showLabel = true }: LanguageSelectorProps) => {
  const { language, setLanguage } = useAppStore();
  
  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "hi", name: "Hindi", nativeName: "हिंदी" },
    { code: "mr", name: "Marathi", nativeName: "मराठी" }
  ];
  
  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    onSelect?.(lang);
  };
  
  return (
    <div className="space-y-4">
      {showLabel && (
        <div className="flex items-center gap-2 text-foreground">
          <Globe className="h-5 w-5 text-primary" />
          <span className="font-medium">Select Language / भाषा चुनें / भाषा निवडा</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {languages.map((lang) => (
          <Card
            key={lang.code}
            variant={language === lang.code ? "elevated" : "outlined"}
            interactive
            onClick={() => handleSelect(lang.code)}
            className={cn(
              "p-4 text-center transition-all",
              language === lang.code && "ring-2 ring-primary ring-offset-2"
            )}
          >
            <div className="font-display font-semibold text-lg">{lang.nativeName}</div>
            <div className="text-sm text-muted-foreground mt-1">{lang.name}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

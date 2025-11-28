import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { t } from "@/i18n/i18n";
import { Scheme } from "@/types/types";
import { Button } from "@/components/common/Button";
import { SchemeCard } from "@/components/schemes/SchemeCard";
import { SchemeDetails } from "@/components/schemes/SchemeDetails";
import { AppLayout } from "@/components/layout/AppLayout";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Schemes = () => {
  const navigate = useNavigate();
  const { language, user, schemes } = useAppStore();
  const translations = t(language);
  const { toast } = useToast();
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  const handleViewDetails = (scheme: Scheme) => {
    setSelectedScheme(scheme);
    setIsDetailsOpen(true);
  };
  
  const handleApply = (scheme: Scheme) => {
    toast({
      title: "Application Started",
      description: `Starting application for ${scheme.name}. Redirecting to application page...`,
    });
    
    setTimeout(() => {
      navigate("/application/app1");
    }, 1500);
  };
  
  const eligibleSchemes = schemes.filter(scheme => 
    scheme.eligibleRoles.includes(user.role)
  );
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              {translations.schemes.title}
            </h1>
            <p className="text-sm text-muted-foreground">{translations.schemes.subtitle}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eligibleSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              onViewDetails={handleViewDetails}
              onApply={handleApply}
              categoryLabel={translations.schemes.categories[scheme.category]}
              eligibilityLabel={translations.schemes.eligibility}
              benefitsLabel={translations.schemes.benefits}
              documentsLabel={translations.schemes.documents}
              applyLabel={translations.schemes.applyNow}
              viewDetailsLabel={translations.schemes.viewDetails}
            />
          ))}
        </div>
        
        {eligibleSchemes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No schemes found for your profile. Please check back later.
            </p>
          </div>
        )}
      </div>
      
      <SchemeDetails
        scheme={selectedScheme}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onApply={handleApply}
        translations={{
          eligibility: translations.schemes.eligibility,
          benefits: translations.schemes.benefits,
          documents: translations.schemes.documents,
          eligibleRoles: "Eligible Roles",
          applyNow: translations.schemes.applyNow,
          ageRange: "Age Range",
          incomeLimit: "Income Limit"
        }}
      />
    </AppLayout>
  );
};

export default Schemes;

import { useNavigate, useParams } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { t } from "@/i18n/i18n";
import { Button } from "@/components/common/Button";
import { DraftView } from "@/components/application/DraftView";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockApplicationDrafts } from "@/data/data";
import { ArrowLeft } from "lucide-react";

const ApplicationDraft = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { language, user } = useAppStore();
  const translations = t(language);
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  const draft = mockApplicationDrafts.find(d => d.id === id);
  
  if (!draft) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Application Not Found</h2>
          <Button variant="primary" onClick={() => navigate("/schemes")}>
            Back to Schemes
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/schemes")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">
              {translations.application.title}
            </h1>
            <p className="text-sm text-muted-foreground">{translations.application.subtitle}</p>
          </div>
        </div>
        
        <DraftView
          draft={draft}
          translations={{
            personalInfo: translations.application.personalInfo,
            schemeDetails: translations.application.schemeDetails,
            bankDetails: translations.application.bankDetails,
            name: translations.application.name,
            role: translations.application.role,
            income: translations.application.income,
            address: translations.application.address,
            aadhar: translations.application.aadhar,
            phone: translations.application.phone,
            account: translations.application.account,
            ifsc: translations.application.ifsc,
            status: translations.application.status,
            createdAt: translations.application.createdAt,
            download: translations.application.download,
            share: translations.application.share,
            statuses: translations.application.statuses
          }}
        />
      </div>
    </AppLayout>
  );
};

export default ApplicationDraft;

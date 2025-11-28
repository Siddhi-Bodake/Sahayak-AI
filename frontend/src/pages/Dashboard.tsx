import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { t } from "@/i18n/i18n";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { AppLayout } from "@/components/layout/AppLayout";
import { MessageCircle, FileText } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { language, user } = useAppStore();
  const translations = t(language);
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-foreground">
            {translations.dashboard.welcome}, {user.name}!
          </h2>
          <p className="text-lg text-muted-foreground">
            How can we help you today?
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card
            variant="elevated"
            interactive
            onClick={() => navigate("/chat")}
            className="p-8 space-y-4 hover:shadow-2xl transition-all cursor-pointer group"
          >
            <div className="p-4 bg-primary/10 rounded-2xl w-fit group-hover:scale-110 transition-transform">
              <MessageCircle className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-display font-bold text-foreground">
                {translations.dashboard.askCoachTitle}
              </h3>
              <p className="text-muted-foreground">
                {translations.dashboard.askCoachDesc}
              </p>
            </div>
            <Button variant="primary" size="lg" className="w-full shadow-lg">
              {translations.dashboard.askCoach}
            </Button>
          </Card>
          
          <Card
            variant="elevated"
            interactive
            onClick={() => navigate("/schemes")}
            className="p-8 space-y-4 hover:shadow-2xl transition-all cursor-pointer group"
          >
            <div className="p-4 bg-secondary/10 rounded-2xl w-fit group-hover:scale-110 transition-transform">
              <FileText className="h-10 w-10 text-secondary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-display font-bold text-foreground">
                {translations.dashboard.viewSchemesTitle}
              </h3>
              <p className="text-muted-foreground">
                {translations.dashboard.viewSchemesDesc}
              </p>
            </div>
            <Button variant="secondary" size="lg" className="w-full shadow-lg">
              {translations.dashboard.viewSchemes}
            </Button>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;

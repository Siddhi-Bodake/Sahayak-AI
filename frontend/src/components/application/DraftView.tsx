import { ApplicationDraft } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "../common/Card";
import { Button } from "../common/Button";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, FileText, User, Wallet, MapPin, Phone, CreditCard } from "lucide-react";

interface DraftViewProps {
  draft: ApplicationDraft;
  translations: {
    personalInfo: string;
    schemeDetails: string;
    bankDetails: string;
    name: string;
    role: string;
    income: string;
    address: string;
    aadhar: string;
    phone: string;
    account: string;
    ifsc: string;
    status: string;
    createdAt: string;
    download: string;
    share: string;
    statuses: {
      draft: string;
      submitted: string;
      approved: string;
      rejected: string;
    };
  };
}

export const DraftView = ({ draft, translations }: DraftViewProps) => {
  const statusColors = {
    draft: "bg-warning/10 text-warning border-warning",
    submitted: "bg-accent/10 text-accent border-accent",
    approved: "bg-success/10 text-success border-success",
    rejected: "bg-destructive/10 text-destructive border-destructive"
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">{draft.schemeName}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {translations.createdAt}: {new Date(draft.createdAt).toLocaleDateString('en-IN')}
          </p>
        </div>
        <Badge className={statusColors[draft.status]}>
          {translations.statuses[draft.status]}
        </Badge>
      </div>
      
      <Card variant="elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            {translations.personalInfo}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">{translations.name}</dt>
              <dd className="mt-1 text-base text-foreground">{draft.applicantName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">{translations.role}</dt>
              <dd className="mt-1 text-base text-foreground capitalize">{draft.applicantRole}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">{translations.income}</dt>
              <dd className="mt-1 text-base text-foreground">{draft.income}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {translations.phone}
              </dt>
              <dd className="mt-1 text-base text-foreground">{draft.phoneNumber}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {translations.address}
              </dt>
              <dd className="mt-1 text-base text-foreground">{draft.address}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">{translations.aadhar}</dt>
              <dd className="mt-1 text-base text-foreground font-mono">{draft.aadharNumber}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      
      <Card variant="elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            {translations.bankDetails}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                {translations.account}
              </dt>
              <dd className="mt-1 text-base text-foreground font-mono">{draft.bankAccountNumber}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">{translations.ifsc}</dt>
              <dd className="mt-1 text-base text-foreground font-mono">{draft.ifscCode}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          {translations.download}
        </Button>
        <Button variant="primary" className="flex-1">
          <Share2 className="mr-2 h-4 w-4" />
          {translations.share}
        </Button>
      </div>
    </div>
  );
};

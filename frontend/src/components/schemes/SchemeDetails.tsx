import { Scheme } from "@/types/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../common/Card";
import { Button } from "../common/Button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, FileText, Users, Calendar, DollarSign, X } from "lucide-react";

interface SchemeDetailsProps {
  scheme: Scheme | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (scheme: Scheme) => void;
  translations: {
    eligibility: string;
    benefits: string;
    documents: string;
    eligibleRoles: string;
    applyNow: string;
    ageRange: string;
    incomeLimit: string;
  };
}

export const SchemeDetails = ({ scheme, isOpen, onClose, onApply, translations }: SchemeDetailsProps) => {
  if (!scheme) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">{scheme.name}</DialogTitle>
          <div className="flex gap-2 mt-2">
            {scheme.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <p className="text-muted-foreground">{scheme.shortDescription}</p>
          
          {(scheme.ageRange || scheme.incomeLimit) && (
            <div className="flex gap-4 p-4 bg-muted/30 rounded-lg">
              {scheme.ageRange && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm"><strong>{translations.ageRange}:</strong> {scheme.ageRange}</span>
                </div>
              )}
              {scheme.incomeLimit && (
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="text-sm"><strong>{translations.incomeLimit}:</strong> {scheme.incomeLimit}</span>
                </div>
              )}
            </div>
          )}
          
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-success" />
              {translations.eligibility}
            </h3>
            <ul className="space-y-2">
              {scheme.eligibility.map((item, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <span className="mr-2 text-success">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-primary" />
              {translations.benefits}
            </h3>
            <ul className="space-y-2">
              {scheme.benefits.map((item, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <span className="mr-2 text-primary">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-accent" />
              {translations.documents}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scheme.requiredDocuments.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg text-sm">
                  <span className="text-accent">📄</span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => { onApply(scheme); onClose(); }}>
              {translations.applyNow}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

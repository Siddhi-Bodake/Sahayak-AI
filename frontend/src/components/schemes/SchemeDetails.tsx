import { Scheme } from "@/types/types";
import { Button } from "../common/Button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, FileText, ExternalLink } from "lucide-react";

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
          <DialogTitle className="text-2xl font-display">{scheme.title}</DialogTitle>
          <div className="flex gap-2 mt-2">
            <Badge variant="secondary">{scheme.category}</Badge>
            {scheme.is_new && (
              <Badge variant="outline" className="border-green-500 text-green-600">New</Badge>
            )}
          </div>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <p className="text-muted-foreground">{scheme.description}</p>
          
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-success" />
              {translations.eligibility}
            </h3>
            <p className="text-sm text-foreground whitespace-pre-line">
              {scheme.eligibility}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-primary" />
              {translations.benefits}
            </h3>
            <p className="text-sm text-foreground whitespace-pre-line">
              {scheme.benefits}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-accent" />
              Application Process
            </h3>
            <p className="text-sm text-foreground whitespace-pre-line">
              {scheme.application_process}
            </p>
          </div>

          {scheme.source_url && (
             <div className="flex items-center gap-2 mt-4">
               <a href={scheme.source_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                 Source <ExternalLink className="h-4 w-4" />
               </a>
             </div>
          )}
          
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

import { Scheme } from "@/types/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../common/Card";
import { Button } from "../common/Button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText, ArrowRight } from "lucide-react";

interface SchemeCardProps {
  scheme: Scheme;
  onViewDetails: (scheme: Scheme) => void;
  onApply: (scheme: Scheme) => void;
  categoryLabel: string;
  eligibilityLabel: string;
  benefitsLabel: string;
  documentsLabel: string;
  applyLabel: string;
  viewDetailsLabel: string;
}

export const SchemeCard = ({ 
  scheme, 
  onViewDetails, 
  onApply,
  categoryLabel,
  eligibilityLabel,
  benefitsLabel,
  documentsLabel,
  applyLabel,
  viewDetailsLabel
}: SchemeCardProps) => {
  return (
    <Card variant="elevated" className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {categoryLabel}
          </Badge>
          {scheme.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-lg">{scheme.name}</CardTitle>
        <CardDescription>{scheme.shortDescription}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-4 flex-1">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              {eligibilityLabel}
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {scheme.eligibility.slice(0, 2).map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              {benefitsLabel}
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {scheme.benefits.slice(0, 2).map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex gap-2 mt-6 pt-4 border-t border-border">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetails(scheme)}
            className="flex-1"
          >
            {viewDetailsLabel}
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => onApply(scheme)}
            className="flex-1"
          >
            {applyLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../common/Card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScoreCardProps {
  title: string;
  score: number;
  description?: string;
  maxScore?: number;
}

export const ScoreCard = ({ title, score, description, maxScore = 100 }: ScoreCardProps) => {
  const percentage = (score / maxScore) * 100;
  const isGood = percentage >= 70;
  
  const getColor = () => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-destructive";
  };
  
  return (
    <Card variant="elevated" className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className={cn("text-5xl font-display font-bold", getColor())}>
              {score}
            </span>
            <span className="text-2xl text-muted-foreground">/{maxScore}</span>
          </div>
          <div className={cn("p-3 rounded-full", isGood ? "bg-success/10" : "bg-destructive/10")}>
            {isGood ? (
              <TrendingUp className={cn("h-8 w-8", getColor())} />
            ) : (
              <TrendingDown className={cn("h-8 w-8", getColor())} />
            )}
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className={cn("font-semibold", getColor())}>{percentage.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={cn("h-full transition-all duration-500", 
                percentage >= 80 ? "bg-success" : percentage >= 60 ? "bg-warning" : "bg-destructive"
              )}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

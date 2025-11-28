import { Card, CardContent, CardHeader, CardTitle } from "../common/Card";
import { CoachingTip } from "@/types/types";
import { Lightbulb, TrendingUp, PiggyBank, Wallet, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface TipsListProps {
  tips: CoachingTip[];
  title: string;
}

const categoryIcons = {
  saving: PiggyBank,
  investment: TrendingUp,
  budgeting: Wallet,
  debt: Target,
  planning: Lightbulb
};

const priorityColors = {
  high: "border-l-4 border-l-destructive bg-destructive/5",
  medium: "border-l-4 border-l-warning bg-warning/5",
  low: "border-l-4 border-l-primary bg-primary/5"
};

export const TipsList = ({ tips, title }: TipsListProps) => {
  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tips.map((tip) => {
            const Icon = categoryIcons[tip.category];
            return (
              <div
                key={tip.id}
                className={cn(
                  "p-4 rounded-lg transition-all hover:scale-[1.02]",
                  priorityColors[tip.priority]
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-background shadow-sm">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-card-foreground">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

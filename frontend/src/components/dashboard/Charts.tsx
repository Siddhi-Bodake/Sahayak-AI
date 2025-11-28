import { Card, CardContent, CardHeader, CardTitle } from "../common/Card";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { TransactionSummary, ExpenseCategory } from "@/types/types";
import { ChartContainer } from "@/components/ui/chart";
import { formatCurrency } from "@/i18n/i18n";

interface IncomeExpenseChartProps {
  data: TransactionSummary[];
  title: string;
  incomeLabel: string;
  expenseLabel: string;
  savingsLabel: string;
}

export const IncomeExpenseChart = ({ data, title, incomeLabel, expenseLabel, savingsLabel }: IncomeExpenseChartProps) => {
  const chartConfig = {
    income: { label: incomeLabel, color: "hsl(var(--primary))" },
    expenses: { label: expenseLabel, color: "hsl(var(--secondary))" },
    savings: { label: savingsLabel, color: "hsl(var(--success))" }
  };
  
  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
                formatter={(value) => formatCurrency(value as number)}
              />
              <Legend />
              <Bar dataKey="income" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expenses" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
              <Bar dataKey="savings" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

interface ExpensePieChartProps {
  data: ExpenseCategory[];
  title: string;
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--success))",
  "hsl(var(--warning))",
  "hsl(var(--muted))"
];

export const ExpensePieChart = ({ data, title }: ExpensePieChartProps) => {
  const chartData = data.map(item => ({
    name: item.category,
    value: item.amount,
    percentage: item.percentage
  }));
  
  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.name}: ${entry.percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

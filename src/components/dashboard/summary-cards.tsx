import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CreditCard, PiggyBank, TrendingDown } from "lucide-react";

const summaryData = [
    { title: "Monthly Income", value: "$5,250", icon: DollarSign, change: "+5% from last month" },
    { title: "Monthly Expenses", value: "$2,890", icon: CreditCard, change: "+2% from last month" },
    { title: "Total Savings", value: "$15,730", icon: PiggyBank, change: "+$500 this month" },
    { title: "Outstanding Debt", value: "$3,420", icon: TrendingDown, change: "-$200 this month" },
]

export function SummaryCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">{item.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

import { AdvisorCard } from "@/components/dashboard/advisor-card";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { WelcomeHeader } from "@/components/dashboard/welcome-header";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <WelcomeHeader />
      <SummaryCards />
      <AdvisorCard />
    </div>
  );
}

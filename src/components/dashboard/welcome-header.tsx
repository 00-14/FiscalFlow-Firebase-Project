import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function WelcomeHeader() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Welcome back, User!</h1>
      <p className="text-muted-foreground">Here's a summary of your financial health.</p>
    </div>
  );
}

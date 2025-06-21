"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { analyzeFinancialData, AnalyzeFinancialDataOutput } from "@/ai/flows/analyze-financial-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  income: z.coerce.number().positive({ message: "Income must be a positive number." }),
  expenses: z.coerce.number().positive({ message: "Expenses must be a positive number." }),
  debts: z.string().min(1, { message: "Please describe your debts." }),
  savings: z.coerce.number().min(0, { message: "Savings can't be negative." }),
  financialGoals: z.string().min(10, { message: "Please describe your financial goals in a bit more detail." }),
});

export function AdvisorCard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeFinancialDataOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: 5000,
      expenses: 3000,
      debts: "Student loan: $10000, Credit Card: $2000",
      savings: 15000,
      financialGoals: "Save for a house down payment in 5 years and build an emergency fund.",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const analysis = await analyzeFinancialData(values);
      setResult(analysis);
    } catch (error) {
      console.error("Error analyzing financial data:", error);
      // Here you would use a toast to show the error
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Finance Advisor</CardTitle>
        <CardDescription>Get personalized insights and recommendations by providing your financial details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Income ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="5000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Expenses ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="3000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="debts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Outstanding Debts</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Student loans, credit cards" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="savings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Savings ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="15000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="financialGoals"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Financial Goals</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Save for a house, pay off debt..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Advice
                </>
              )}
            </Button>
          </form>
        </Form>
        {result && (
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-semibold tracking-tight mb-4">Your Personalized Advice</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2 text-primary">Insights</h4>
                <p className="text-muted-foreground whitespace-pre-wrap">{result.insights}</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2 text-primary">Recommendations</h4>
                <p className="text-muted-foreground whitespace-pre-wrap">{result.recommendations}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

'use server';

/**
 * @fileOverview Provides personalized financial advice based on user data.
 *
 * - analyzeFinancialData - A function that handles the analysis of financial data and provides insights.
 * - AnalyzeFinancialDataInput - The input type for the analyzeFinancialData function.
 * - AnalyzeFinancialDataOutput - The return type for the analyzeFinancialData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeFinancialDataInputSchema = z.object({
  income: z.number().describe('Monthly income.'),
  expenses: z.number().describe('Monthly expenses.'),
  debts: z.string().describe('Outstanding debts.'),
  savings: z.number().describe('Total savings.'),
  financialGoals: z.string().describe('Financial goals of the user.'),
});
export type AnalyzeFinancialDataInput = z.infer<typeof AnalyzeFinancialDataInputSchema>;

const AnalyzeFinancialDataOutputSchema = z.object({
  insights: z.string().describe('Personalized insights on the user\'s financial situation.'),
  recommendations: z.string().describe('Personalized recommendations to improve financial health.'),
});
export type AnalyzeFinancialDataOutput = z.infer<typeof AnalyzeFinancialDataOutputSchema>;

export async function analyzeFinancialData(input: AnalyzeFinancialDataInput): Promise<AnalyzeFinancialDataOutput> {
  return analyzeFinancialDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeFinancialDataPrompt',
  input: {schema: AnalyzeFinancialDataInputSchema},
  output: {schema: AnalyzeFinancialDataOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the following financial data and provide personalized insights and recommendations.

Income: {{income}}
Expenses: {{expenses}}
Debts: {{debts}}
Savings: {{savings}}
Financial Goals: {{financialGoals}}

Provide insights on their current financial situation and recommendations to achieve their goals. Focus on budgeting and saving.`,
});

const analyzeFinancialDataFlow = ai.defineFlow(
  {
    name: 'analyzeFinancialDataFlow',
    inputSchema: AnalyzeFinancialDataInputSchema,
    outputSchema: AnalyzeFinancialDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

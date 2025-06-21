// use server'
'use server';
/**
 * @fileOverview This file contains the generateSavingPlan flow, which creates a personalized saving plan based on user's financial data.
 *
 * - generateSavingPlan - A function that generates a personalized saving plan.
 * - GenerateSavingPlanInput - The input type for the generateSavingPlan function.
 * - GenerateSavingPlanOutput - The return type for the generateSavingPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSavingPlanInputSchema = z.object({
  income: z.number().describe('Monthly income.'),
  expenses: z.number().describe('Monthly expenses.'),
  financialGoals: z
    .string()
    .describe('A description of the user\u2019s financial goals.'),
});
export type GenerateSavingPlanInput = z.infer<typeof GenerateSavingPlanInputSchema>;

const GenerateSavingPlanOutputSchema = z.object({
  savingPlan: z
    .string()
    .describe(
      'A personalized saving plan including saving strategies and budgeting advice.'
    ),
});
export type GenerateSavingPlanOutput = z.infer<typeof GenerateSavingPlanOutputSchema>;

export async function generateSavingPlan(
  input: GenerateSavingPlanInput
): Promise<GenerateSavingPlanOutput> {
  return generateSavingPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSavingPlanPrompt',
  input: {schema: GenerateSavingPlanInputSchema},
  output: {schema: GenerateSavingPlanOutputSchema},
  prompt: `You are a personal finance advisor. Generate a personalized saving plan for the user based on their financial information and goals.

Income: {{income}}
Expenses: {{expenses}}
Financial Goals: {{financialGoals}}

Provide specific and actionable advice.
`,
});

const generateSavingPlanFlow = ai.defineFlow(
  {
    name: 'generateSavingPlanFlow',
    inputSchema: GenerateSavingPlanInputSchema,
    outputSchema: GenerateSavingPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

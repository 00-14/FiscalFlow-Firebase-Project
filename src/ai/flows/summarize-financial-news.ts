'use server';
/**
 * @fileOverview This file defines a Genkit flow for summarizing financial news articles and providing insights on their potential impact on a user's financial situation.
 *
 * - summarizeFinancialNews - A function that triggers the financial news summarization flow.
 * - SummarizeFinancialNewsInput - The input type for the summarizeFinancialNews function, including the news article content.
 * - SummarizeFinancialNewsOutput - The return type for the summarizeFinancialNews function, containing the summarized news and financial impact insights.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeFinancialNewsInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The content of the financial news article to be summarized.'),
  userFinancialSituation: z
    .string()
    .optional()
    .describe(
      'Optional context about the users financial situation that can be used to tailor the summarization.'
    ),
});
export type SummarizeFinancialNewsInput = z.infer<
  typeof SummarizeFinancialNewsInputSchema
>;

const SummarizeFinancialNewsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the financial news article.'),
  financialImpactInsights: z
    .string()
    .describe(
      'Insights on how the summarized news may impact the user’s financial situation.'
    ),
});
export type SummarizeFinancialNewsOutput = z.infer<
  typeof SummarizeFinancialNewsOutputSchema
>;

export async function summarizeFinancialNews(
  input: SummarizeFinancialNewsInput
): Promise<SummarizeFinancialNewsOutput> {
  return summarizeFinancialNewsFlow(input);
}

const summarizeFinancialNewsPrompt = ai.definePrompt({
  name: 'summarizeFinancialNewsPrompt',
  input: {schema: SummarizeFinancialNewsInputSchema},
  output: {schema: SummarizeFinancialNewsOutputSchema},
  prompt: `You are an AI assistant that summarizes financial news articles and provides insights on how they may impact a user's financial situation.

  Summarize the following news article:
  {{articleContent}}

  {% if userFinancialSituation %}
  Considering the users financial situation: {{userFinancialSituation}}, provide tailored insights.
  {% else %}
  Provide general insights on the impacts of this article.
  {% endif %}
  `,
});

const summarizeFinancialNewsFlow = ai.defineFlow(
  {
    name: 'summarizeFinancialNewsFlow',
    inputSchema: SummarizeFinancialNewsInputSchema,
    outputSchema: SummarizeFinancialNewsOutputSchema,
  },
  async input => {
    const {output} = await summarizeFinancialNewsPrompt(input);
    return output!;
  }
);

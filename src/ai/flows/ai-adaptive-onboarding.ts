'use server';

/**
 * @fileOverview Implements an adaptive onboarding process using AI-powered minigames.
 *
 * This file exports:
 * - `aiAdaptiveOnboarding`: Function to start the adaptive onboarding flow.
 * - `AIAdaptiveOnboardingInput`: Input type for the onboarding flow.
 * - `AIAdaptiveOnboardingOutput`: Output type for the onboarding flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIAdaptiveOnboardingInputSchema = z.object({
  userId: z.string().describe('The unique identifier of the user.'),
});
export type AIAdaptiveOnboardingInput = z.infer<typeof AIAdaptiveOnboardingInputSchema>;

const AIAdaptiveOnboardingOutputSchema = z.object({
  interests: z.array(z.string()).describe('List of identified interests.'),
  skills: z.array(z.string()).describe('List of identified skills.'),
  profileDescription: z
    .string()
    .describe('A detailed description of the user profile based on the onboarding process.'),
});
export type AIAdaptiveOnboardingOutput = z.infer<typeof AIAdaptiveOnboardingOutputSchema>;

export async function aiAdaptiveOnboarding(input: AIAdaptiveOnboardingInput): Promise<AIAdaptiveOnboardingOutput> {
  return aiAdaptiveOnboardingFlow(input);
}

const onboardingPrompt = ai.definePrompt({
  name: 'onboardingPrompt',
  input: {schema: AIAdaptiveOnboardingInputSchema},
  output: {schema: AIAdaptiveOnboardingOutputSchema},
  prompt: `You are an AI onboarding assistant designed to create personalized learning experiences.

  Analyze the user's interactions and performance in the onboarding minigames to identify their key interests and skills.
  Based on this analysis, generate a detailed user profile and suggest relevant learning activities.

  Consider these potential interests: mathematics, spatial reasoning, storytelling, visual arts, programming, construction, logical puzzles.
  Consider these potential skills: critical thinking, problem-solving, creativity, logical reasoning, spatial reasoning, verbal communication.

  Synthesize a profile description of the user.

  Output the interests, skills and profile description in JSON format.
  Here is the user ID: {{{userId}}}`,
});

const aiAdaptiveOnboardingFlow = ai.defineFlow(
  {
    name: 'aiAdaptiveOnboardingFlow',
    inputSchema: AIAdaptiveOnboardingInputSchema,
    outputSchema: AIAdaptiveOnboardingOutputSchema,
  },
  async input => {
    const {output} = await onboardingPrompt(input);
    return output!;
  }
);

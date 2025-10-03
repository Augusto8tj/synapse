'use server';

/**
 * @fileOverview This file defines a Genkit flow for personalized story creation, specifically tailored for the "Estúdio do Contador de Histórias" feature.
 *
 * The flow takes a textual description as input and generates an image based on that description.
 *
 * - `personalizedStoryCreation`: A function that orchestrates the story creation process.
 * - `PersonalizedStoryCreationInput`: The input type for the `personalizedStoryCreation` function.
 * - `PersonalizedStoryCreationOutput`: The output type for the `personalizedStoryCreation` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the personalized story creation flow
const PersonalizedStoryCreationInputSchema = z.object({
  storyDescription: z
    .string()
    .describe(
      'A detailed textual description of the story, which will be used to generate a visual representation.'
    ),
});
export type PersonalizedStoryCreationInput = z.infer<
  typeof PersonalizedStoryCreationInputSchema
>;

// Define the output schema for the personalized story creation flow
const PersonalizedStoryCreationOutputSchema = z.object({
  generatedImage: z
    .string()
    .describe(
      'A data URI containing the base64 encoded image generated from the story description.'
    ),
});
export type PersonalizedStoryCreationOutput = z.infer<
  typeof PersonalizedStoryCreationOutputSchema
>;

// Define the main function that will be called to start the story creation process
export async function personalizedStoryCreation(
  input: PersonalizedStoryCreationInput
): Promise<PersonalizedStoryCreationOutput> {
  return personalizedStoryCreationFlow(input);
}

// Define the prompt that will be used to generate the image
const storyImagePrompt = ai.definePrompt({
  name: 'storyImagePrompt',
  input: {schema: PersonalizedStoryCreationInputSchema},
  output: {schema: PersonalizedStoryCreationOutputSchema},
  prompt: `You are an AI assistant helping a 7-year-old create a story.  Based on the following story description, generate a representative image.

Story Description: {{{storyDescription}}}

Output a data URI containing the base64 encoded image.`,
});

// Define the Genkit flow for personalized story creation
const personalizedStoryCreationFlow = ai.defineFlow(
  {
    name: 'personalizedStoryCreationFlow',
    inputSchema: PersonalizedStoryCreationInputSchema,
    outputSchema: PersonalizedStoryCreationOutputSchema,
  },
  async input => {
    // Call the prompt to generate the image based on the story description
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: input.storyDescription,
    });

    // Return the generated image as a data URI
    return {generatedImage: media!.url};
  }
);

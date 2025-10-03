'use server';

/**
 * @fileOverview A Genkit flow to brainstorm and visualize inventions for the "Laboratório de Invenções".
 *
 * - `inventionLab`: A function that takes a user's invention idea and generates details and an image.
 * - `InventionLabInput`: The input type for the inventionLab function.
 * - `InventionLabOutput`: The return type for the inventionLab function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InventionLabInputSchema = z.object({
  idea: z.string().describe('The user\'s initial idea for an invention.'),
});
export type InventionLabInput = z.infer<typeof InventionLabInputSchema>;

const InventionLabOutputSchema = z.object({
  name: z.string().describe('A creative and fun name for the invention.'),
  description: z.string().describe('A detailed, imaginative description of what the invention does and how it works.'),
  materials: z.array(z.string()).describe('A list of fantastical or real materials needed to build the invention.'),
  image: z.string().describe('A data URI of a generated image representing the invention.'),
});
export type InventionLabOutput = z.infer<typeof InventionLabOutputSchema>;

export async function inventionLab(input: InventionLabInput): Promise<InventionLabOutput> {
  return inventionLabFlow(input);
}

const inventionDetailsPrompt = ai.definePrompt({
  name: 'inventionDetailsPrompt',
  input: {schema: InventionLabInputSchema},
  output: {schema: z.object({
    name: InventionLabOutputSchema.shape.name,
    description: InventionLabOutputSchema.shape.description,
    materials: InventionLabOutputSchema.shape.materials,
  })},
  prompt: `You are an eccentric and brilliant inventor, like a Willy Wonka of technology, speaking to a creative 11-year-old.
  
  A child has an idea for an invention: "{{{idea}}}"

  Your task is to brainstorm the details of this invention in a fun, exciting, and slightly wacky way.

  1.  **Invent a Name:** Create a spectacular, catchy name for the invention.
  2.  **Describe It:** Write a vivid description. How does it work? What makes it special? What amazing things can it do? Be imaginative!
  3.  **List Materials:** What is it made of? Think of a mix of real-world and fantastical items (e.g., "3 parafusos de titânio", "1/2 xícara de risada de hiena", "pó de estrela cadente"). Make it sound like a real recipe.

  Generate the response in JSON format.`,
});

const inventionLabFlow = ai.defineFlow(
  {
    name: 'inventionLabFlow',
    inputSchema: InventionLabInputSchema,
    outputSchema: InventionLabOutputSchema,
  },
  async input => {
    // Step 1: Generate the details (name, description, materials)
    const detailsResponse = await inventionDetailsPrompt(input);
    const details = detailsResponse.output!;

    // Step 2: Generate an image based on the new, richer description
    const imagePrompt = `Crie uma imagem de uma invenção fantástica no estilo de um desenho animado vibrante e detalhado. A invenção é: ${details.name}. Descrição: ${details.description}. A imagem deve ser colorida, divertida e mostrar a invenção em ação.`;
    
    const {media} = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: imagePrompt,
    });

    // Step 3: Combine details and image into the final output
    return {
      ...details,
      image: media!.url,
    };
  }
);

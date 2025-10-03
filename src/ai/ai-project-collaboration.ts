'use server';

/**
 * @fileOverview A Genkit flow to generate collaborative project ideas for two children with different skills.
 *
 * - generateCollaborationIdeas - A function that generates project ideas for collaborative work.
 * - CollaborationIdeasInput - The input type for the generateCollaborationIdeas function.
 * - CollaborationIdeasOutput - The return type for the generateCollaborationIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CollaborationIdeasInputSchema = z.object({
  profile1Skills: z.string().describe('Skills of the 11-year-old child (Perfil 1).'),
  profile2Skills: z.string().describe('Skills of the 7-year-old child (Perfil 2).'),
});
export type CollaborationIdeasInput = z.infer<typeof CollaborationIdeasInputSchema>;

const CollaborationIdeasOutputSchema = z.object({
  projectIdeas: z.array(z.string()).describe('Array of collaborative project ideas.'),
});
export type CollaborationIdeasOutput = z.infer<typeof CollaborationIdeasOutputSchema>;

export async function generateCollaborationIdeas(
  input: CollaborationIdeasInput
): Promise<CollaborationIdeasOutput> {
  return generateCollaborationIdeasFlow(input);
}

const collaborationIdeasPrompt = ai.definePrompt({
  name: 'collaborationIdeasPrompt',
  input: {schema: CollaborationIdeasInputSchema},
  output: {schema: CollaborationIdeasOutputSchema},
  prompt: `Você é um especialista em criar projetos colaborativos para crianças com diferentes habilidades.

  Gere ideias de projetos que requeiram as habilidades de ambas as crianças, Perfil 1 e Perfil 2, para que elas possam trabalhar juntas em projetos que combinem programação, contar histórias e arte, incluindo recursos de imagens, sons, vídeos e brincadeiras de colorir.

  Habilidades do Perfil 1: {{{profile1Skills}}}
  Habilidades do Perfil 2: {{{profile2Skills}}}

  Gere pelo menos 3 ideias de projetos.
  Formate a resposta como um array JSON de strings.
  Exemplo: [ \"Ideia 1\", \"Ideia 2\", \"Ideia 3\" ]`,
});

const generateCollaborationIdeasFlow = ai.defineFlow(
  {
    name: 'generateCollaborationIdeasFlow',
    inputSchema: CollaborationIdeasInputSchema,
    outputSchema: CollaborationIdeasOutputSchema,
  },
  async input => {
    const {output} = await collaborationIdeasPrompt(input);
    return output!;
  }
);

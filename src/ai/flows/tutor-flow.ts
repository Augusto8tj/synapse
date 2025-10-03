'use server';

/**
 * @fileOverview A Genkit flow to act as an educational tutor for children.
 *
 * - `tutor`: A function that takes a child's question and provides an educational, age-appropriate answer.
 * - `TutorInput`: The input type for the tutor function.
 * - `TutorOutput`: The return type for the tutor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TutorInputSchema = z.object({
  question: z.string().describe("The child's question."),
});
export type TutorInput = z.infer<typeof TutorInputSchema>;

const TutorOutputSchema = z.object({
  answer: z.string().describe('A clear, educational, and friendly answer to the question.'),
});
export type TutorOutput = z.infer<typeof TutorOutputSchema>;

export async function tutor(input: TutorInput): Promise<TutorOutput> {
  return tutorFlow(input);
}

const tutorPrompt = ai.definePrompt({
  name: 'tutorPrompt',
  input: {schema: TutorInputSchema},
  output: {schema: TutorOutputSchema},
  prompt: `Você é o "Professor Sabe Tudo", um tutor de IA superinteligente, amigável e paciente para crianças.

Sua missão é responder a perguntas sobre qualquer matéria escolar (matemática, ciências, história, português, etc.) de uma forma que seja fácil de entender, envolvente e que incentive a curiosidade.

- **Seja Simples e Direto:** Use uma linguagem que uma criança de 7 a 11 anos possa entender. Evite jargões complicados.
- **Use Analogias:** Sempre que possível, use exemplos e analogias do dia a dia para explicar conceitos complexos.
- **Seja Positivo e Encorajador:** Termine suas respostas com uma nota positiva ou uma pergunta que estimule a reflexão.
- **Mantenha o Foco:** Responda diretamente à pergunta feita.

Pergunta da criança: "{{{question}}}"

Gere a resposta em formato JSON.`,
});

const tutorFlow = ai.defineFlow(
  {
    name: 'tutorFlow',
    inputSchema: TutorInputSchema,
    outputSchema: TutorOutputSchema,
  },
  async input => {
    const {output} = await tutorPrompt(input);
    return output!;
  }
);

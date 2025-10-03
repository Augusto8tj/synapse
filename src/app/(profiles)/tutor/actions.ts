'use server';

import {
  tutor,
  type TutorInput,
  type TutorOutput,
} from '@/ai/flows/tutor-flow';

export async function generateAnswerAction(
  input: TutorInput
): Promise<{ success: boolean; data?: TutorOutput; error?: string }> {
  try {
    const result = await tutor(input);

    if (!result || !result.answer) {
      throw new Error('A IA não conseguiu gerar uma resposta.');
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Erro ao gerar resposta do tutor:', error);
    return {
      success: false,
      error: 'Houve um problema ao buscar sua resposta. Tente novamente!',
    };
  }
}

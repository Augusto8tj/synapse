'use server';

import {
  generateCollaborationIdeas,
  type CollaborationIdeasInput,
} from '@/ai/ai-project-collaboration';
import { profiles } from '@/lib/data';

export async function generateCollabIdeasAction() {
  try {
    const input: CollaborationIdeasInput = {
      profile1Skills: profiles.engenheiro.description,
      profile2Skills: profiles.narrador.description,
    };

    const result = await generateCollaborationIdeas(input);

    if (!result.projectIdeas || result.projectIdeas.length === 0) {
      throw new Error('A IA não retornou nenhuma ideia de projeto.');
    }

    return { success: true, ideas: result.projectIdeas };
  } catch (error) {
    console.error('Erro ao gerar ideias de colaboração:', error);
    return {
      success: false,
      error: 'Houve um problema ao gerar as ideias. Tente novamente!',
    };
  }
}

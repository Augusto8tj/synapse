"use server";

import {
  personalizedStoryCreation,
  type PersonalizedStoryCreationInput,
} from "@/ai/flows/personalized-story-creation";

export async function generateStoryImageAction(
  input: PersonalizedStoryCreationInput
): Promise<{ success: boolean; image?: string; error?: string }> {
  try {
    // A simple prompt augmentation to encourage a child-friendly style.
    const augmentedInput = {
      storyDescription: `Estilo de desenho animado, vibrante e amigável para crianças: ${input.storyDescription}`,
    };
    const result = await personalizedStoryCreation(augmentedInput);

    if (!result.generatedImage) {
      throw new Error("A IA não retornou uma imagem.");
    }

    return { success: true, image: result.generatedImage };
  } catch (error) {
    console.error("Erro ao gerar imagem da história:", error);
    return {
      success: false,
      error: "Houve um problema ao criar sua imagem. Tente novamente!",
    };
  }
}

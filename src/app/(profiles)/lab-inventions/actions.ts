"use server";

import {
  inventionLab,
  type InventionLabInput,
  type InventionLabOutput,
} from "@/ai/flows/invention-lab-flow";

export async function generateInventionAction(
  input: InventionLabInput
): Promise<{ success: boolean; data?: InventionLabOutput; error?: string }> {
  try {
    const result = await inventionLab(input);

    if (!result || !result.image) {
      throw new Error("A IA não conseguiu gerar os detalhes da invenção.");
    }

    return { success: true, data: result };
  } catch (error) {
    console.error("Erro ao gerar invenção:", error);
    return {
      success: false,
      error: "Houve um problema ao criar sua invenção. Tente novamente!",
    };
  }
}

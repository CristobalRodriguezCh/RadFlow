import { GoogleGenAI, Type } from "@google/genai";
import { FlowStep } from "../types";

// Helper to get AI instance
const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key not found");
  return new GoogleGenAI({ apiKey });
};

export const improveStepDescription = async (step: FlowStep): Promise<{ title: string; description: string; suggestions: string[] }> => {
  try {
    const ai = getAI();
    
    const prompt = `
      Actúa como un experto diseñador de experiencia de usuario (UX) y especialista en informática médica (Radiología/RIS/PACS).
      
      Tengo un paso en un flujo de trabajo de radiología con la siguiente información actual:
      Título: "${step.title}"
      Descripción: "${step.description}"
      Detalles actuales: ${step.details.join(', ')}
      
      Por favor, mejora el texto para que sea más profesional, claro y conciso. 
      Genera también 3 sugerencias breves de cómo optimizar este paso operativo en la vida real.
      
      Responde en formato JSON estrictamente.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Un título mejorado y corto" },
            description: { type: Type.STRING, description: "Una descripción profesional de 1 o 2 oraciones" },
            suggestions: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "3 sugerencias operativas breves"
            }
          },
          required: ["title", "description", "suggestions"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);

  } catch (error) {
    console.error("Error getting AI improvements:", error);
    throw error;
  }
};
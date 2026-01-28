
import { GoogleGenAI, Type } from "@google/genai";
import { WorkflowNode } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateWorkflowSuggestion = async (projectDescription: string): Promise<{ suggestion: string, nodes: WorkflowNode[] }> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Design a software development workflow for the following project: ${projectDescription}. 
               Break it down into specific actionable steps including planning, development, testing, and deployment.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          suggestion: { type: Type.STRING, description: "A summary of why this workflow works." },
          nodes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                type: { 
                  type: Type.STRING, 
                  enum: ['planning', 'development', 'testing', 'review', 'deployment'] 
                },
                status: { 
                  type: Type.STRING, 
                  enum: ['todo', 'in-progress', 'completed', 'blocked'] 
                }
              },
              required: ["id", "title", "description", "type", "status"]
            }
          }
        },
        required: ["suggestion", "nodes"]
      }
    }
  });

  const data = JSON.parse(response.text || "{}");
  return {
    suggestion: data.suggestion || "Custom workflow generated.",
    nodes: data.nodes || []
  };
};

export const analyzeWorkflow = async (nodes: WorkflowNode[]): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this current software development workflow and suggest improvements for efficiency and speed: ${JSON.stringify(nodes)}`,
  });
  return response.text || "No analysis available.";
};

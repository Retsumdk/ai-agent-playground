/**
 * Playground configuration and execution
 */
import { ExperimentSettings, ExperimentResult } from "./types";

export function getConfig(): ExperimentSettings {
  return {
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    temperature: parseFloat(process.env.OPENAI_TEMPERATURE || "0.7"),
    max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || "2000"),
    system_prompt: process.env.OPENAI_SYSTEM_PROMPT || "You are a helpful AI assistant.",
  };
}

export const playground = {
  async runExperiment(settings: ExperimentSettings, prompt: string): Promise<ExperimentResult> {
    const startTime = Date.now();
    const mockResponse = simulateResponse(settings, prompt);
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    return {
      content: mockResponse,
      tokensUsed: Math.floor(prompt.length / 4) + Math.floor(mockResponse.length / 4),
      duration,
      settings,
    };
  },
};

function simulateResponse(settings: ExperimentSettings, prompt: string): string {
  return `Hello! Configured with model: ${settings.model}, temperature: ${settings.temperature}. Your prompt: "${prompt.substring(0, 30)}..."`;
}

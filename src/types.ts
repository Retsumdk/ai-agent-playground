/**
 * Type definitions for AI Agent Playground
 */

export interface ExperimentSettings {
  model: string;
  temperature: number;
  max_tokens: number;
  system_prompt?: string;
}

export interface ExperimentResult {
  content: string;
  tokensUsed: number;
  duration: number;
  settings: ExperimentSettings;
}

export type AgentConfiguration = {
  name: string;
  description: string;
  settings: ExperimentSettings;
};

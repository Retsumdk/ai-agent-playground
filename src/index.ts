/**
 * AI Agent Playground
 * Interactive playground for testing AI agent behaviors and configurations
 */

import { getConfig, playground } from "./playground";
import { ExperimentSettings, ExperimentResult } from "./types";

async function main() {
  console.log("AI Agent Playground");
  console.log("-------------------");

  const settings = getConfig();
  console.log(`model: ${settings.model}`);
  console.log(`temperature: ${settings.temperature}`);
  console.log(`max_tokens: ${settings.max_tokens}`);
  console.log("-------------------");

  const prompt = "Hi, how can I help you today?";

  console.log(`\nTesting: ${prompt}`);

  try {
    const result: ExperimentResult = await playground.runExperiment(settings, prompt);
    console.log("Result:");
    console.log(result.content);
    console.log(`\nTokens used: ${result.tokensUsed}`);
  } catch (err) {
    console.error("Error: ", err);
  }

  console.log(`\nExample of using custom settings`);

  const customSettings: ExperimentSettings = {
    model: "gpt-4o-mini",
    temperature: 0.3,
    max_tokens: 500,
    system_prompt: "You are a code reviewer.",
  };

  console.log(`\nTesting with custom settings: ${customSettings.model}`);
  const customResult = await playground.runExperiment(customSettings, "Write a simple Hello World program");
  console.log("Result: " + customResult.content);
}

main();

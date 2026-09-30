import { describe, test, expect } from "bun:test";
import { getConfig, playground } from "./playground";
import type { ExperimentSettings } from "./types";

describe("getConfig", () => {
  test("returns defaults without env overrides", () => {
    const cfg = getConfig();
    expect(cfg.model).toBe("gpt-4o-mini");
    expect(cfg.temperature).toBe(0.7);
    expect(cfg.max_tokens).toBe(2000);
    expect(cfg.system_prompt).toBe("You are a helpful AI assistant.");
  });

  test("honors env overrides", () => {
    process.env.OPENAI_MODEL = "test-model";
    process.env.OPENAI_TEMPERATURE = "0.2";
    process.env.OPENAI_MAX_TOKENS = "64";
    process.env.OPENAI_SYSTEM_PROMPT = "test prompt";
    try {
      const cfg = getConfig();
      expect(cfg.model).toBe("test-model");
      expect(cfg.temperature).toBe(0.2);
      expect(cfg.max_tokens).toBe(64);
      expect(cfg.system_prompt).toBe("test prompt");
    } finally {
      delete process.env.OPENAI_MODEL;
      delete process.env.OPENAI_TEMPERATURE;
      delete process.env.OPENAI_MAX_TOKENS;
      delete process.env.OPENAI_SYSTEM_PROMPT;
    }
  });
});

describe("playground.runExperiment", () => {
  const settings: ExperimentSettings = {
    model: "gpt-4o-mini",
    temperature: 0.5,
    max_tokens: 100,
  };

  test("returns content, token estimate, duration and echoes settings", async () => {
    const result = await playground.runExperiment(settings, "Explain recursion");
    expect(result.content).toContain("gpt-4o-mini");
    expect(result.content).toContain("Explain recursion");
    expect(result.tokensUsed).toBe(
      Math.floor("Explain recursion".length / 4) + Math.floor(result.content.length / 4)
    );
    expect(result.duration).toBeGreaterThanOrEqual(0);
    expect(result.settings).toEqual(settings);
  });

  test("truncates long prompts to 30 chars in the echoed response", async () => {
    const long = "x".repeat(60);
    const result = await playground.runExperiment(settings, long);
    expect(result.content).toContain("x".repeat(30));
    expect(result.content).not.toContain("x".repeat(31));
  });
});

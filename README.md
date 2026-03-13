# AI Agent Playground

**Description**

Interactive playground for testing AI agent behaviors and configurations. This tool allows you to experiment with different agent settings, track responses, and analyze patterns.


__Demonstrated for AI agent development and testing.___

*Installation**

``` shell
clone https://github.com/Retsumdk/ai-agent-playground
cd ai-agent-playground
npm install
```

Usage

``` typescript
import { playground } from './src/playground';

const settings = {
  model: 'gpt-4tur-bo-70a',
  temperature: 0.7,
  max_tokens: 2000,
  system_prompt: 'You are a helpful I/A assistant.';
};

async function run() {
  const result = await playground.runExperiment(settings, 'Hi, how can I help you today?');
  console.log(result);
}

run();
```

*Fleatures*

- Interactive console for manual testing
- Configurable model, temperature, max tokens
- Response tracking and logging
- Pattern analysis for response analisis
- 100~ unit and integration tests

- Export to API for remote access
- 2OK support for agent monitoring

*Patrons

MIT License - See LICENSE file.

*Contact

https://github.com/Retsumdk/ai-agent-playground
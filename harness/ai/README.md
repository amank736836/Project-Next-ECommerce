# AI-Assisted Testing

This folder gives future AI agents the project context, safety boundaries, and repeatable process for maintaining test assets. Begin with [agent instructions](test-agent-instructions.md), then use [test prompts](test-prompts.md) and [generation rules](test-generation-rules.md).

The agent must follow:

```text
Analyze → Plan → Test → Record → Verify → Report
```

It must separate repository evidence from assumptions, never execute against production, never claim an unexecuted test passed, and avoid modifying application source unless a user explicitly requests a product fix.
export interface AgentHarness {
  id: string;
  name: string;
  icon: string;
  badge: string;
  description: string;
  installCommand: string;
  configFile: string;
  instructions: string;
  sampleConfig: string;
}

export const AGENT_HARNESSES: AgentHarness[] = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    icon: 'Terminal',
    badge: 'Recommended',
    description: 'Native plugin marketplace support and seamless slash-command integration (/spec, /plan, /build, /test, /review, /ship).',
    installCommand: '/plugin marketplace add addyosmani/agent-skills\n/plugin install agent-skills@addy-agent-skills',
    configFile: 'CLAUDE.md',
    instructions: 'Install via the official Claude Code plugin marketplace or use the open skills CLI.',
    sampleConfig: `# Claude Code Integration
To install all 25 skills natively into Claude Code:
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills

Or via the open skills CLI:
npx skills add addyosmani/agent-skills

Available Slash Commands:
/spec       - Spec before code
/plan       - Atomic task breakdown with proof gates
/build      - Incremental implementation (one slice at a time)
/build auto - Autonomous plan-and-build loop
/test       - Red-green-refactor TDD loop
/constraints- Decide once, enforce everywhere
/review     - 5-axis code quality review
/webperf    - Web performance & Core Web Vitals audit
/code-simplify - Clarity over cleverness
/ship       - Faster is safer deployment gates`
  },
  {
    id: 'cursor',
    name: 'Cursor',
    icon: 'Code2',
    badge: 'Popular',
    description: 'Add to project rules (.cursor/rules/ or .cursorrules) to govern Composer and Chat agent behavior.',
    installCommand: 'npx skills add addyosmani/agent-skills',
    configFile: '.cursor/rules/agent-skills.mdc',
    instructions: 'Run npx skills add or drop the rule markdown into your .cursor/rules directory.',
    sampleConfig: `---
description: Addy Osmani Agent Skills for Cursor
globs: **/*
alwaysApply: true
---

# Agent Skills Core Protocols
1. SPEC BEFORE CODE: Never jump directly to implementation when asked to build features. Draft invariants and boundaries first.
2. TESTS ARE PROOF: Always write failing tests first (RED) before writing the code that makes them pass (GREEN).
3. ATOMIC SLICES: Deliver changes in <15-minute verifiable slices.
4. ANTI-RATIONALIZATION: Never claim "I'll write tests later" or "It's just a prototype". No follow-up exists.
5. FIVE-AXIS REVIEW: Audit Correctness, Readability, Architecture, Operability, and Test Quality.`
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    icon: 'Github',
    badge: 'Enterprise',
    description: 'Inject senior-engineering guardrails and slash commands into Copilot Workspace and Chat.',
    installCommand: 'npx skills add addyosmani/agent-skills',
    configFile: '.github/copilot-instructions.md',
    instructions: 'Save instructions to .github/copilot-instructions.md in your repository root.',
    sampleConfig: `# Copilot Instructions: Agent Skills Governance

You are governed by Addy Osmani's agent-skills framework:
- If a task is underspecified, stop and ask one clarifying question with your best guess attached (/interview-me).
- When implementing logic, supply the unit test before or alongside the implementation.
- Refactor code for clarity over cleverness (/code-simplify).
- Never skip error boundaries or fail-open distributed operations.`
  },
  {
    id: 'cline',
    name: 'Cline / Roo Code',
    icon: 'Cpu',
    badge: 'Autonomous',
    description: 'Governs autonomous file-editing and terminal execution loops with strict verification gates.',
    installCommand: 'npx skills add addyosmani/agent-skills',
    configFile: '.clinerules',
    instructions: 'Place into project root as .clinerules or configure in Cline custom instructions.',
    sampleConfig: `# Cline Rules: Addy Osmani Agent Skills
- Every task must be broken into atomic steps with verifiable proofs.
- Run test suite commands after every code edit; never assume code compiles without running verification.
- Enforce Anti-Rationalization: Reject shortcuts like skipping specs, mocking everything, or delaying security reviews.`
  },
  {
    id: 'windsurf',
    name: 'Windsurf (Codeium)',
    icon: 'Layers',
    badge: 'Fast',
    description: 'Cascade-aware agent skills rules for multi-file generation and refactoring.',
    installCommand: 'npx skills add addyosmani/agent-skills',
    configFile: '.windsurfrules',
    instructions: 'Add to .windsurfrules in project root for Cascade agent execution.',
    sampleConfig: `# Windsurf Cascade Rules
- Apply spec-driven-development before multi-file edits.
- Use incremental-implementation: small atomic commits.
- Review changes against the 5-axis quality gate before concluding.`
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI / AI Studio',
    icon: 'Sparkles',
    badge: 'Google AI',
    description: 'System instructions and tool definitions for Google Gemini coding workflows.',
    installCommand: 'npx skills add addyosmani/agent-skills',
    configFile: 'GEMINI.md / System Instructions',
    instructions: 'Include in system instructions or load dynamically via workspace skills.',
    sampleConfig: `# Gemini Agent Skills System Instruction
You are an autonomous engineering agent governed by Addy Osmani's agent-skills repository.
Follow the 6 SDLC phases: Define -> Plan -> Build -> Verify -> Review -> Ship.
Enforce anti-rationalization tables: tests are proof, mocks drift, simple code gets complicated.`
  }
];

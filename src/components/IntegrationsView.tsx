import React, { useState } from 'react';
import { 
  Layers, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  CheckSquare, 
  Square, 
  Sparkles,
  Cpu,
  Code2,
  Github
} from 'lucide-react';
import { AGENT_HARNESSES, AgentHarness } from '../data/agentHarnessesData';
import { AGENT_SKILLS } from '../data/agentSkillsData';

export const IntegrationsView: React.FC = () => {
  const [selectedHarnessId, setSelectedHarnessId] = useState<string>('claude-code');
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>(
    AGENT_SKILLS.map(s => s.id)
  );
  const [copiedHarness, setCopiedHarness] = useState<string | null>(null);
  const [copiedCli, setCopiedCli] = useState(false);

  const activeHarness: AgentHarness = AGENT_HARNESSES.find(h => h.id === selectedHarnessId) || AGENT_HARNESSES[0];

  const toggleSkill = (id: string) => {
    if (selectedSkillIds.includes(id)) {
      setSelectedSkillIds(selectedSkillIds.filter(x => x !== id));
    } else {
      setSelectedSkillIds([...selectedSkillIds, id]);
    }
  };

  const selectAll = () => setSelectedSkillIds(AGENT_SKILLS.map(s => s.id));
  const deselectAll = () => setSelectedSkillIds([]);
  const selectCore9 = () => {
    const core = [
      'spec-driven-development',
      'planning-and-task-breakdown',
      'incremental-implementation',
      'test-driven-development',
      'constraint-driven-development',
      'code-review-and-quality',
      'performance-optimization',
      'code-simplification',
      'shipping-and-launch'
    ];
    setSelectedSkillIds(core);
  };

  const generatedCliCommand = selectedSkillIds.length === AGENT_SKILLS.length
    ? 'npx skills add addyosmani/agent-skills'
    : selectedSkillIds.length === 0
    ? 'npx skills add addyosmani/agent-skills --list'
    : `npx skills add addyosmani/agent-skills ${selectedSkillIds.map(s => `--skill ${s}`).join(' ')}`;

  const copyCli = () => {
    navigator.clipboard.writeText(generatedCliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const copyConfig = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHarness(id);
    setTimeout(() => setCopiedHarness(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#0c1222] border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Layers className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Agent Ecosystem Integrations & CLI</h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              70+ Supported Harnesses
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Install and configure Addy Osmani's agent skills across Claude Code, Cursor, GitHub Copilot, Cline, Windsurf, and Gemini CLI.
          </p>
        </div>

        <a
          href="https://github.com/addyosmani/agent-skills"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Github className="w-3.5 h-3.5" />
          <span>View on GitHub</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>
      </div>

      {/* Multi-Skill CLI Command Generator */}
      <div className="bg-[#0c1222] border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              Dynamic Multi-Skill CLI Command Builder
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select which skills to include in your project's install command ({selectedSkillIds.length} of {AGENT_SKILLS.length} selected).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={selectAll}
              className="text-xs px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800 transition-colors"
            >
              All 25
            </button>
            <button
              onClick={selectCore9}
              className="text-xs px-2.5 py-1 bg-indigo-950 hover:bg-indigo-900 text-indigo-300 rounded border border-indigo-800 transition-colors"
            >
              Core 9 SDLC
            </button>
            <button
              onClick={deselectAll}
              className="text-xs px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-400 rounded border border-slate-800 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Command output box */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <code className="text-xs font-mono text-emerald-400 break-all">
            $ {generatedCliCommand}
          </code>
          <button
            onClick={copyCli}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-sm transition-colors"
          >
            {copiedCli ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCli ? 'Copied CLI Command' : 'Copy Command'}</span>
          </button>
        </div>

        {/* Skill checkbox grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-2">
          {AGENT_SKILLS.map(s => {
            const isSelected = selectedSkillIds.includes(s.id);
            return (
              <div
                key={s.id}
                onClick={() => toggleSkill(s.id)}
                className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors flex items-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-950/30 border-indigo-500/40 text-slate-200'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-300'
                }`}
              >
                {isSelected ? (
                  <CheckSquare className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                ) : (
                  <Square className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                )}
                <span className="truncate">{s.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Target Agent Harness Configuration Guides */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">Agent Configuration & Rules Templates</h2>
          <p className="text-xs text-slate-400">
            Select your primary AI coding tool to inspect exact configuration files, plugin instructions, and guardrail injections.
          </p>
        </div>

        {/* Harness Selection Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {AGENT_HARNESSES.map(h => (
            <button
              key={h.id}
              onClick={() => setSelectedHarnessId(h.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedHarnessId === h.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>{h.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                selectedHarnessId === h.id ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-400'
              }`}>
                {h.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Active Harness Config Card */}
        <div className="bg-[#0c1222] border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{activeHarness.name}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  Target Config: {activeHarness.configFile}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{activeHarness.description}</p>
            </div>

            <button
              onClick={() => copyConfig(activeHarness.sampleConfig, activeHarness.id)}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition-colors shrink-0"
            >
              {copiedHarness === activeHarness.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedHarness === activeHarness.id ? 'Copied Template!' : 'Copy Config'}</span>
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">
              Instructions: {activeHarness.instructions}
            </span>
            <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
              {activeHarness.sampleConfig}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

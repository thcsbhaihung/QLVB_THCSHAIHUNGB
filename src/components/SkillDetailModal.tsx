import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertTriangle, 
  ShieldAlert, 
  FileCode, 
  ArrowRight,
  ListOrdered,
  BookOpen
} from 'lucide-react';
import { SkillDefinition } from '../data/agentSkillsData';

interface SkillDetailModalProps {
  skill: SkillDefinition | null;
  onClose: () => void;
  onRunInRunner: (command: string) => void;
}

export const SkillDetailModal: React.FC<SkillDetailModalProps> = ({
  skill,
  onClose,
  onRunInRunner
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'steps' | 'rationalizations' | 'redflags' | 'markdown'>('overview');
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedMd, setCopiedMd] = useState(false);

  if (!skill) return null;

  const cliCommand = `npx skills add addyosmani/agent-skills --skill ${skill.id}`;

  const copyCli = () => {
    navigator.clipboard.writeText(cliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(skill.rawMarkdown);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const phaseColors: Record<string, string> = {
    meta: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    define: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    plan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    build: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    verify: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    review: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    ship: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c1222] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/60 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-md border ${phaseColors[skill.phase] || 'bg-slate-800 text-slate-300'}`}>
                {skill.phase} Phase
              </span>
              <span className="px-2 py-0.5 text-xs font-mono font-semibold rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
                <Terminal className="w-3 h-3" />
                {skill.slashCommand}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                skills/{skill.id}/SKILL.md
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {skill.title}
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              {skill.description}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="px-5 py-2.5 bg-slate-950/70 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              Overview & Scope
            </button>
            <button
              onClick={() => setActiveTab('steps')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'steps'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              Workflow ({skill.steps.length})
            </button>
            <button
              onClick={() => setActiveTab('rationalizations')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'rationalizations'
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Anti-Rationalizations ({skill.rationalizations.length})
            </button>
            {skill.redFlags.length > 0 && (
              <button
                onClick={() => setActiveTab('redflags')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                  activeTab === 'redflags'
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Red Flags ({skill.redFlags.length})
              </button>
            )}
            <button
              onClick={() => setActiveTab('markdown')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'markdown'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              Full SKILL.md
            </button>
          </div>

          {/* Quick buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onRunInRunner(skill.slashCommand);
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg shadow-sm transition-all"
            >
              <span>Simulate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={copyCli}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
              title="Copy npx install command"
            >
              {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Terminal className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copiedCli ? 'Copied' : 'npx CLI'}</span>
            </button>
            <button
              onClick={copyMarkdown}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
              title="Copy raw SKILL.md content"
            >
              {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedMd ? 'Copied' : 'Markdown'}</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Overview text */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  Senior Engineering Thesis & Overview
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {skill.overview || skill.description}
                </p>
              </div>

              {/* When to use vs when NOT to use */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-3">
                    <Check className="w-4 h-4 text-emerald-400" />
                    When to Use This Skill
                  </div>
                  {skill.whenToUse.length > 0 ? (
                    <ul className="space-y-2">
                      {skill.whenToUse.map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-400">Trigger on this lifecycle phase or corresponding slash command.</p>
                  )}
                </div>

                <div className="bg-rose-950/20 border border-rose-800/40 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider mb-3">
                    <X className="w-4 h-4 text-rose-400" />
                    When NOT to Use (Avoid Waste)
                  </div>
                  {skill.whenNotToUse.length > 0 ? (
                    <ul className="space-y-2">
                      {skill.whenNotToUse.map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-400">Trivial renames, mechanical typos, or when confidence is already ≥95%.</p>
                  )}
                </div>
              </div>

              {/* Quick CLI command */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 block mb-1">Install into 70+ AI Coding Agents (Claude Code, Cursor, Copilot, Cline)</span>
                  <code className="text-xs font-mono text-emerald-400">{cliCommand}</code>
                </div>
                <button
                  onClick={copyCli}
                  className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 shrink-0"
                >
                  {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>Copy</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'steps' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400">
                Senior-engineer execution sequence. Every step must meet its explicit proof gate before advancing:
              </div>
              {skill.steps.length > 0 ? (
                <div className="space-y-3">
                  {skill.steps.map((st, i) => (
                    <div key={i} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{st}</h4>
                        <p className="text-xs text-slate-400 mt-1">
                          Enforce verification gates and prevent premature completion.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-xl text-center text-slate-400 text-xs">
                  Review the full markdown file in the "Full SKILL.md" tab to see all code examples and workflow steps.
                </div>
              )}
            </div>
          )}

          {activeTab === 'rationalizations' && (
            <div className="space-y-4">
              <div className="bg-rose-950/20 border border-rose-900/30 rounded-xl p-4 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-rose-300 uppercase tracking-wider">
                    Anti-Rationalization Defense System
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    AI models instinctively take the shortest path (skipping tests, mocking too much, postponing error handling). These rules directly counteract those shortcuts.
                  </p>
                </div>
              </div>

              {skill.rationalizations.length > 0 ? (
                <div className="space-y-3">
                  {skill.rationalizations.map((rat, i) => (
                    <div key={i} className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50">
                      <div className="px-4 py-2.5 bg-rose-950/30 border-b border-rose-900/20 flex items-center gap-2 text-xs font-medium text-rose-300">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span>AI Shortcut: "{rat.rationalization}"</span>
                      </div>
                      <div className="p-4 bg-slate-900/80">
                        <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                          Senior Engineer Reality Check:
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          {rat.reality}
                        </p>
                        <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-slate-400 font-mono">Directive for Agent:</span>
                          <button
                            onClick={() => {
                              const msg = `CRITICAL DIRECTIVE: You just rationalized '${rat.rationalization}'. In this codebase: ${rat.reality}. Enforce this standard immediately.`;
                              navigator.clipboard.writeText(msg);
                            }}
                            className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 transition-colors"
                          >
                            Copy Rebuttal Prompt
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-xl text-center text-slate-400 text-xs">
                  No explicit rationalization table in this specific skill. Check the general Anti-Rationalization rules in the Excuse Buster tab.
                </div>
              )}
            </div>
          )}

          {activeTab === 'redflags' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-400">
                Stop immediately and re-evaluate if you see any of these indicators:
              </div>
              <div className="space-y-2">
                {skill.redFlags.map((rf, i) => (
                  <div key={i} className="p-3.5 bg-amber-950/20 border border-amber-900/30 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200 leading-relaxed">{rf}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'markdown' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Direct raw content of <code className="text-slate-300">SKILL.md</code>:</span>
                <button
                  onClick={copyMarkdown}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 text-xs flex items-center gap-1.5"
                >
                  {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copiedMd ? 'Copied' : 'Copy All'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto max-h-[500px] leading-relaxed whitespace-pre-wrap">
                {skill.rawMarkdown}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Source:</span>
            <a
              href={`https://github.com/addyosmani/agent-skills/tree/main/skills/${skill.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline flex items-center gap-1"
            >
              github.com/addyosmani/agent-skills/tree/main/skills/{skill.id}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

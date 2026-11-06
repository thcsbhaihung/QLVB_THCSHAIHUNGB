import React, { useState } from 'react';
import { 
  Sliders, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Plus, 
  Trash2, 
  Eye, 
  FileCode,
  Terminal,
  ShieldAlert
} from 'lucide-react';

export const SkillBuilder: React.FC = () => {
  const [skillName, setSkillName] = useState('resilient-webhook-processing');
  const [title, setTitle] = useState('Resilient Webhook Processing');
  const [slashCommand, setSlashCommand] = useState('/webhook-guard');
  const [phase, setPhase] = useState<'define' | 'plan' | 'build' | 'verify' | 'review' | 'ship'>('build');
  const [description, setDescription] = useState(
    'Enforces idempotency, signature validation, replay defense, and asynchronous queuing for external webhook ingestion.'
  );
  const [whenToUse, setWhenToUse] = useState<string[]>([
    'Integrating Stripe, GitHub, or Shopify webhook endpoints',
    'Handling third-party async event notifications',
    'Any endpoint accepting external POST events without user session'
  ]);
  const [whenNotToUse, setWhenNotToUse] = useState<string[]>([
    'Internal trusted microservice RPC calls',
    'Synchronous user query endpoints (GET)'
  ]);
  const [steps, setSteps] = useState<string[]>([
    'Step 1: Cryptographic HMAC Signature Validation (Raw body byte check)',
    'Step 2: Idempotency Key De-duplication (Redis atomic SETNX with 24h TTL)',
    'Step 3: Immediate HTTP 200/202 Acknowledgment (<250ms SLA)',
    'Step 4: Asynchronous Queue Worker Dispatch with Exponential Backoff'
  ]);
  const [rationalizations, setRationalizations] = useState<{ rationalization: string; reality: string }[]>([
    {
      rationalization: "We can verify the JSON string after body-parser parses it",
      reality: "Re-stringifying JSON drifts whitespace and key ordering, breaking cryptographic HMAC signature validation. Always verify raw byte buffer."
    },
    {
      rationalization: "Webhooks don't duplicate often enough to need idempotency",
      reality: "Payment providers explicitly state that webhooks can be delivered at-least-once. Double billing occurs without idempotency keys."
    }
  ]);

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  const addWhenToUse = () => setWhenToUse([...whenToUse, '']);
  const updateWhenToUse = (index: number, val: string) => {
    const next = [...whenToUse];
    next[index] = val;
    setWhenToUse(next);
  };
  const removeWhenToUse = (index: number) => setWhenToUse(whenToUse.filter((_, i) => i !== index));

  const addRationalization = () => {
    setRationalizations([...rationalizations, { rationalization: '', reality: '' }]);
  };
  const updateRationalization = (index: number, key: 'rationalization' | 'reality', val: string) => {
    const next = [...rationalizations];
    next[index][key] = val;
    setRationalizations(next);
  };
  const removeRationalization = (index: number) => {
    setRationalizations(rationalizations.filter((_, i) => i !== index));
  };

  // Compile full markdown
  const compiledMarkdown = `---
name: ${skillName}
description: ${description}
---

# ${title}

## Overview
${description}

## When to Use
${whenToUse.filter(Boolean).map(item => `- ${item}`).join('\n')}

**When NOT to use:**
${whenNotToUse.filter(Boolean).map(item => `- ${item}`).join('\n')}

## The Process
${steps.filter(Boolean).map((st, i) => `### ${st}\nEnforce strict proof gate before moving forward.\n`).join('\n')}

## Common Rationalizations
| Rationalization | Reality |
|---|---|
${rationalizations.filter(r => r.rationalization && r.reality).map(r => `| "${r.rationalization}" | ${r.reality} |`).join('\n')}

## Red Flags
- Processing heavy database work synchronously before sending HTTP response.
- Missing idempotency checks on financial or mutation events.
`;

  const copyMarkdown = () => {
    navigator.clipboard.writeText(compiledMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([compiledMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SKILL.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#0c1222] border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Sliders className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Custom Skill Builder</h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              Open Skills Standard
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Author and export your team's custom production-grade <code className="text-slate-300">SKILL.md</code>. Compatible with Claude Code, Cursor, Copilot, and <code className="text-slate-300">npx skills add</code>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 text-xs font-medium transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied SKILL.md' : 'Copy SKILL.md'}</span>
          </button>
          <button
            onClick={downloadMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download File</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Skill Metadata (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0c1222] border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            Skill Properties & Metadata
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Skill Slug (Folder Name)
              </label>
              <input
                type="text"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Display Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Slash Command Trigger
              </label>
              <input
                type="text"
                value={slashCommand}
                onChange={(e) => setSlashCommand(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-amber-300 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                SDLC Phase
              </label>
              <select
                value={phase}
                onChange={(e: any) => setPhase(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="define">Define</option>
                <option value="plan">Plan</option>
                <option value="build">Build</option>
                <option value="verify">Verify</option>
                <option value="review">Review</option>
                <option value="ship">Ship</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Description & AI Agent Triggers
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* When to use items */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">When to Use:</label>
              <button
                onClick={addWhenToUse}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Trigger
              </button>
            </div>
            {whenToUse.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateWhenToUse(idx, e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => removeWhenToUse(idx)}
                  className="p-1.5 text-slate-500 hover:text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Anti-Rationalization Table */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                Anti-Rationalization Defense Table:
              </label>
              <button
                onClick={addRationalization}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Excuse
              </button>
            </div>

            {rationalizations.map((r, idx) => (
              <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Rule #{idx + 1}</span>
                  <button
                    onClick={() => removeRationalization(idx)}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Rationalization (What the AI says to cut corners)"
                  value={r.rationalization}
                  onChange={(e) => updateRationalization(idx, 'rationalization', e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-rose-300 font-medium focus:outline-none focus:border-rose-500"
                />
                <textarea
                  placeholder="Reality Check (Senior engineer uncompromising truth)"
                  value={r.reality}
                  onChange={(e) => updateRationalization(idx, 'reality', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Preview: Live SKILL.md Preview (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0c1222] border border-slate-800 rounded-2xl flex flex-col overflow-hidden">
          <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-indigo-400" />
              Live Generated <code className="text-slate-400">SKILL.md</code>
            </span>
            <button
              onClick={copyMarkdown}
              className="text-xs px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 flex items-center gap-1"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="flex-1 p-4 bg-slate-950 font-mono text-xs text-slate-300 overflow-y-auto max-h-[650px] leading-relaxed">
            <pre className="whitespace-pre-wrap">{compiledMarkdown}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

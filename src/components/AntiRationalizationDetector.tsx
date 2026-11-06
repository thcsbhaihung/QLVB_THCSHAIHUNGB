import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Check, 
  Copy, 
  Sparkles, 
  AlertTriangle, 
  Terminal, 
  Flame, 
  ArrowRight,
  Filter,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { ANTI_RATIONALIZATION_RULES, AntiRationalizationRule } from '../data/antiRationalizationsData';

interface AntiRationalizationDetectorProps {
  onOpenSkill?: (skillId: string) => void;
}

export const AntiRationalizationDetector: React.FC<AntiRationalizationDetectorProps> = ({
  onOpenSkill
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const hallOfShamePresets = [
    { label: "I'll write tests after the code works", text: "I'll write tests after the code works" },
    { label: "This is just an internal tool, security doesn't matter", text: "This is an internal tool, security doesn't matter" },
    { label: "This is too simple to need a spec", text: "This is too simple to write a spec for" },
    { label: "It's fast on my machine", text: "It's fast on my machine" },
    { label: "I'll commit when the whole feature is done", text: "I'll commit when the feature is done" },
    { label: "Asking questions wastes user's time", text: "Asking too many questions wastes their time" },
    { label: "I tested it manually", text: "I tested it manually" },
    { label: "The mock data is good enough", text: "Mocks are good enough for now" },
  ];

  // Active detected match based on user's input
  const detectedRule = useMemo(() => {
    if (!inputText.trim()) return null;
    const lower = inputText.toLowerCase().trim();

    // 1. Exact or strong substring match
    const found = ANTI_RATIONALIZATION_RULES.find(r => 
      lower.includes(r.rationalization.toLowerCase()) ||
      r.rationalization.toLowerCase().includes(lower)
    );
    if (found) return { rule: found, confidence: 95 };

    // 2. Token overlap fuzzy match
    const inputTokens = lower.split(/\s+/).filter(t => t.length > 3);
    let bestMatch: AntiRationalizationRule | null = null;
    let maxOverlap = 0;

    for (const r of ANTI_RATIONALIZATION_RULES) {
      const ratTokens = r.rationalization.toLowerCase().split(/\s+/);
      const overlap = inputTokens.filter(t => ratTokens.includes(t)).length;
      if (overlap > maxOverlap && overlap >= 2) {
        maxOverlap = overlap;
        bestMatch = r;
      }
    }

    if (bestMatch && maxOverlap >= 2) {
      return { rule: bestMatch, confidence: Math.min(90, 50 + maxOverlap * 15) };
    }

    return null;
  }, [inputText]);

  // Filtered rules in the catalog
  const filteredRules = useMemo(() => {
    return ANTI_RATIONALIZATION_RULES.filter(r => {
      const matchesCat = selectedCategory === 'all' || r.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCat;

      const matchesSearch = 
        r.rationalization.toLowerCase().includes(query) ||
        r.reality.toLowerCase().includes(query) ||
        r.skillId.toLowerCase().includes(query);

      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const copyDirective = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = [
    { id: 'all', label: 'All Rules' },
    { id: 'testing', label: 'Testing & TDD' },
    { id: 'security', label: 'Security & Auth' },
    { id: 'architecture', label: 'Architecture & Design' },
    { id: 'planning', label: 'Planning & Tasks' },
    { id: 'define', label: 'Requirements & Specs' },
    { id: 'review', label: 'Code Review' },
    { id: 'performance', label: 'Performance' },
    { id: 'git', label: 'Git & Versioning' },
    { id: 'ops', label: 'Shipping & Ops' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-rose-950/40 via-slate-900 to-[#101426] border border-rose-900/40 rounded-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium mb-3">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>Anti-Rationalization Defense Engine • 169 Rules</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            The AI Excuse Buster: Counteract the Shortest Path.
          </h1>
          <p className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed">
            AI agents take cognitive shortcuts. When an agent says <em>"I'll add tests later"</em> or <em>"This is simple enough without a spec"</em>, 
            paste it here. We diagnose the violation, reveal the senior-engineer reality, and give you an authoritative prompt to force compliance.
          </p>
        </div>
      </div>

      {/* Interactive Scanner Box */}
      <div className="p-6 bg-[#0c1222] border border-slate-800 rounded-2xl space-y-5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            Paste What Your AI Agent Just Said / Rationalized:
          </label>
          {inputText && (
            <button
              onClick={() => setInputText('')}
              className="text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Input Textarea */}
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="e.g. 'I will add the unit tests in a follow-up PR' or 'We do not need a spec for an MVP'..."
            rows={3}
            className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors font-mono"
          />
        </div>

        {/* Presets Chips */}
        <div className="space-y-1.5">
          <span className="text-[11px] text-slate-400">Common AI Excuses (Click to test):</span>
          <div className="flex flex-wrap gap-1.5">
            {hallOfShamePresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setInputText(preset.text)}
                className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                "{preset.label}"
              </button>
            ))}
          </div>
        </div>

        {/* Scan Result */}
        {detectedRule ? (
          <div className="mt-4 p-5 bg-gradient-to-br from-rose-950/30 to-slate-950 border border-rose-800/50 rounded-xl space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-900/30 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
                  Violation Detected ({detectedRule.confidence}% Match)
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Origin: <strong className="text-indigo-400">{detectedRule.rule.skillId}</strong>
                </span>
              </div>
              <span className="text-xs text-rose-400 font-semibold uppercase">
                Category: {detectedRule.rule.category}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                <div className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider mb-1">
                  The Agent's Rationalization:
                </div>
                <p className="text-xs text-slate-200 font-medium">
                  "{detectedRule.rule.rationalization}"
                </p>
              </div>

              <div className="p-3 bg-emerald-950/20 rounded-lg border border-emerald-900/30">
                <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                  Senior Engineer Reality Check:
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {detectedRule.rule.reality}
                </p>
              </div>
            </div>

            {/* Directive prompt to copy */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  Corrective Directive Prompt (Copy & send to your AI Agent):
                </span>
                <button
                  onClick={() => copyDirective(detectedRule.rule.directivePrompt, 'detected')}
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  {copiedId === 'detected' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'detected' ? 'Copied Directive!' : 'Copy Directive'}</span>
                </button>
              </div>
              <pre className="text-xs font-mono text-indigo-300 whitespace-pre-wrap bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                {detectedRule.rule.directivePrompt}
              </pre>
            </div>
          </div>
        ) : inputText.trim() ? (
          <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl flex items-center gap-3 text-xs text-slate-400">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>No exact pre-indexed rationalization matched this phrasing. Browse the 169 curated rules below or try one of the preset chips!</span>
          </div>
        ) : null}
      </div>

      {/* Catalog of all 169 Anti-Rationalization Rules */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Full Anti-Rationalization Defense Catalog</h2>
            <p className="text-xs text-slate-400">
              Browse all 169 built-in reality checks across software engineering phases.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search excuses or realities..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* List of Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRules.map(rule => (
            <div
              key={rule.id}
              className="bg-[#0d1424] border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-sm transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {rule.category}
                  </span>
                  <span className="text-[11px] font-mono text-indigo-400">
                    {rule.skillId}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-rose-400 font-semibold block mb-0.5">Excuse / Shortcut:</span>
                  <p className="text-xs font-medium text-slate-200">
                    "{rule.rationalization}"
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] text-emerald-400 font-semibold block mb-0.5">Senior Engineer Reality:</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {rule.reality}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => setInputText(rule.rationalization)}
                  className="text-[11px] text-slate-400 hover:text-indigo-300 transition-colors"
                >
                  Test in Scanner ↑
                </button>
                <button
                  onClick={() => copyDirective(rule.directivePrompt, rule.id)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 transition-colors flex items-center gap-1"
                >
                  {copiedId === rule.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                  <span>{copiedId === rule.id ? 'Copied' : 'Copy Rebuttal'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

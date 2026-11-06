import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Terminal, 
  ShieldAlert, 
  ListOrdered, 
  Copy, 
  Check, 
  ArrowRight,
  Filter,
  Sparkles,
  ExternalLink,
  Layers
} from 'lucide-react';
import { AGENT_SKILLS, SkillDefinition, SDLCPhase } from '../data/agentSkillsData';

interface SkillsCatalogProps {
  onSelectSkill: (skill: SkillDefinition) => void;
  onRunInRunner: (command: string) => void;
}

export const SkillsCatalog: React.FC<SkillsCatalogProps> = ({
  onSelectSkill,
  onRunInRunner
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const phaseColors: Record<string, { bg: string; text: string; border: string }> = {
    meta: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
    define: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
    plan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
    build: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
    verify: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
    review: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
    ship: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20' },
  };

  const phases: { id: string; label: string; count: number }[] = [
    { id: 'all', label: 'All Skills', count: AGENT_SKILLS.length },
    { id: 'define', label: 'Define', count: AGENT_SKILLS.filter(s => s.phase === 'define').length },
    { id: 'plan', label: 'Plan', count: AGENT_SKILLS.filter(s => s.phase === 'plan').length },
    { id: 'build', label: 'Build', count: AGENT_SKILLS.filter(s => s.phase === 'build').length },
    { id: 'verify', label: 'Verify', count: AGENT_SKILLS.filter(s => s.phase === 'verify').length },
    { id: 'review', label: 'Review', count: AGENT_SKILLS.filter(s => s.phase === 'review').length },
    { id: 'ship', label: 'Ship & Maintain', count: AGENT_SKILLS.filter(s => s.phase === 'ship').length },
    { id: 'meta', label: 'Meta', count: AGENT_SKILLS.filter(s => s.phase === 'meta').length },
  ];

  const filteredSkills = useMemo(() => {
    return AGENT_SKILLS.filter(skill => {
      const matchesPhase = selectedPhase === 'all' || skill.phase === selectedPhase;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesPhase;

      const matchesSearch = 
        skill.title.toLowerCase().includes(query) ||
        skill.id.toLowerCase().includes(query) ||
        skill.slashCommand.toLowerCase().includes(query) ||
        skill.description.toLowerCase().includes(query) ||
        skill.rationalizations.some(r => r.rationalization.toLowerCase().includes(query) || r.reality.toLowerCase().includes(query));

      return matchesPhase && matchesSearch;
    });
  }, [searchQuery, selectedPhase]);

  const copyCliCommand = (skillId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`npx skills add addyosmani/agent-skills --skill ${skillId}`);
    setCopiedId(skillId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-[#10172a] to-slate-900 border border-slate-800 p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Authored by Addy Osmani • 25 Production-Grade Skills</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Engineering judgment packaged for AI coding agents.
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            AI agents naturally take the shortest path—skipping specs, writing superficial tests, and rationalizing away security. 
            This interactive studio encodes senior-engineering workflows, proof gates, and anti-rationalization tables across every SDLC phase.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-xs font-mono text-emerald-400">
              <span>$ npx skills add addyosmani/agent-skills</span>
            </div>
            <button
              onClick={() => onRunInRunner('/interview-me')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Try Slash Commands</span>
            </button>
            <a
              href="https://skills.addy.ie"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <span>skills.addy.ie</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skill name, slash command, excuse..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>Showing <strong className="text-slate-200">{filteredSkills.length}</strong> of {AGENT_SKILLS.length} skills</span>
          </div>
        </div>

        {/* Phase Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {phases.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPhase(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedPhase === p.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>{p.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                selectedPhase === p.id ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-400'
              }`}>
                {p.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Skill Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map(skill => {
          const pColor = phaseColors[skill.phase] || { bg: 'bg-slate-800', text: 'text-slate-300', border: 'border-slate-700' };
          const isCopied = copiedId === skill.id;

          return (
            <div
              key={skill.id}
              onClick={() => onSelectSkill(skill)}
              className="group relative bg-[#0d1424] hover:bg-[#11192e] border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-indigo-500/5"
            >
              <div>
                {/* Top badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded-md border ${pColor.bg} ${pColor.text} ${pColor.border}`}>
                      {skill.phase}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRunInRunner(skill.slashCommand);
                      }}
                      className="px-2 py-0.5 text-[11px] font-mono font-semibold rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 flex items-center gap-1 transition-colors"
                      title="Run slash command"
                    >
                      <Terminal className="w-3 h-3 text-amber-400" />
                      <span>{skill.slashCommand}</span>
                    </button>
                  </div>

                  <button
                    onClick={(e) => copyCliCommand(skill.id, e)}
                    className="p-1 rounded-md text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                    title="Copy npx install command"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {skill.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Bottom metadata tags */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  {skill.rationalizations.length > 0 && (
                    <span className="flex items-center gap-1 text-[11px] text-rose-400 font-medium" title={`${skill.rationalizations.length} Anti-Rationalization rules`}>
                      <ShieldAlert className="w-3 h-3" />
                      {skill.rationalizations.length} Excuses
                    </span>
                  )}
                  {skill.steps.length > 0 && (
                    <span className="flex items-center gap-1 text-[11px] text-slate-400" title={`${skill.steps.length} workflow steps`}>
                      <ListOrdered className="w-3 h-3" />
                      {skill.steps.length} Gates
                    </span>
                  )}
                </div>

                <span className="text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 text-[11px] font-medium">
                  View Skill
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-2xl p-8">
          <Terminal className="w-8 h-8 text-slate-500 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-200">No matching skills found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or reset the phase filter to find the skill you are looking for.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedPhase('all'); }}
            className="mt-4 px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

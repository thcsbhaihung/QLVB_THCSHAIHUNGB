import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  Terminal, 
  ShieldAlert, 
  BookOpen, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { AGENT_SKILLS, SkillDefinition } from '../data/agentSkillsData';
import { SLASH_COMMANDS, SlashCommandDef } from '../data/slashCommandsData';
import { ANTI_RATIONALIZATION_RULES, AntiRationalizationRule } from '../data/antiRationalizationsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSkill: (skill: SkillDefinition) => void;
  onSelectCommand: (command: string) => void;
  onSelectRationalization: (rule: AntiRationalizationRule) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSkill,
  onSelectCommand,
  onSelectRationalization
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchingSkills = AGENT_SKILLS.filter(s => 
    s.title.toLowerCase().includes(cleanQuery) ||
    s.id.toLowerCase().includes(cleanQuery) ||
    s.slashCommand.toLowerCase().includes(cleanQuery) ||
    s.description.toLowerCase().includes(cleanQuery)
  ).slice(0, 5);

  const matchingCommands = SLASH_COMMANDS.filter(c =>
    c.command.toLowerCase().includes(cleanQuery) ||
    c.name.toLowerCase().includes(cleanQuery) ||
    c.keyPrinciple.toLowerCase().includes(cleanQuery)
  ).slice(0, 3);

  const matchingRationalizations = ANTI_RATIONALIZATION_RULES.filter(r =>
    r.rationalization.toLowerCase().includes(cleanQuery) ||
    r.reality.toLowerCase().includes(cleanQuery)
  ).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-[#0c1222] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-900/80">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 25 skills, slash commands, or AI excuses..."
            className="flex-1 bg-transparent border-none text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-500 hover:text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded border border-slate-700">ESC</kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {cleanQuery ? (
            <>
              {/* Skills Matches */}
              {matchingSkills.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3 text-indigo-400" />
                    Agent Skills ({matchingSkills.length})
                  </div>
                  {matchingSkills.map(skill => (
                    <button
                      key={skill.id}
                      onClick={() => {
                        onSelectSkill(skill);
                        onClose();
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-slate-800/70 border border-transparent hover:border-slate-700 flex items-center justify-between text-left transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                          {skill.slashCommand}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                            {skill.title}
                          </div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">
                            {skill.description}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              )}

              {/* Slash Commands Matches */}
              {matchingCommands.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-amber-400" />
                    Slash Commands ({matchingCommands.length})
                  </div>
                  {matchingCommands.map(cmd => (
                    <button
                      key={cmd.command}
                      onClick={() => {
                        onSelectCommand(cmd.command);
                        onClose();
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-slate-800/70 border border-transparent hover:border-slate-700 flex items-center justify-between text-left transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono font-bold text-amber-300">
                          {cmd.command}
                        </span>
                        <span className="text-xs text-slate-300">
                          {cmd.name} — <span className="text-slate-400 text-[11px]">{cmd.keyPrinciple}</span>
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              )}

              {/* Anti-Rationalization Rules Matches */}
              {matchingRationalizations.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center gap-1.5">
                    <ShieldAlert className="w-3 h-3 text-rose-400" />
                    Anti-Rationalization Checks ({matchingRationalizations.length})
                  </div>
                  {matchingRationalizations.map(rule => (
                    <button
                      key={rule.id}
                      onClick={() => {
                        onSelectRationalization(rule);
                        onClose();
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-slate-800/70 border border-transparent hover:border-slate-700 flex items-center justify-between text-left transition-colors group"
                    >
                      <div>
                        <div className="text-xs font-medium text-rose-300">
                          "{rule.rationalization}"
                        </div>
                        <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          Reality: {rule.reality}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-2">
                        {rule.skillId}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {matchingSkills.length === 0 && matchingCommands.length === 0 && matchingRationalizations.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-500">
                  No matching skills, commands, or anti-rationalizations found for "{query}".
                </div>
              )}
            </>
          ) : (
            <div className="py-6 px-2 space-y-4 text-xs text-slate-400">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                Quick Navigation Suggestions
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { onSelectCommand('/interview-me'); onClose(); }}
                  className="p-2.5 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-xl text-left flex items-center gap-2 text-slate-300"
                >
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  <span>/interview-me</span>
                </button>
                <button
                  onClick={() => { onSelectCommand('/spec'); onClose(); }}
                  className="p-2.5 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-xl text-left flex items-center gap-2 text-slate-300"
                >
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  <span>/spec (Define)</span>
                </button>
                <button
                  onClick={() => { onSelectCommand('/review'); onClose(); }}
                  className="p-2.5 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-xl text-left flex items-center gap-2 text-slate-300"
                >
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  <span>/review (5-Axis)</span>
                </button>
                <button
                  onClick={() => { onSelectCommand('/test'); onClose(); }}
                  className="p-2.5 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-xl text-left flex items-center gap-2 text-slate-300"
                >
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  <span>/test (TDD)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

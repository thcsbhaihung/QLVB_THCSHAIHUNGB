import React from 'react';
import { 
  Terminal, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  GitBranch, 
  Sliders, 
  CheckCircle2, 
  Layers,
  Search,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'catalog' | 'runner' | 'rationalization' | 'pipeline' | 'builder' | 'integrations';
  setActiveTab: (tab: 'catalog' | 'runner' | 'rationalization' | 'pipeline' | 'builder' | 'integrations') => void;
  onOpenSearch: () => void;
  hasGeminiKey: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  hasGeminiKey
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0b101b]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-[#0b101b] rounded-xl flex items-center justify-center">
                <Terminal className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-100 text-lg tracking-tight">Agent Skills</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  25 Skills
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Addy Osmani
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Production-grade workflows & quality gates for AI coding agents
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'catalog'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Skills Catalog
            </button>
            <button
              onClick={() => setActiveTab('runner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'runner'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              Slash Commands
            </button>
            <button
              onClick={() => setActiveTab('rationalization')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'rationalization'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              Excuse Buster
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'pipeline'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
              SDLC Pipeline
            </button>
            <button
              onClick={() => setActiveTab('builder')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'builder'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              Skill Builder
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'integrations'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Integrations
            </button>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-400 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors"
              title="Search skills & rules"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline px-1 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded border border-slate-700">⌘K</kbd>
            </button>

            {hasGeminiKey ? (
              <span className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-lg">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Gemini Live
              </span>
            ) : (
              <span className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-lg" title="Running instant local intelligence engine. Add GEMINI_API_KEY in Secrets for live model calls.">
                <CheckCircle2 className="w-3 h-3 text-amber-400" />
                Offline Engine
              </span>
            )}

            <a
              href="https://github.com/addyosmani/agent-skills"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors"
            >
              <span className="hidden sm:inline">GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-800/80 no-scrollbar">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'catalog' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Catalog
          </button>
          <button
            onClick={() => setActiveTab('runner')}
            className={`px-3 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'runner' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Commands
          </button>
          <button
            onClick={() => setActiveTab('rationalization')}
            className={`px-3 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'rationalization' ? 'bg-rose-600 text-white' : 'text-slate-400'
            }`}
          >
            Excuse Buster
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'pipeline' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            SDLC Pipeline
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`px-3 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'builder' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Builder
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`px-3 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'integrations' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Integrations
          </button>
        </div>
      </div>
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  FileText, 
  ListOrdered, 
  Code, 
  TestTube, 
  ShieldCheck, 
  Rocket, 
  Terminal,
  RotateCcw
} from 'lucide-react';

interface SdlcPipelineProps {
  onRunCommand: (command: string) => void;
}

interface PhaseStep {
  id: string;
  phase: string;
  command: string;
  title: string;
  principle: string;
  icon: any;
  color: string;
  artifacts: string[];
  gateQuestion: string;
  checklist: string[];
}

export const SdlcPipeline: React.FC<SdlcPipelineProps> = ({ onRunCommand }) => {
  const steps: PhaseStep[] = [
    {
      id: 'define',
      phase: 'DEFINE',
      command: '/spec',
      title: 'Spec-Driven Development',
      principle: 'Spec before code',
      icon: FileText,
      color: 'from-blue-500 to-indigo-600',
      artifacts: ['Feature PRD / Spec', 'Capability Map', 'Boundary Conditions & Invariants', 'Explicit Non-Goals'],
      gateQuestion: 'Can you state what success looks like in one unambiguous sentence with zero unspoken assumptions?',
      checklist: [
        'Conducted /interview-me if requirements were underspecified',
        'Written explicit non-goals to prevent scope creep',
        'Documented boundary conditions & error fallback policy',
        'Defined acceptance proof criteria'
      ]
    },
    {
      id: 'plan',
      phase: 'PLAN',
      command: '/plan',
      title: 'Planning & Task Breakdown',
      principle: 'Small, atomic tasks',
      icon: ListOrdered,
      color: 'from-cyan-500 to-blue-600',
      artifacts: ['Sequential Task Plan', 'Verification Gate per Task', 'Dependency Matrix'],
      gateQuestion: 'Is every single task small enough to implement in <15 minutes with its own verifiable test?',
      checklist: [
        'Enforced binding constraints via /constraints',
        'Decomposed feature into ordered vertical slices',
        'Assigned explicit RED/GREEN verification to each task',
        'Identified high-risk or irreversible operations upfront'
      ]
    },
    {
      id: 'build',
      phase: 'BUILD',
      command: '/build',
      title: 'Incremental Implementation',
      principle: 'One slice at a time',
      icon: Code,
      color: 'from-emerald-500 to-teal-600',
      artifacts: ['Thin vertical slice', 'Official documentation citations', 'Minimal implementation code'],
      gateQuestion: 'Are you building one thin slice at a time, or dumping a monolithic diff across 10 files?',
      checklist: [
        'Grounded APIs in official documentation (/source)',
        'Built minimal code to satisfy the current slice only',
        'Avoided speculative abstractions or premature generalizations',
        'Committed each slice atomically with semantic commit message'
      ]
    },
    {
      id: 'verify',
      phase: 'VERIFY',
      command: '/test',
      title: 'Test-Driven Development',
      principle: 'Tests are proof',
      icon: TestTube,
      color: 'from-amber-500 to-orange-600',
      artifacts: ['Failing RED test', 'Passing GREEN test', 'Reproducible bug test'],
      gateQuestion: 'Did you watch the test fail before making it pass? ("Seems right" is not done).',
      checklist: [
        'Wrote failing test first (RED phase verified)',
        'Wrote minimal code to pass (GREEN phase verified)',
        'Cleaned implementation without changing behavior (REFACTOR)',
        'Verified edge cases (nulls, empty lists, timeouts, network disconnects)'
      ]
    },
    {
      id: 'review',
      phase: 'REVIEW',
      command: '/review',
      title: '5-Axis Code Quality Audit',
      principle: 'Improve code health',
      icon: ShieldCheck,
      color: 'from-rose-500 to-red-600',
      artifacts: ['Correctness Audit', 'Readability Check', 'Architecture Review', 'Security Audit', 'Test Quality Score'],
      gateQuestion: 'Did the code undergo a fresh-context adversarial check against all five axes before merge?',
      checklist: [
        'Audited Correctness (off-by-one, race conditions, nulls)',
        'Simplified code for clarity over cleverness (/code-simplify)',
        'Screened against OWASP Top 10 and untrusted inputs (/security)',
        'Audited Web Performance & Core Web Vitals (/webperf)'
      ]
    },
    {
      id: 'ship',
      phase: 'SHIP',
      command: '/ship',
      title: 'Production Staged Launch',
      principle: 'Faster is safer',
      icon: Rocket,
      color: 'from-purple-500 to-indigo-600',
      artifacts: ['Expand/Contract DB Migration', 'Feature Flag Rollout Plan', 'Canary Metrics Watchdog', '1-Click Rollback Runbook'],
      gateQuestion: 'If this change breaks production at 2 AM, is there an automated or 1-click rollback ready in <60 seconds?',
      checklist: [
        'Non-destructive schema migrations (expand/contract verified)',
        'Feature flag configured with gradual percentage rollout',
        'Production telemetry & error rate alerts verified (/observe)',
        'Rollback procedure tested and documented'
      ]
    }
  ];

  const [activeStep, setActiveStep] = useState<string>('define');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('agent_skills_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('agent_skills_checklist', JSON.stringify(checkedItems));
    } catch {}
  }, [checkedItems]);

  const toggleCheck = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetChecklist = () => {
    setCheckedItems({});
  };

  const totalChecks = steps.reduce((acc, s) => acc + s.checklist.length, 0);
  const completedChecks = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedChecks / totalChecks) * 100);

  const currentStep = steps.find(s => s.id === activeStep) || steps[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#0c1222] border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <GitBranch className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">The Software Development Lifecycle Pipeline</h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              6 Quality Gates
            </span>
          </div>
          <p className="text-xs text-slate-400">
            The standard engineering lifecycle encoded into Addy Osmani's agent skills. Never skip a stage; each stage produces its required artifacts.
          </p>
        </div>

        {/* Progress tracker */}
        <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
          <div>
            <div className="text-xs font-semibold text-slate-300 flex items-center justify-between gap-2">
              <span>Quality Gates Score</span>
              <span className="font-mono text-cyan-400">{progressPercent}%</span>
            </div>
            <div className="w-36 bg-slate-800 h-2 rounded-full overflow-hidden mt-1.5">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <button
            onClick={resetChecklist}
            className="p-1.5 text-slate-500 hover:text-slate-300 rounded-lg hover:bg-slate-800 transition-colors"
            title="Reset checklist"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visual Pipeline Stages */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          const isSelected = activeStep === st.id;
          const stageCompleted = st.checklist.every(item => checkedItems[`${st.id}-${item}`]);

          return (
            <div
              key={st.id}
              onClick={() => setActiveStep(st.id)}
              className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 ring-1 ring-indigo-500/50 shadow-lg'
                  : 'bg-[#0d1424] hover:bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-wider text-slate-400">
                  0{idx + 1} • {st.phase}
                </span>
                {stageCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-600" />
                )}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${st.color} flex items-center justify-center text-white shadow-sm`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-white leading-tight">
                  {st.title.split(' ')[0]}
                </span>
              </div>

              <div className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 inline-block mb-1">
                {st.command}
              </div>

              <p className="text-[10px] text-slate-400 line-clamp-1">
                {st.principle}
              </p>
            </div>
          );
        })}
      </div>

      {/* Deep-dive into Active Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0c1222] border border-slate-800 rounded-2xl p-6">
        {/* Left: Artifacts & Gate Question (6 Cols) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${currentStep.color} flex items-center justify-center text-white`}>
                <currentStep.icon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                  Phase: {currentStep.phase}
                </span>
                <h2 className="text-lg font-bold text-white tracking-tight">{currentStep.title}</h2>
              </div>
            </div>

            <button
              onClick={() => onRunCommand(currentStep.command)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors shadow-sm"
            >
              <Terminal className="w-3 h-3 text-amber-300" />
              <span>Run {currentStep.command}</span>
            </button>
          </div>

          {/* Hard Quality Gate Question */}
          <div className="p-4 bg-rose-950/20 border border-rose-900/30 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
              Binding Verification Gate Question:
            </span>
            <p className="text-xs text-slate-200 font-medium leading-relaxed">
              "{currentStep.gateQuestion}"
            </p>
          </div>

          {/* Required Artifacts */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Required Deliverables & Artifacts:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentStep.artifacts.map((art, idx) => (
                <div key={idx} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="text-xs text-slate-300">{art}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Interactive Gate Checklist (6 Cols) */}
        <div className="lg:col-span-6 space-y-4 lg:border-l lg:border-slate-800 lg:pl-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              {currentStep.phase} Gate Checklist for Your Active Feature:
            </span>
            <span className="text-xs text-slate-400">
              {currentStep.checklist.filter(item => checkedItems[`${currentStep.id}-${item}`]).length} / {currentStep.checklist.length} Passed
            </span>
          </div>

          <div className="space-y-2.5">
            {currentStep.checklist.map((item, idx) => {
              const key = `${currentStep.id}-${item}`;
              const isChecked = Boolean(checkedItems[key]);

              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(key)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    isChecked
                      ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-200'
                      : 'bg-slate-950/60 hover:bg-slate-900/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                  <span className={`text-xs leading-relaxed ${isChecked ? 'line-through text-slate-400' : ''}`}>
                    {item}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Checklist state persists locally in your browser.
            </span>
            <button
              onClick={() => onRunCommand(currentStep.command)}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
            >
              Test with Slash Runner <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

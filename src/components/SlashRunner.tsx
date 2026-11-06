import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  RotateCcw, 
  Info, 
  MessageSquare, 
  Cpu, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { SLASH_COMMANDS, SlashCommandDef } from '../data/slashCommandsData';

interface SlashRunnerProps {
  initialCommand?: string;
  hasGeminiKey: boolean;
}

export const SlashRunner: React.FC<SlashRunnerProps> = ({
  initialCommand = '/interview-me',
  hasGeminiKey
}) => {
  const [selectedCommand, setSelectedCommand] = useState<string>(initialCommand);
  const [userInput, setUserInput] = useState<string>('');
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeModel, setActiveModel] = useState<string>('');

  // Interview-me conversational state
  const [interviewHistory, setInterviewHistory] = useState<{ role: 'ai' | 'user'; text: string; confidence?: number }[]>([]);
  const [currentConfidence, setCurrentConfidence] = useState<number>(30);

  const activeDef: SlashCommandDef = SLASH_COMMANDS.find(c => c.command === selectedCommand) || SLASH_COMMANDS[0];

  const handleSelectExample = (ex: { title: string; input: string; simulatedOutput: string }) => {
    setUserInput(ex.input);
    setOutput(ex.simulatedOutput);
    setActiveModel('Addy Osmani Agent Protocol');
    if (selectedCommand === '/interview-me') {
      setInterviewHistory([
        { role: 'user', text: ex.input },
        { role: 'ai', text: ex.simulatedOutput, confidence: 45 }
      ]);
      setCurrentConfidence(45);
    }
  };

  const handleRun = async () => {
    if (!userInput.trim()) return;
    setIsRunning(true);
    setOutput(null);

    try {
      const response = await fetch('/api/skill/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          command: selectedCommand,
          input: userInput,
          context: { history: interviewHistory }
        })
      });

      const data = await response.json();

      if (data.success && data.result) {
        setOutput(data.result);
        setActiveModel(data.model || 'Gemini 2.5 Flash');
        if (selectedCommand === '/interview-me') {
          const nextConf = Math.min(95, currentConfidence + 25);
          setCurrentConfidence(nextConf);
          setInterviewHistory(prev => [
            ...prev,
            { role: 'user', text: userInput },
            { role: 'ai', text: data.result, confidence: nextConf }
          ]);
        }
      } else {
        // Use realistic simulated response from data or synthesize one
        const matchExample = activeDef.examples.find(e => 
          userInput.toLowerCase().includes(e.title.toLowerCase().slice(0, 5))
        ) || activeDef.examples[0];

        // Synthesize dynamic answer for custom inputs
        let simulatedText = matchExample.simulatedOutput;
        if (!userInput.includes(matchExample.input.slice(0, 10))) {
          if (selectedCommand === '/interview-me') {
            const nextConf = Math.min(95, currentConfidence + 30);
            setCurrentConfidence(nextConf);
            simulatedText = `HYPOTHESIS: You are planning to implement "${userInput.trim()}" and want to isolate the exact MVP boundary before writing any architecture or code.
[Confidence: ${nextConf}%]

QUESTION: Who is the primary end-user, and what is the single non-negotiable metric for success in the first release?

MY GUESS: The primary user is an authenticated developer or administrator, and success is defined by deterministic behavior rather than premature multi-region scalability.`;
            setInterviewHistory(prev => [
              ...prev,
              { role: 'user', text: userInput },
              { role: 'ai', text: simulatedText, confidence: nextConf }
            ]);
          } else if (selectedCommand === '/spec') {
            simulatedText = `# Feature Specification: ${userInput.slice(0, 40)}

## 1. Problem Statement & User Context
Addressing the requirement: "${userInput}".
Target User: Core system operators.

## 2. Invariants & Capability Matrix
- Invariant 1: All operations must be idempotent and strictly typed.
- Invariant 2: Failure modes must fail gracefully with structured diagnostic logging.
- Boundary: No unbounded in-memory state; persistent storage or Redis cache must enforce TTL.

## 3. Explicit Non-Goals
- Multi-region replication in Slice 1.
- Custom plugin ecosystem.

## 4. Verification Proof Criteria
- [ ] Automated Test: Core workflow returns 200 OK with valid contract payload.
- [ ] Error Boundary Test: Upstream failure returns 503 Service Unavailable without crashing the node process.`;
          } else if (selectedCommand === '/review') {
            simulatedText = `## Five-Axis Code Review Report

### 1. Correctness: ⚠️ REVIEW REQUIRED
- Check edge cases for empty strings, null values, or unhandled rejected promises.

### 2. Readability & Simplicity: ✅ PASS
- Code is reasonably straightforward; verify that variables follow domain nomenclature.

### 3. Architecture: ⚠️ ATTENTION
- Ensure data fetching is isolated from UI presentation layers.

### 4. Operational Safety: ❌ VERIFY
- Verify timeouts, rate limits, and sanitized logs (no PII leak).

### 5. Test Quality: ⚠️ ACTION NEEDED
- Red-Green tests must verify the failure branches, not just the happy path.

VERDICT: REQUEST CHANGES before merge. Add regression test for boundary conditions.`;
          }
        }

        setTimeout(() => {
          setOutput(simulatedText);
          setActiveModel('Addy Osmani Agent Protocol (Local Engine)');
        }, 300);
      }
    } catch (err) {
      const matchExample = activeDef.examples[0];
      setOutput(matchExample.simulatedOutput);
      setActiveModel('Addy Osmani Agent Protocol (Local Fallback)');
    } finally {
      setIsRunning(false);
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const advanceNextPhase = () => {
    const sequence: Record<string, string> = {
      '/interview-me': '/spec',
      '/spec': '/plan',
      '/plan': '/test',
      '/test': '/review',
      '/review': '/code-simplify',
      '/code-simplify': '/webperf',
      '/webperf': '/ship',
      '/ship': '/interview-me'
    };
    const nextCmd = sequence[selectedCommand] || '/spec';
    setSelectedCommand(nextCmd);
    setOutput(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#0c1222] border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Terminal className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Interactive Slash Commands Runner</h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              9 Lifecycle Commands
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Simulate or execute Addy Osmani's agent skills. Test requirements interrogation, PRD specifications, task breakdown, red-green tests, and 5-axis code reviews.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {hasGeminiKey ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Live Gemini 2.5 Flash</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300" title="Running instant local intelligence engine. Add GEMINI_API_KEY in Secrets for live model calls.">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant Local Intelligence Engine</span>
            </div>
          )}
        </div>
      </div>

      {/* Command Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {SLASH_COMMANDS.map(cmd => (
          <button
            key={cmd.command}
            onClick={() => {
              setSelectedCommand(cmd.command);
              setOutput(null);
              setUserInput('');
              setInterviewHistory([]);
              setCurrentConfidence(30);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedCommand === cmd.command
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span className="font-mono font-bold text-amber-300">{cmd.command}</span>
            <span className="hidden sm:inline text-slate-300">({cmd.name.split(' ')[0]})</span>
          </button>
        ))}
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input and Configuration (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Active Command Info Card */}
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {activeDef.command}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Phase: <span className="text-indigo-400">{activeDef.phase}</span>
              </span>
            </div>
            <h3 className="text-sm font-bold text-white">{activeDef.name}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{activeDef.description}</p>
            <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Principle: {activeDef.keyPrinciple}</span>
            </div>
          </div>

          {/* Preset Example Picker */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Info className="w-3 h-3 text-indigo-400" />
              Load Real-World Scenarios
            </label>
            <div className="grid grid-cols-1 gap-2">
              {activeDef.examples.map((ex, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectExample(ex)}
                  className="p-3 bg-[#0d1424] hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl text-left transition-colors flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                      {ex.title}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {ex.input}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* User Input Form */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {selectedCommand === '/review' ? 'Code to Review:' : 'Prompt / Feature Ask:'}
              </label>
              {userInput && (
                <button
                  onClick={() => setUserInput('')}
                  className="text-[11px] text-slate-500 hover:text-slate-300"
                >
                  Clear
                </button>
              )}
            </div>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={activeDef.inputPlaceholder}
              rows={selectedCommand === '/review' ? 7 : 4}
              className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 font-mono focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="text-[11px] text-slate-500">
                Command: <code className="text-amber-400 font-mono">{selectedCommand} &lt;input&gt;</code>
              </span>
              <button
                onClick={handleRun}
                disabled={!userInput.trim() || isRunning}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                {isRunning ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Executing Gate...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Run Command</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Interview-Me confidence meter */}
          {selectedCommand === '/interview-me' && (
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Epistemic Confidence Target:</span>
                <span className={`font-mono font-bold ${currentConfidence >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {currentConfidence}% / 95%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    currentConfidence >= 90 ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-indigo-500'
                  }`}
                  style={{ width: `${currentConfidence}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">
                {currentConfidence >= 90
                  ? 'Goal reached (~95% confidence). Stop interview and advance to /spec!'
                  : 'Stop condition: continue asking 1 question at a time with your best guess until ~95% confidence.'}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Execution Output & Artifacts (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col bg-[#0b101c] border border-slate-800 rounded-2xl overflow-hidden min-h-[500px]">
          {/* Output Toolbar */}
          <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-slate-200">Terminal Artifact Output</span>
              {activeModel && (
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700">
                  {activeModel}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {output && (
                <>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={advanceNextPhase}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg shadow-sm transition-all"
                    title="Take this artifact into the next SDLC stage"
                  >
                    <span>Next SDLC Stage</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Output Terminal View */}
          <div className="flex-1 p-5 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed space-y-4">
            {output ? (
              <div className="space-y-4">
                <pre className="whitespace-pre-wrap font-mono text-xs text-slate-200 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 overflow-x-auto leading-relaxed">
                  {output}
                </pre>

                {/* Follow up suggestions */}
                <div className="p-3 bg-indigo-950/20 border border-indigo-900/30 rounded-xl flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-indigo-300">
                    <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Artifact ready. Recommended next step: run <strong className="text-white font-mono">{
                      selectedCommand === '/interview-me' ? '/spec' :
                      selectedCommand === '/spec' ? '/plan' :
                      selectedCommand === '/plan' ? '/test' :
                      selectedCommand === '/test' ? '/review' :
                      selectedCommand === '/review' ? '/code-simplify' : '/ship'
                    }</strong></span>
                  </div>
                  <button
                    onClick={advanceNextPhase}
                    className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-medium shrink-0"
                  >
                    Advance
                  </button>
                </div>
              </div>
            ) : isRunning ? (
              <div className="h-full flex flex-col items-center justify-center py-20 text-slate-400 space-y-3">
                <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                <p className="text-xs">Applying {activeDef.name} quality gates...</p>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center py-20 text-slate-500 space-y-3 text-center px-4">
                <Terminal className="w-10 h-10 text-slate-700" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-400">Runner Idle</p>
                  <p className="text-xs max-w-sm">
                    Pick a scenario from the left or type your own prompt, then click <strong className="text-slate-300">Run Command</strong> to generate senior-engineer artifacts.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

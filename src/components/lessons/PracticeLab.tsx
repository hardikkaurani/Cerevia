'use client';

import { useState } from 'react';
import { Terminal, Play, RotateCcw, Lightbulb, CheckCircle2, AlertCircle, Code2, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PracticeLab() {
  const initialCode = `function calculateStreakBonus(currentStreak, xpEarned) {
  // Write your code here
  const bonusMultiplier = currentStreak >= 7 ? 1.5 : 1.0;
  return Math.floor(xpEarned * bonusMultiplier);
}

// Test invocation
console.log(calculateStreakBonus(7, 100)); // Expected: 150`;

  const [code, setCode] = useState(initialCode);
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [copiedSolution, setCopiedSolution] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput(null);

    setTimeout(() => {
      setIsRunning(false);
      setConsoleOutput(`[Cerevia Sandbox Output]:
> Running test cases...
✓ Test 1: calculateStreakBonus(7, 100) => 150 (PASSED)
✓ Test 2: calculateStreakBonus(3, 50) => 50 (PASSED)
✓ Test 3: calculateStreakBonus(14, 200) => 300 (PASSED)

🎉 All 3 Test Cases Passed cleanly! +25 XP Bonus awarded.`);
    }, 1200);
  };

  const handleReset = () => {
    setCode(initialCode);
    setConsoleOutput(null);
    setShowHint(false);
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-2xl">
      
      {/* Workspace Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Terminal className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
              Interactive Coding Lab
            </span>
            <p className="text-xs font-bold text-white">JavaScript Sandbox Environment</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-semibold text-amber-400 hover:bg-zinc-800 transition-colors"
          >
            <Lightbulb className="h-3.5 w-3.5 fill-amber-400" />
            <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Instructions & Hint Banner */}
      <div className="space-y-3">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">Challenge: Implement Streak Bonus Multiplier</h4>
          <p className="text-xs text-zinc-400 leading-relaxed font-normal">
            Complete the <code className="text-amber-400 font-mono">calculateStreakBonus</code> function to award a 1.5x bonus multiplier when a student maintains a streak of 7 days or more.
          </p>
        </div>

        {showHint && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5 animate-fade-in">
            <Lightbulb className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
            <div>
              <span className="font-bold">Hint:</span> Use a ternary operator <code className="font-mono text-white">currentStreak &gt;= 7 ? 1.5 : 1.0</code> and <code className="font-mono text-white">Math.floor()</code> to round down the final result.
            </div>
          </div>
        )}
      </div>

      {/* Editor & Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Code Editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 bg-zinc-900 border-x border-t border-zinc-800 px-4 py-2 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-indigo-400" />
              <span>solution.js</span>
            </div>
            <span className="text-[10px] text-zinc-500">JS ES6</span>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={10}
            className="w-full p-4 rounded-b-2xl border border-zinc-800 bg-zinc-950 font-mono text-xs text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed resize-none"
          />
        </div>

        {/* Console Output */}
        <div className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 bg-zinc-900 border-x border-t border-zinc-800 px-4 py-2 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span>Execution Output</span>
            </div>
            <span className="text-[10px] text-zinc-500">Sandboxed Node.js</span>
          </div>

          <div className="flex-1 p-4 rounded-b-2xl border border-zinc-800 bg-zinc-950 font-mono text-xs leading-relaxed overflow-y-auto min-h-[200px]">
            {isRunning ? (
              <p className="text-amber-400 animate-pulse">Running sandbox tests...</p>
            ) : consoleOutput ? (
              <pre className="text-emerald-400 whitespace-pre-wrap">{consoleOutput}</pre>
            ) : (
              <p className="text-zinc-600">Click &quot;Run Sandbox Code&quot; below to evaluate your solution.</p>
            )}
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={handleRunCode}
          disabled={isRunning}
          className="flex h-11 items-center justify-center gap-2 px-6 rounded-xl bg-indigo-600 text-xs font-bold text-white shadow-lg hover:bg-indigo-500 transition-all disabled:opacity-50"
        >
          <Play className="h-4 w-4 fill-white" />
          <span>{isRunning ? 'Evaluating Code...' : 'Run Sandbox Code'}</span>
        </button>
      </div>

    </div>
  );
}

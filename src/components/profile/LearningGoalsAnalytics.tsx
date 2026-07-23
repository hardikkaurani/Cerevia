'use client';

import { useState } from 'react';
import { Target, TrendingUp, Calendar, Compass, CheckCircle2, Plus, Sparkles } from 'lucide-react';

export function LearningGoalsAnalytics() {
  const [activeRange, setActiveRange] = useState<'weekly' | 'monthly'>('weekly');
  const [weeklyGoal, setWeeklyGoal] = useState(1000);
  const [weeklyCurrent, setWeeklyCurrent] = useState(780);

  const xpTrendData = [
    { day: 'Mon', xp: 120 },
    { day: 'Tue', xp: 180 },
    { day: 'Wed', xp: 210 },
    { day: 'Thu', xp: 90 },
    { day: 'Fri', xp: 240 },
    { day: 'Sat', xp: 310 },
    { day: 'Sun', xp: 150 },
  ];

  const maxXP = Math.max(...xpTrendData.map((d) => d.xp));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      
      {/* XP Growth Chart Card */}
      <div className="p-6 rounded-3xl border border-slate-200 bg-white space-y-5 shadow-2xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">XP Growth & Velocity</h3>
            <p className="text-xs text-slate-500 font-medium">Daily experience point accumulation trend.</p>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 text-xs font-bold">
            <button
              onClick={() => setActiveRange('weekly')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeRange === 'weekly' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setActiveRange('monthly')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeRange === 'monthly' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'
              }`}
            >
              This Month
            </button>
          </div>
        </div>

        {/* Bar Chart Representation */}
        <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
          {xpTrendData.map((item, idx) => {
            const heightPercent = Math.round((item.xp / maxXP) * 100);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <div className="text-[10px] font-extrabold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.xp} XP
                </div>
                <div className="w-full max-w-[32px] rounded-t-xl bg-slate-100 group-hover:bg-blue-100 h-full flex items-end overflow-hidden">
                  <div
                    className="w-full bg-blue-600 group-hover:bg-blue-700 rounded-t-xl transition-all duration-500"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-600">{item.day}</span>
              </div>
            );
          })}
        </div>

        <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center justify-between text-xs text-blue-700 font-medium">
          <span className="flex items-center gap-1.5 font-bold">
            <TrendingUp className="h-4 w-4 text-blue-600" /> Velocity Peak: Sunday (+310 XP)
          </span>
          <span className="font-extrabold text-slate-900">Total: 1,400 XP</span>
        </div>
      </div>

      {/* Target Goals Card */}
      <div className="p-6 rounded-3xl border border-slate-200 bg-white space-y-5 shadow-2xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Learning Goals & Targets</h3>
            <p className="text-xs text-slate-500 font-medium">Set targets for daily consistency and career advancement.</p>
          </div>
          <button className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors">
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Weekly Target Goal */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-slate-900">Weekly XP Goal</span>
              </div>
              <span className="text-blue-700">{weeklyCurrent} / {weeklyGoal} XP ({Math.round((weeklyCurrent / weeklyGoal) * 100)}%)</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full rounded-full bg-blue-600 transition-all duration-500" style={{ width: `${(weeklyCurrent / weeklyGoal) * 100}%` }} />
            </div>
            <p className="text-[11px] text-slate-500 font-medium">220 XP remaining to achieve weekly milestone badge.</p>
          </div>

          {/* Monthly Target Goal */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-indigo-600" />
                <span className="text-slate-900">Monthly Target: 4,000 XP</span>
              </div>
              <span className="text-indigo-700 font-extrabold">3,250 / 4,000 XP (81%)</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full rounded-full bg-indigo-600 transition-all duration-500" style={{ width: '81%' }} />
            </div>
            <p className="text-[11px] text-slate-500 font-medium">7 days remaining in July cycle.</p>
          </div>

          {/* Career Goal */}
          <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-slate-900">
              <Compass className="h-4 w-4 text-blue-600" />
              <span>Career Aspiration: Staff Full-Stack AI Engineer</span>
            </div>
            <p className="text-xs text-slate-600">
              On track to complete 100% of Core Distributed Systems & LLM Engineering Track by September 2026.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

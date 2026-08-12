'use client';

import * as React from 'react';
import { useState, useMemo } from 'react';
import { Target, TrendingUp, Calendar, Compass, Plus } from 'lucide-react';

interface LearningGoalsAnalyticsProps {
  history?: {
    id: string;
    xpEarned: number;
    reason: string;
    timestamp: string;
  }[];
}

export function LearningGoalsAnalytics({ history = [] }: LearningGoalsAnalyticsProps) {
  const [activeRange, setActiveRange] = useState<'weekly' | 'monthly'>('weekly');
  const weeklyGoal = 1000;
  const monthlyGoal = 4000;

  // Let's compute weekly and monthly XP based on real history timestamps
  const { weeklyCurrent, monthlyCurrent, xpTrendData, velocityPeakDay, velocityPeakXp, totalWeekXp } = useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date();
    // Get Monday of current week
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);

    let weeklySum = 0;
    let monthlySum = 0;

    // Days map for weekly trend
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dailyXpMap: Record<string, number> = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

    history.forEach((act) => {
      if (!act.timestamp) return;
      const actDate = new Date(act.timestamp);
      
      // Check if it falls in the current month
      if (actDate >= startOfMonth) {
        monthlySum += act.xpEarned;
      }

      // Check if it falls in the current week
      if (actDate >= startOfWeek) {
        weeklySum += act.xpEarned;
        
        // Find weekday name
        // JS getDay() returns 0 for Sunday, 1 for Monday, etc.
        const dayIdx = actDate.getDay();
        const dayName = daysOfWeek[dayIdx === 0 ? 6 : dayIdx - 1];
        dailyXpMap[dayName] = (dailyXpMap[dayName] || 0) + act.xpEarned;
      }
    });

    const trendData = daysOfWeek.map((dayName) => ({
      day: dayName,
      xp: dailyXpMap[dayName],
    }));

    // Find peak velocity day
    let peakDay = 'Monday';
    let peakXp = 0;
    Object.entries(dailyXpMap).forEach(([dayName, xp]) => {
      if (xp > peakXp) {
        peakXp = xp;
        const fullNames: Record<string, string> = {
          Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday',
          Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday'
        };
        peakDay = fullNames[dayName];
      }
    });

    return {
      weeklyCurrent: weeklySum,
      monthlyCurrent: monthlySum,
      xpTrendData: trendData,
      velocityPeakDay: peakDay,
      velocityPeakXp: peakXp,
      totalWeekXp: weeklySum,
    };
  }, [history]);

  const maxXP = useMemo(() => {
    const vals = xpTrendData.map((d) => d.xp);
    const maxVal = Math.max(...vals);
    return maxVal > 0 ? maxVal : 100; // prevent division by zero
  }, [xpTrendData]);

  const weeklyPercent = Math.min(100, Math.round((weeklyCurrent / weeklyGoal) * 100));
  const monthlyPercent = Math.min(100, Math.round((monthlyCurrent / monthlyGoal) * 100));

  const hasActivity = totalWeekXp > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      
      {/* XP Growth Chart Card */}
      <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 space-y-5 shadow-2xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">XP Growth & Velocity</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Daily experience point accumulation trend.</p>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-zinc-800 text-xs font-bold">
            <button
              onClick={() => setActiveRange('weekly')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeRange === 'weekly' ? 'bg-white dark:bg-zinc-950 text-blue-700 dark:text-blue-400 shadow-2xs' : 'text-slate-650 dark:text-zinc-400'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setActiveRange('monthly')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeRange === 'monthly' ? 'bg-white dark:bg-zinc-950 text-blue-700 dark:text-blue-400 shadow-2xs' : 'text-slate-650 dark:text-zinc-400'
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
                <div className="text-[10px] font-extrabold text-slate-555 dark:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.xp} XP
                </div>
                <div className="w-full max-w-[32px] rounded-t-xl bg-slate-100 dark:bg-zinc-800 group-hover:bg-blue-100 dark:group-hover:bg-zinc-700 h-full flex items-end overflow-hidden">
                  <div
                    className="w-full bg-blue-600 group-hover:bg-blue-700 rounded-t-xl transition-all duration-500"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-600 dark:text-zinc-400">{item.day}</span>
              </div>
            );
          })}
        </div>

        <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-800/30 flex items-center justify-between text-xs text-blue-700 dark:text-blue-450 font-medium">
          <span className="flex items-center gap-1.5 font-bold">
            <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />{' '}
            {hasActivity ? `Velocity Peak: ${velocityPeakDay} (+${velocityPeakXp} XP)` : 'No recent activity peak'}
          </span>
          <span className="font-extrabold text-slate-900 dark:text-white">Total: {totalWeekXp} XP</span>
        </div>
      </div>

      {/* Target Goals Card */}
      <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 space-y-5 shadow-2xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Learning Goals & Targets</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Set targets for daily consistency and career advancement.</p>
          </div>
          <button className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 text-xs font-bold transition-colors cursor-pointer">
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Weekly Target Goal */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/40 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-slate-900 dark:text-white">Weekly XP Goal</span>
              </div>
              <span className="text-blue-700 dark:text-blue-400">{weeklyCurrent} / {weeklyGoal} XP ({weeklyPercent}%)</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
              <div className="h-full rounded-full bg-blue-600 transition-all duration-500" style={{ width: `${weeklyPercent}%` }} />
            </div>
            <p className="text-[11px] text-slate-550 dark:text-zinc-400 font-medium">
              {weeklyCurrent < weeklyGoal
                ? `${weeklyGoal - weeklyCurrent} XP remaining to achieve weekly milestone badge.`
                : 'Weekly goal achieved! Keep it up.'}
            </p>
          </div>

          {/* Monthly Target Goal */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/40 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-slate-900 dark:text-white">Monthly Target: {monthlyGoal} XP</span>
              </div>
              <span className="text-indigo-700 dark:text-indigo-455 font-extrabold">{monthlyCurrent} / {monthlyGoal} XP ({monthlyPercent}%)</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
              <div className="h-full rounded-full bg-indigo-600 transition-all duration-500" style={{ width: `${monthlyPercent}%` }} />
            </div>
            <p className="text-[11px] text-slate-550 dark:text-zinc-400 font-medium">
              {monthlyCurrent < monthlyGoal
                ? `${monthlyGoal - monthlyCurrent} XP remaining in the monthly cycle.`
                : 'Monthly target reached! Phenomenal scholar performance.'}
            </p>
          </div>

          {/* Career Goal */}
          <div className="p-4 rounded-2xl border border-blue-200 dark:border-blue-800/40 bg-blue-50/40 dark:bg-blue-950/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-slate-900 dark:text-white">
              <Compass className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>Career Aspiration: Staff Full-Stack AI Engineer</span>
            </div>
            <p className="text-xs text-slate-650 dark:text-zinc-405">
              {hasActivity
                ? 'On track to complete 100% of Core Distributed Systems & LLM Engineering Track by September 2026.'
                : 'Start completing lesson modules to align and map out your target career track.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

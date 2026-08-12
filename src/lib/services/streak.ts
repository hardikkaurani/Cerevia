import { prisma } from '@/lib/prisma';

export type StreakStatus = 'active' | 'at_risk' | 'inactive';

export interface StreakCalculationResult {
  currentStreak: number;
  maxStreak: number;
  status: StreakStatus;
  action: 'continue' | 'increase' | 'reset';
}

/**
 * Pure function to calculate user's streak based on their current streak, max streak,
 * last activity timestamp, and the current time of completion.
 */
export function calculateStreak(
  currentStreak: number,
  maxStreak: number,
  lastActivityAt: Date | null,
  now: Date,
): StreakCalculationResult {
  if (!lastActivityAt) {
    // First activity ever starts a streak of 1
    return {
      currentStreak: 1,
      maxStreak: Math.max(maxStreak, 1),
      status: 'active',
      action: 'reset',
    };
  }

  const timeDifferenceMs = now.getTime() - lastActivityAt.getTime();

  if (timeDifferenceMs > 24 * 60 * 60 * 1000) {
    // Over 24 hours of inactivity: reset streak to 1
    return {
      currentStreak: 1,
      maxStreak: Math.max(maxStreak, 1),
      status: 'active',
      action: 'reset',
    };
  }

  // Calculate day difference in UTC
  const lastDate = Date.UTC(
    lastActivityAt.getUTCFullYear(),
    lastActivityAt.getUTCMonth(),
    lastActivityAt.getUTCDate(),
  );
  const nowDate = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );

  if (nowDate === lastDate) {
    // Same calendar day: streak continues (no increase, no reset)
    return {
      currentStreak,
      maxStreak,
      status: 'active',
      action: 'continue',
    };
  }

  // Different calendar day, and <= 24 hours of inactivity: streak increases by 1
  const nextStreak = currentStreak + 1;
  return {
    currentStreak: nextStreak,
    maxStreak: Math.max(maxStreak, nextStreak),
    status: 'active',
    action: 'increase',
  };
}

/**
 * Evaluates the current streak status without updating it.
 */
export function evaluateStreakStatus(
  currentStreak: number,
  lastActivityAt: Date | null,
  now: Date,
): StreakStatus {
  if (!lastActivityAt || currentStreak === 0) {
    return 'inactive';
  }

  const timeDifferenceMs = now.getTime() - lastActivityAt.getTime();

  if (timeDifferenceMs > 24 * 60 * 60 * 1000) {
    return 'inactive';
  }

  const lastDate = Date.UTC(
    lastActivityAt.getUTCFullYear(),
    lastActivityAt.getUTCMonth(),
    lastActivityAt.getUTCDate(),
  );
  const nowDate = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );

  if (nowDate === lastDate) {
    return 'active';
  }

  return 'at_risk';
}

/**
 * Service to fetch current user's streak details.
 */
export async function getUserStreak(userId: string, now: Date = new Date()) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      currentStreak: true,
      maxStreak: true,
      lastActivityAt: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const status = evaluateStreakStatus(
    user.currentStreak,
    user.lastActivityAt,
    now,
  );

  let currentStreak = user.currentStreak;

  if (status === 'inactive' && user.currentStreak > 0) {
    currentStreak = 0;
    await prisma.user.update({
      where: { id: userId },
      data: { currentStreak: 0 },
    });
  }

  return {
    currentStreak,
    longestStreak: user.maxStreak,
    lastActivityAt: user.lastActivityAt,
    status,
  };
}

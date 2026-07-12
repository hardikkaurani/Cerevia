import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const LEVEL_CONFIG = {
  BASE_XP: 100, // XP required for level 1 -> level 2
  SCALING_FACTOR: 1.5, // Exponent for leveling progression curve
};

/**
 * Calculates the total cumulative XP required to reach a specific level.
 * Level 1 starts at 0 XP.
 */
export function getXpRequiredForLevel(level: number): number {
  if (level <= 1) return 0;
  // level 2 = 100, level 3 = 282, level 4 = 519, level 5 = 800, etc.
  return Math.floor(
    LEVEL_CONFIG.BASE_XP * Math.pow(level - 1, LEVEL_CONFIG.SCALING_FACTOR),
  );
}

/**
 * Calculates level info based on the total XP.
 * Returns level details, including current level, XP in the level, XP remaining,
 * next level threshold, and progress percentage.
 */
export function getLevelInfo(totalXp: number) {
  if (totalXp < 0) totalXp = 0;

  let level = 1;
  while (totalXp >= getXpRequiredForLevel(level + 1)) {
    level++;
  }

  const xpRequiredForCurrentLevel = getXpRequiredForLevel(level);
  const xpRequiredForNextLevel = getXpRequiredForLevel(level + 1);

  const xpInCurrentLevel = totalXp - xpRequiredForCurrentLevel;
  const xpNeededForNextLevel =
    xpRequiredForNextLevel - xpRequiredForCurrentLevel;
  const xpRemaining = xpRequiredForNextLevel - totalXp;

  const progressPercentage =
    xpNeededForNextLevel > 0
      ? Math.min(
          100,
          Math.max(
            0,
            Math.floor((xpInCurrentLevel / xpNeededForNextLevel) * 100),
          ),
        )
      : 0;

  return {
    level,
    xpInCurrentLevel,
    xpRemaining,
    xpNeededForNextLevel,
    progressPercentage,
  };
}

/**
 * Reusable function to award XP to a user.
 * Increments currentXP and totalXP and logs the reward in the XPHistory table.
 * Accepts optional prisma transaction client (tx) to ensure atomicity.
 */
export async function awardXp(
  tx: Prisma.TransactionClient | typeof prisma,
  userId: string,
  xpAmount: number,
  reason: string,
  lessonId?: string,
  timestamp: Date = new Date(),
) {
  if (xpAmount <= 0) return;

  // 1. Verify user exists
  const user = await tx.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // 2. If lessonId is provided, verify lesson exists
  if (lessonId) {
    const lesson = await tx.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true },
    });
    if (!lesson) {
      throw new Error('Lesson not found');
    }
  }

  // 3. Update both Current XP and Total Lifetime XP (totalXP)
  await tx.user.update({
    where: { id: userId },
    data: {
      totalXP: { increment: xpAmount },
      currentXP: { increment: xpAmount },
    },
  });

  // 4. Record entry in XPHistory table
  await tx.xPHistory.create({
    data: {
      userId,
      lessonId: lessonId || null,
      xpEarned: xpAmount,
      reason,
      timestamp,
    },
  });
}

/**
 * Retrieves XP history for a user, sorted by date in descending order.
 */
export async function getUserXpHistory(
  userId: string,
  limit: number = 50,
  skip: number = 0,
) {
  // Verify user exists first
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const [history, totalCount] = await Promise.all([
    prisma.xPHistory.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
      take: limit,
      skip,
      include: {
        lesson: {
          select: {
            title: true,
            difficulty: true,
          },
        },
      },
    }),
    prisma.xPHistory.count({
      where: { userId },
    }),
  ]);

  return {
    history: history.map((record) => ({
      id: record.id,
      xpEarned: record.xpEarned,
      reason: record.reason,
      timestamp: record.timestamp,
      lesson: record.lesson
        ? {
            id: record.lessonId,
            title: record.lesson.title,
            difficulty: record.lesson.difficulty,
          }
        : null,
    })),
    pagination: {
      limit,
      skip,
      totalCount,
    },
  };
}

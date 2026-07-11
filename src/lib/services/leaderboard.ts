import { prisma } from '@/lib/prisma';
import { getWeekNumber, getWeekRange } from '@/utils/date';

export interface LeaderboardEntry {
  userId: string;
  fullName: string | null;
  avatar: string | null;
  weeklyXP: number;
  rank: number;
}

export interface PaginatedLeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  pagination: {
    limit: number;
    skip: number;
    totalCount: number;
  };
  metadata: {
    week: number;
    year: number;
    startDate: Date;
    endDate: Date;
  };
}

/**
 * Retrieves the weekly leaderboard with pagination.
 */
export async function getWeeklyLeaderboard(filters: {
  week?: number;
  year?: number;
  limit?: number;
  skip?: number;
}): Promise<PaginatedLeaderboardResponse> {
  const limit = filters.limit ?? 10;
  const skip = filters.skip ?? 0;

  // Determine week and year
  const now = new Date();
  const currentWeekInfo = getWeekNumber(now);
  const week = filters.week ?? currentWeekInfo.week;
  const year = filters.year ?? currentWeekInfo.year;

  // Calculate the dates for the week range
  let targetDate = now;
  if (filters.week !== undefined || filters.year !== undefined) {
    const targetYear = filters.year ?? currentWeekInfo.year;
    const targetWeek = filters.week ?? currentWeekInfo.week;

    // Construct a date in the middle of the target week/year
    const simple = new Date(targetYear, 0, 1 + (targetWeek - 1) * 7);
    targetDate = simple;
  }

  const { start, end } = getWeekRange(targetDate);

  // Return base skeleton
  return {
    leaderboard: [],
    pagination: {
      limit,
      skip,
      totalCount: 0,
    },
    metadata: {
      week,
      year,
      startDate: start,
      endDate: end,
    },
  };
}

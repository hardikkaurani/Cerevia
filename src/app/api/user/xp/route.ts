import { NextResponse } from 'next/server';
import { authenticateRequest, handleAuthError } from '@/lib/middleware/auth';
import { getLevelInfo, getUserXpHistory } from '@/lib/services/gamification';
import { xpHistoryQuerySchema } from '@/lib/validation/xp';

export async function GET(request: Request) {
  try {
    // 1. Authenticate the request
    const sessionUser = await authenticateRequest(request);

    // 2. Parse and validate query parameters
    const { searchParams } = new URL(request.url);
    const queryParams = {
      limit: searchParams.get('limit') || undefined,
      skip: searchParams.get('skip') || undefined,
    };

    const validationResult = xpHistoryQuerySchema.safeParse(queryParams);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { limit, skip } = validationResult.data;

    // 3. Calculate level info and fetch history
    const levelInfo = getLevelInfo(sessionUser.totalXP);
    const xpHistoryResult = await getUserXpHistory(sessionUser.id, limit, skip);

    // 4. Return response
    return NextResponse.json(
      {
        currentXP: sessionUser.currentXP,
        totalXP: sessionUser.totalXP,
        levelInfo,
        history: xpHistoryResult.history,
        pagination: xpHistoryResult.pagination,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    const { error: message, status } = handleAuthError(error);
    return NextResponse.json({ error: message }, { status });
  }
}

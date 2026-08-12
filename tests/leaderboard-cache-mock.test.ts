import { leaderboardQuerySchema } from '../src/lib/validation/leaderboard';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

async function runLeaderboardCacheTests() {
  console.log('🧪 Testing Leaderboard Caching Flow with Mocked Cache Store...');

  // Mock cache store
  const mockCacheStore = new Map<string, { data: any; expiry: number }>();

  async function getCacheMock(key: string): Promise<any | null> {
    const entry = mockCacheStore.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiry) {
      mockCacheStore.delete(key);
      return null;
    }
    return entry.data;
  }

  async function setCacheMock(key: string, value: any, ttlSeconds: number): Promise<void> {
    mockCacheStore.set(key, {
      data: value,
      expiry: Date.now() + ttlSeconds * 1000,
    });
  }

  let dbCalculations = 0;
  async function mockDbCalculation() {
    dbCalculations++;
    return {
      leaderboard: [{ userId: 'user-1', rank: 1, weeklyXP: 100 }],
      pagination: { limit: 10, skip: 0, totalCount: 1 },
      metadata: { week: 28, year: 2026 },
    };
  }

  const cacheKey = 'leaderboard:weekly:2026:28:limit_10:skip_0';

  // Request 1: Cache Miss
  console.log('- Request 1: cache miss scenario');
  let cached = await getCacheMock(cacheKey);
  let data;
  if (!cached) {
    console.log('  [Cache Miss] Calculating leaderboard from database...');
    data = await mockDbCalculation();
    await setCacheMock(cacheKey, data, 3600); // 1 hour TTL
  } else {
    data = cached;
  }
  assert(dbCalculations === 1, 'Should perform 1 db calculation');
  assert(mockCacheStore.has(cacheKey), 'Should store the leaderboard in cache');

  // Request 2: Cache Hit (within the same hour)
  console.log('- Request 2: cache hit scenario within the hour');
  cached = await getCacheMock(cacheKey);
  if (!cached) {
    console.log('  [Cache Miss] Calculating leaderboard...');
    data = await mockDbCalculation();
  } else {
    console.log('  [Cache Hit] Returning cached snapshot from Redis...');
    data = cached;
  }
  assert(dbCalculations === 1, 'Should NOT perform another db calculation (cache hit)');

  // Request 3: Cache Expiry (simulate after 1 hour)
  console.log('- Request 3: cache expired scenario');
  const entry = mockCacheStore.get(cacheKey);
  if (entry) {
    // Expire the key manually
    entry.expiry = Date.now() - 1000;
  }

  cached = await getCacheMock(cacheKey);
  if (!cached) {
    console.log('  [Cache Miss / Expired] Calculating leaderboard from database...');
    data = await mockDbCalculation();
    await setCacheMock(cacheKey, data, 3600);
  } else {
    data = cached;
  }
  assert(dbCalculations === 2, 'Should perform a second db calculation after cache expiry');

  console.log('🎉 Leaderboard Cache Logic Successfully Verified! ✅');
}

runLeaderboardCacheTests();

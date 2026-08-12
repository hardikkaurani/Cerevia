import { calculateStreak, evaluateStreakStatus } from '../src/lib/services/streak';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function runPureStreakTests() {
  console.log('🧪 Running Pure Streak Logic Unit Tests...');

  // Test A: First qualifying activity (lastActivityAt is null)
  console.log('- Test A: First qualifying activity');
  const resA = calculateStreak(0, 0, null, new Date('2026-07-10T12:00:00Z'));
  assert(resA.currentStreak === 1, 'Streak should start at 1');
  assert(resA.maxStreak === 1, 'Max streak should start at 1');
  assert(resA.action === 'reset', 'Action should be reset');

  // Test B: Same-day duplicate activity
  console.log('- Test B: Same-day duplicate activity');
  const lastActivityB = new Date('2026-07-10T12:00:00Z');
  const nowB = new Date('2026-07-10T18:00:00Z');
  const resB = calculateStreak(1, 1, lastActivityB, nowB);
  assert(resB.currentStreak === 1, 'Streak should remain 1');
  assert(resB.maxStreak === 1, 'Max streak should remain 1');
  assert(resB.action === 'continue', 'Action should be continue');

  // Test C: Consecutive-day activity (under 24 hours)
  console.log('- Test C: Consecutive-day activity (under 24 hours)');
  const lastActivityC = new Date('2026-07-10T18:00:00Z');
  const nowC = new Date('2026-07-11T14:00:00Z'); // 20 hours difference
  const resC = calculateStreak(1, 1, lastActivityC, nowC);
  assert(resC.currentStreak === 2, 'Streak should increment to 2');
  assert(resC.maxStreak === 2, 'Max streak should increment to 2');
  assert(resC.action === 'increase', 'Action should be increase');

  // Test D: Inactivity > 24 hours (26 hours gap) on consecutive days
  console.log('- Test D: Inactivity > 24 hours on consecutive days');
  const lastActivityD = new Date('2026-07-10T10:00:00Z');
  const nowD = new Date('2026-07-11T12:00:00Z'); // 26 hours difference
  const resD = calculateStreak(2, 2, lastActivityD, nowD);
  assert(resD.currentStreak === 1, 'Streak should reset to 1');
  assert(resD.maxStreak === 2, 'Max streak should preserve maximum of 2');
  assert(resD.action === 'reset', 'Action should be reset');

  // Test E: evaluateStreakStatus
  console.log('- Test E: evaluateStreakStatus');
  // 1. Same-day status -> active
  const statusE1 = evaluateStreakStatus(1, new Date('2026-07-10T12:00:00Z'), new Date('2026-07-10T18:00:00Z'));
  assert(statusE1 === 'active', 'Same day status should be active');

  // 2. Next day status within 24 hours -> at_risk
  const statusE2 = evaluateStreakStatus(1, new Date('2026-07-10T18:00:00Z'), new Date('2026-07-11T10:00:00Z'));
  assert(statusE2 === 'at_risk', 'Next day within 24 hours should be at_risk');

  // 3. Over 24 hours status -> inactive
  const statusE3 = evaluateStreakStatus(1, new Date('2026-07-10T18:00:00Z'), new Date('2026-07-11T19:00:00Z'));
  assert(statusE3 === 'inactive', 'Over 24 hours should be inactive');

  console.log('🎉 All Pure Streak Logic Unit Tests Passed! ✅');
}

runPureStreakTests();

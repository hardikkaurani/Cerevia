'use client';

import * as React from 'react';
import { XPToast } from './XPToast';
import { AchievementModal } from './AchievementModal';
import { LevelUpModal } from './LevelUpModal';
import { CelebrationModal } from './CelebrationModal';

export function GamificationOverlay() {
  const [xpData, setXpData] = React.useState({ isVisible: false, xp: 0, message: '' });
  const [achievementData, setAchievementData] = React.useState<{
    isVisible: boolean;
    achievement?: { title: string; description: string; icon?: React.ReactNode; xpReward?: number };
  }>({ isVisible: false });
  const [levelUpData, setLevelUpData] = React.useState({ isVisible: false, newLevel: 1 });
  const [celebrationData, setCelebrationData] = React.useState<{
    isVisible: boolean;
    type: 'Lesson Complete' | 'Quiz Passed' | 'Level Up' | 'Achievement Unlock' | 'Badge Unlock';
    title: string;
    message: string;
    xpReward?: number;
  }>({
    isVisible: false,
    type: 'Lesson Complete',
    title: '',
    message: '',
  });

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).triggerGamification = {
      xp: (xp: number, message: string) => setXpData({ isVisible: true, xp, message }),
      achievement: (title: string, description: string, xpReward: number) =>
        setAchievementData({
          isVisible: true,
          achievement: { title, description, xpReward },
        }),
      levelUp: (newLevel: number) => setLevelUpData({ isVisible: true, newLevel }),
      celebrate: (
        type: 'Lesson Complete' | 'Quiz Passed' | 'Level Up' | 'Achievement Unlock' | 'Badge Unlock',
        title: string,
        message: string,
        xpReward?: number
      ) => setCelebrationData({ isVisible: true, type, title, message, xpReward }),
    };
  }, []);

  return (
    <>
      <XPToast
        isVisible={xpData.isVisible}
        xp={xpData.xp}
        message={xpData.message}
        onClose={() => setXpData((prev) => ({ ...prev, isVisible: false }))}
      />

      {achievementData.achievement && (
        <AchievementModal
          isOpen={achievementData.isVisible}
          achievement={achievementData.achievement}
          onClose={() => setAchievementData((prev) => ({ ...prev, isVisible: false }))}
        />
      )}

      <LevelUpModal
        isOpen={levelUpData.isVisible}
        newLevel={levelUpData.newLevel}
        onClose={() => setLevelUpData((prev) => ({ ...prev, isVisible: false }))}
      />

      <CelebrationModal
        isOpen={celebrationData.isVisible}
        type={celebrationData.type}
        title={celebrationData.title}
        message={celebrationData.message}
        xpReward={celebrationData.xpReward}
        onClose={() => setCelebrationData((prev) => ({ ...prev, isVisible: false }))}
      />
    </>
  );
}

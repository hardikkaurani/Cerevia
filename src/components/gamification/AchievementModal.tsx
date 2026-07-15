'use client';

import * as React from 'react';
import { X, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievement: {
    title: string;
    description: string;
    icon?: React.ReactNode;
    xpReward?: number;
  };
}

export function AchievementModal({ isOpen, onClose, achievement }: AchievementModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95 duration-300 text-center flex flex-col items-center">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-secondary transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative mb-6 mt-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-inner">
          <div className="absolute inset-1 rounded-full border border-white/20 bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center">
            {achievement.icon || <Award className="h-10 w-10 text-white" />}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">Achievement Unlocked!</h2>
        <p className="text-lg font-semibold text-primary mb-1">{achievement.title}</p>
        <p className="text-sm text-muted-foreground mb-6 max-w-[250px]">
          {achievement.description}
        </p>

        {achievement.xpReward && (
          <div className="mb-6 rounded-lg bg-secondary/50 px-4 py-2 border border-border text-sm font-medium">
            Reward: <span className="text-purple-500">+{achievement.xpReward} XP</span>
          </div>
        )}

        <Button onClick={onClose} className="w-full">
          Awesome!
        </Button>
      </div>
    </div>
  );
}

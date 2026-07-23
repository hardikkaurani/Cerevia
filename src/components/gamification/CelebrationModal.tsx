'use client';

import Image from 'next/image';
import { Sparkles, Trophy, CheckCircle2, ArrowRight, Award } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Confetti } from './Confetti';

interface CelebrationModalProps {
  isOpen: boolean;
  type: 'Lesson Complete' | 'Quiz Passed' | 'Level Up' | 'Achievement Unlock' | 'Badge Unlock';
  title: string;
  message: string;
  xpReward?: number;
  onClose: () => void;
}

export function CelebrationModal({
  isOpen,
  type,
  title,
  message,
  xpReward = 50,
  onClose,
}: CelebrationModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <Confetti />
      <Modal isOpen={isOpen} onClose={onClose} title="">
        <div className="text-center space-y-6 py-4 select-none">
          {/* Trophy Graphic */}
          <div className="flex justify-center">
            <div className="relative h-28 w-28 rounded-full bg-gradient-to-b from-amber-500/20 via-zinc-900 to-zinc-950 p-3 border border-amber-500/40 shadow-2xl flex items-center justify-center animate-bounce">
              <Image
                src="/images/gamification/rewards/trophy-gold.webp"
                alt="Gold Trophy"
                fill
                unoptimized
                className="object-contain p-2"
              />
            </div>
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-extrabold text-amber-400 uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5 fill-amber-400" />
              <span>{type}</span>
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {title}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto font-normal">
              {message}
            </p>
          </div>

          {xpReward > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 font-extrabold text-sm shadow-md">
              <Trophy className="h-4 w-4" />
              <span>+{xpReward} XP Earned</span>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full h-11 rounded-2xl bg-white text-xs font-bold text-zinc-950 hover:bg-zinc-100 transition-all shadow-lg"
            >
              <span>Continue Learning</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

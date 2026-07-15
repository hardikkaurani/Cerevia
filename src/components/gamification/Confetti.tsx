'use client';

import * as React from 'react';

// Basic implementation of a CSS-based confetti effect for the modal
// In a full production app, you might use 'react-confetti' or similar canvas-based library.

export function Confetti() {
  const [pieces, setPieces] = React.useState<{ id: number; left: string; delay: string; color: string }[]>([]);

  React.useEffect(() => {
    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-yellow-500', 'bg-green-500'];
    const newPieces = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-40">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={`absolute top-[-10%] h-3 w-3 rounded-sm ${piece.color} opacity-80 animate-confetti`}
          style={{
            left: piece.left,
            animationDelay: piece.delay,
            animationDuration: `${Math.random() * 2 + 2}s`,
          }}
        />
      ))}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}} />
    </div>
  );
}

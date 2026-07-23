import fs from 'fs';
import path from 'path';

function createLosslessWebP() {
  const hexString = 
    '52494646' + // "RIFF"
    '3c000000' + // 60 bytes length
    '57454250' + // "WEBP"
    '5650384c' + // "VP8L"
    '2f000000' + // 47 bytes VP8L chunk payload length
    '2f000000' + // 0x2f signature
    '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    
  return Buffer.from(hexString, 'hex');
}

const gamificationAssets = [
  'public/images/gamification/badges/rare.webp',
  'public/images/gamification/badges/epic.webp',
  'public/images/gamification/badges/legendary.webp',
  'public/images/gamification/badges/quiz-master.webp',
  'public/images/gamification/badges/streak-hero.webp',
  'public/images/gamification/levels/explorer.webp',
  'public/images/gamification/levels/learner.webp',
  'public/images/gamification/levels/builder.webp',
  'public/images/gamification/levels/creator.webp',
  'public/images/gamification/levels/master.webp',
  'public/images/gamification/achievements/first-lesson.webp',
  'public/images/gamification/achievements/100-xp.webp',
  'public/images/gamification/achievements/500-xp.webp',
  'public/images/gamification/achievements/1000-xp.webp',
  'public/images/gamification/achievements/ai-explorer.webp',
  'public/images/gamification/streak/flame-active.webp',
  'public/images/gamification/streak/streak-shield.webp',
  'public/images/gamification/rewards/trophy-gold.webp',
  'public/images/gamification/rewards/xp-gem.webp',
  'public/images/gamification/avatars/avatar-master.webp',
  'public/images/gamification/avatars/avatar-hero.webp'
];

gamificationAssets.forEach((filePath) => {
  const fullPath = path.resolve(filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const buf = createLosslessWebP();
  fs.writeFileSync(fullPath, buf);
  console.log(`Generated Gamification WebP Asset: ${filePath}`);
});

console.log('All Gamification WebP image assets generated successfully.');

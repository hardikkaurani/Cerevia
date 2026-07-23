import fs from 'fs';
import path from 'path';

const generatedImages = {
  cover: 'C:/Users/hardi/.gemini/antigravity-ide/brain/d64a3371-78cd-4313-ac8e-9fe58eb76e5c/profile_cover_banner_1784803681541.png',
  avatar: 'C:/Users/hardi/.gemini/antigravity-ide/brain/d64a3371-78cd-4313-ac8e-9fe58eb76e5c/student_avatar_portrait_1784803699385.png',
  certFullstack: 'C:/Users/hardi/.gemini/antigravity-ide/brain/d64a3371-78cd-4313-ac8e-9fe58eb76e5c/cert_fullstack_1784803720958.png',
  certAI: 'C:/Users/hardi/.gemini/antigravity-ide/brain/d64a3371-78cd-4313-ac8e-9fe58eb76e5c/cert_ai_engineering_1784803740893.png',
  badgeQuiz: 'C:/Users/hardi/.gemini/antigravity-ide/brain/d64a3371-78cd-4313-ac8e-9fe58eb76e5c/badge_quiz_master_1784803758529.png',
  badgeStreak: 'C:/Users/hardi/.gemini/antigravity-ide/brain/d64a3371-78cd-4313-ac8e-9fe58eb76e5c/badge_streak_flame_1784803779139.png',
  badgeCrown: 'C:/Users/hardi/.gemini/antigravity-ide/brain/d64a3371-78cd-4313-ac8e-9fe58eb76e5c/badge_top_learner_1784803798077.png',
};

function copyTo(src, relativeDest) {
  const fullDest = path.resolve(relativeDest);
  const dir = path.dirname(fullDest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, fullDest);
    console.log(`Installed ${relativeDest} (${fs.statSync(fullDest).size} bytes)`);
  } else {
    console.error(`Source file missing: ${src}`);
  }
}

// Backgrounds
copyTo(generatedImages.cover, 'public/images/profile/backgrounds/cover-banner.webp');

// Avatars
copyTo(generatedImages.avatar, 'public/images/profile/avatars/student-avatar.webp');

// Certificates
copyTo(generatedImages.certFullstack, 'public/images/profile/certificates/fullstack-specialization.webp');
copyTo(generatedImages.certAI, 'public/images/profile/certificates/ai-engineering.webp');
copyTo(generatedImages.certFullstack, 'public/images/profile/certificates/system-design.webp');

// Badges
copyTo(generatedImages.badgeQuiz, 'public/images/profile/badges/quiz-master.webp');
copyTo(generatedImages.badgeStreak, 'public/images/profile/badges/streak-flame.webp');
copyTo(generatedImages.badgeCrown, 'public/images/profile/badges/top-learner.webp');
copyTo(generatedImages.badgeQuiz, 'public/images/profile/badges/course-champion.webp');
copyTo(generatedImages.badgeCrown, 'public/images/profile/badges/xp-titan.webp');

// Skills
copyTo(generatedImages.certFullstack, 'public/images/profile/skills/python.webp');
copyTo(generatedImages.certFullstack, 'public/images/profile/skills/react.webp');
copyTo(generatedImages.certFullstack, 'public/images/profile/skills/nodejs.webp');
copyTo(generatedImages.certFullstack, 'public/images/profile/skills/system-design.webp');

// Timeline
copyTo(generatedImages.badgeCrown, 'public/images/profile/timeline/milestone-flag.webp');

console.log('Profile image assets installed successfully!');

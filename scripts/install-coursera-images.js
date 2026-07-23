import fs from 'fs';
import path from 'path';

const generatedImages = {
  hero: 'C:/Users/hardi/.gemini/antigravity-ide/brain/d64a3371-78cd-4313-ac8e-9fe58eb76e5c/hero_student_1784802263336.png',
  backend: 'C:/Users/hardi/.gemini/antigravity-ide/brain/d64a3371-78cd-4313-ac8e-9fe58eb76e5c/course_backend_1784802283939.png',
  frontend: 'C:/Users/hardi/.gemini/antigravity-ide/brain/d64a3371-78cd-4313-ac8e-9fe58eb76e5c/course_frontend_1784802308586.png',
  certificate: 'C:/Users/hardi/.gemini/antigravity-ide/brain/d64a3371-78cd-4313-ac8e-9fe58eb76e5c/certificate_gold_1784802324766.png',
  badge: 'C:/Users/hardi/.gemini/antigravity-ide/brain/d64a3371-78cd-4313-ac8e-9fe58eb76e5c/coursera_badge_1784802346249.png',
};

function copyTo(src, relativeDest) {
  const fullDest = path.resolve(relativeDest);
  const dir = path.dirname(fullDest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, fullDest);
    console.log(`Updated ${relativeDest} (${fs.statSync(fullDest).size} bytes)`);
  }
}

// 1. Coursera dedicated folder
copyTo(generatedImages.hero, 'public/images/coursera/hero-student.webp');
copyTo(generatedImages.backend, 'public/images/coursera/course-backend.webp');
copyTo(generatedImages.frontend, 'public/images/coursera/course-frontend.webp');
copyTo(generatedImages.certificate, 'public/images/coursera/certificate-gold.webp');
copyTo(generatedImages.badge, 'public/images/coursera/coursera-badge.webp');

// 2. Dashboard folder
copyTo(generatedImages.hero, 'public/images/dashboard/welcome.webp');
copyTo(generatedImages.frontend, 'public/images/dashboard/courses.webp');
copyTo(generatedImages.hero, 'public/images/dashboard/mentor.webp');
copyTo(generatedImages.backend, 'public/images/dashboard/progress.webp');

// 3. Courses folder
const courses = [
  'python-mastery.webp',
  'java-enterprise.webp',
  'react-architecture.webp',
  'nodejs-backend.webp',
  'ai-engineering.webp',
  'cloud-native.webp',
  'dsa-masterclass.webp',
  'system-design.webp'
];
courses.forEach((c, idx) => {
  const src = idx % 2 === 0 ? generatedImages.frontend : generatedImages.backend;
  copyTo(src, `public/images/courses/${c}`);
});

// 4. Hero & Illustrations
copyTo(generatedImages.hero, 'public/images/hero/hero-dashboard.webp');
copyTo(generatedImages.hero, 'public/images/illustrations/ai-mentor-visual.webp');
copyTo(generatedImages.badge, 'public/images/illustrations/gamified-xp-visual.webp');
copyTo(generatedImages.frontend, 'public/images/illustrations/hands-on-coding.webp');
copyTo(generatedImages.certificate, 'public/images/illustrations/certificate-badge.webp');

console.log('All public image assets updated with high-resolution visuals!');

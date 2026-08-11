import { PublicHeader } from '@/components/layout/PublicHeader';
import { WhyCerevia } from '@/components/sections/WhyCerevia';
import { LearningImpact } from '@/components/sections/LearningImpact';
import { CTA } from '@/components/sections/CTA';
import { PublicFooter } from '@/components/layout/Footer';

export const metadata = {
  title: 'About Cerevia — AI-Powered Education Platform for Engineers',
  description:
    'Learn about Cerevia’s mission to empower engineers with hands-on coding sandboxes, interactive paths, and gamified streak motivation.',
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] font-sans text-zinc-900 selection:bg-blue-600 selection:text-white dark:bg-[#111111] dark:text-zinc-100">
      <PublicHeader />

      <main className="flex flex-1 flex-col pt-8">
        <WhyCerevia />
        <LearningImpact />
        <CTA />
      </main>

      <PublicFooter />
    </div>
  );
}

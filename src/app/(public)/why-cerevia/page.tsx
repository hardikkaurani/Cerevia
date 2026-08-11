import { PublicHeader } from '@/components/layout/PublicHeader';
import { WhyCerevia } from '@/components/sections/WhyCerevia';
import { LearningImpact } from '@/components/sections/LearningImpact';
import { CTA } from '@/components/sections/CTA';
import { PublicFooter } from '@/components/layout/Footer';

export const metadata = {
  title: 'Why Cerevia — Built for Modern Engineering Education',
  description:
    'Discover why 20,000+ engineers choose Cerevia for AI pair programming, interactive sandboxes, and gamified streak learning.',
};

export default function WhyCereviaPage() {
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

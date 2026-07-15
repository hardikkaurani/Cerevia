import { Metadata } from 'next';
import { SettingsForm } from '@/components/profile/SettingsForm';

export const metadata: Metadata = {
  title: 'Settings | Cerevia',
  description: 'Manage your account settings and preferences.',
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
        <SettingsForm />
      </div>
    </div>
  );
}

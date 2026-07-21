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
        <h1 className="text-3xl font-sans font-bold tracking-tight text-foreground mb-2">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-8 md:p-10 shadow-sm">
        <SettingsForm />
      </div>
    </div>
  );
}

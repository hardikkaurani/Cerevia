'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';

export function SettingsForm() {
  const [isSaving, setIsSaving] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccess(false);
    
    // Mock API call
    setTimeout(() => {
      setIsSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Profile Information</h3>
        <p className="text-sm text-muted-foreground">
          Update your account&apos;s profile information and email address.
        </p>
        
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium leading-none">Name</label>
            <input 
              id="name" 
              defaultValue="Hardi"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">Email</label>
            <input 
              id="email" 
              type="email"
              defaultValue="hardi@example.com"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="bio" className="text-sm font-medium leading-none">Bio</label>
            <textarea 
              id="bio" 
              rows={4}
              defaultValue="Full Stack Developer learning Next.js App Router."
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6 space-y-4">
        <h3 className="text-lg font-medium text-foreground">Notifications</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive emails about your account activity.</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Marketing Emails</p>
              <p className="text-sm text-muted-foreground">Receive emails about new products, features, and more.</p>
            </div>
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6 flex items-center justify-end gap-4">
        {success && <span className="text-sm text-success font-medium">Saved successfully!</span>}
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </form>
  );
}

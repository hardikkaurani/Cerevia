'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/providers/AuthProvider';
import { Loader2 } from 'lucide-react';
import api from '@/services/api';

interface ProfileResponse {
  fullName?: string;
  avatar?: string;
  bio?: string;
  email?: string;
}

export function SettingsForm() {
  const { refreshUser } = useAuth();
  
  const [fullName, setFullName] = React.useState('');
  const [avatar, setAvatar] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [email, setEmail] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get<ProfileResponse>('/api/user/profile');
        if (res.success && res.data) {
          setFullName(res.data.fullName || '');
          setAvatar(res.data.avatar || '');
          setBio(res.data.bio || '');
          setEmail(res.data.email || '');
        }
      } catch (err) {
        console.error('Failed to load profile data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);
    
    try {
      const payload = {
        fullName,
        avatar: avatar || null,
        bio: bio || null,
      };

      const res = await api.put<ProfileResponse>('/api/user/profile', payload);
      if (res.success) {
        setSuccess(true);
        await refreshUser();
        setTimeout(() => setSuccess(false), 4000);
      } else {
        setError(res.error?.message || 'Failed to update profile settings.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred during submission.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-base font-sans font-semibold text-foreground">Public Profile Details</h3>
        <p className="text-xs text-muted-foreground font-sans leading-relaxed">
          Configure how your credentials and public information look on the Cerevia platform.
        </p>
        
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-md text-sm font-sans font-medium">
            {error}
          </div>
        )}

        <div className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="fullName" className="text-xs font-sans font-semibold text-muted-foreground">Full Name</label>
            <input 
              id="fullName" 
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Hardi Kaurani"
              className="flex h-10 w-full rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all font-sans"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="email" className="text-xs font-sans font-semibold text-muted-foreground">Account Email (Read-Only)</label>
            <input 
              id="email" 
              type="email"
              value={email}
              disabled
              className="flex h-10 w-full rounded-md border border-border bg-muted/65 px-4 py-2 text-sm text-muted-foreground cursor-not-allowed font-sans"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="avatar" className="text-xs font-sans font-semibold text-muted-foreground">Avatar Image URL</label>
            <input 
              id="avatar" 
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="e.g. https://example.com/avatar.png"
              className="flex h-10 w-full rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all font-sans"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="bio" className="text-xs font-sans font-semibold text-muted-foreground">Short Biography</label>
            <textarea 
              id="bio" 
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell other engineers about yourself..."
              className="flex w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all resize-none font-sans"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6 flex items-center justify-end gap-4">
        {success && <span className="text-sm font-sans font-medium text-primary">Profile configuration updated!</span>}
        <Button type="submit" disabled={isSaving} className="px-6">
          {isSaving ? 'Updating...' : 'Save Configuration'}
        </Button>
      </div>
    </form>
  );
}

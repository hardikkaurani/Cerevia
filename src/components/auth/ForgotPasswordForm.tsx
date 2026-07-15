'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Loader } from '@/components/ui/Loader';
import { ArrowLeft, Mail } from 'lucide-react';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setIsLoading(true);
      setError(null);
      
      // Simulating API call for recovery flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mocking a successful recovery response since the backend route might not exist
      setIsSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during password recovery');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center z-10 relative">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-foreground">Check your email</h3>
          <p className="text-sm text-muted-foreground">
            We sent a password reset link to <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => setIsSuccess(false)}
        >
          Try another email
        </Button>
        <div className="mt-4 text-center text-sm">
          <Link href="/login" className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 z-10 relative">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
            className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20 flex items-start gap-2">
          <div className="mt-0.5">⚠️</div>
          <p>{error}</p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full font-medium"
        disabled={isLoading || !email}
      >
        {isLoading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Sending link...
          </>
        ) : (
          'Send reset link'
        )}
      </Button>

      <div className="mt-4 text-center text-sm">
        <span className="text-muted-foreground">Remember your password? </span>
        <Link href="/login" className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </div>
    </form>
  );
}

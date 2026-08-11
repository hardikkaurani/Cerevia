import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getValidUrl(urlStr?: string): string {
  if (!urlStr) return 'https://cerevia.vercel.app';
  let formatted = urlStr.trim();
  if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
    formatted = `https://${formatted}`;
  }
  try {
    new URL(formatted);
    return formatted;
  } catch {
    return 'https://cerevia.vercel.app';
  }
}

export function getCleanDisplayName(user?: { fullName?: string | null; email?: string | null } | null): string {
  if (!user) return 'Student';
  const rawName = user.fullName?.trim() || '';
  if (!rawName || rawName.includes('&#') || rawName.includes('\\') || rawName.length <= 1) {
    if (user.email) {
      const username = user.email.split('@')[0];
      return username.charAt(0).toUpperCase() + username.slice(1);
    }
    return 'Student';
  }
  return rawName;
}

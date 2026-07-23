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

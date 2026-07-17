import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cerevia | Gamified Backend Syllabus Engine',
  description: "Powering daily learning streaks and weekly competitive leaderboards at scale for software engineers.",
  keywords: ['nextjs', 'typescript', 'gamification', 'learning system', 'leaderboard', 'streaks', 'backend engineering'],
  authors: [{ name: 'Cerevia Dev Team' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground selection:bg-orange-500/20 selection:text-orange-500">
        <ThemeProvider defaultTheme="system">
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


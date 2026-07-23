'use client';

import { PageContainer } from '@/components/layout/PageContainer';

export function ProfileSkeleton() {
  return (
    <PageContainer className="bg-slate-50/60 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6 animate-pulse p-4 sm:p-6">
        
        {/* Header Skeleton */}
        <div className="h-64 rounded-3xl bg-slate-200 w-full" />

        {/* Core Metrics Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-slate-200" />
          ))}
        </div>

        {/* Certificates Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="h-48 rounded-3xl bg-slate-200" />
          <div className="h-48 rounded-3xl bg-slate-200" />
        </div>

        {/* Skills Cards Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-36 rounded-2xl bg-slate-200" />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

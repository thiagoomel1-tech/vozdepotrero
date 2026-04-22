import React from 'react';
import Topbar from './Topbar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <Topbar />
      <main className="w-full max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-12 2xl:px-16 pb-24">
        {children}
      </main>
    </div>
  );
}
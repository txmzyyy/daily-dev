import React from 'react';
import Header from './Header';
import BottomNav from './BottomNav';

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col pb-16 sm:pb-0">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
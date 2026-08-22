import React from 'react';

export default function Splash({ onNavigate }) {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col items-center justify-between p-6 sm:p-12 text-center">
      <div className="w-full flex justify-end">
        <button
          onClick={() => onNavigate?.('login')}
          className="text-xs font-['JetBrains_Mono'] text-zinc-400 hover:text-[#84cc16] uppercase border border-zinc-800 px-4 py-2"
        >
          Sign In
        </button>
      </div>

      <div className="max-w-xl space-y-6 my-auto">
        <div className="inline-block bg-[#7c3aed]/20 border border-[#7c3aed] text-[#84cc16] px-3 py-1 text-xs font-['JetBrains_Mono'] uppercase tracking-widest">
          daily.dev Wireframe Blueprint
        </div>
        <h1 className="font-['Outfit'] text-4xl sm:text-6xl font-black tracking-tight leading-tight">
          Where developers stay sharp.
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto">
          The developer homepage. Stay up to date on engineering articles, tech news, and developer updates.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate?.('signup')}
            className="bg-[#84cc16] text-black font-['JetBrains_Mono'] font-bold px-8 py-3.5 uppercase text-xs hover:bg-lime-400 transition-colors"
          >
            Get Started
          </button>
          <button
            onClick={() => onNavigate?.('login')}
            className="bg-zinc-900 border border-zinc-800 text-zinc-300 font-['JetBrains_Mono'] px-8 py-3.5 uppercase text-xs hover:bg-zinc-800 transition-colors"
          >
            Demo Quick Login
          </button>
        </div>
      </div>

      <div className="text-[11px] font-['JetBrains_Mono'] text-zinc-600">
        MOBILE-FIRST DESIGN • 375x812 ADAPTIVE GRID
      </div>
    </div>
  );
}
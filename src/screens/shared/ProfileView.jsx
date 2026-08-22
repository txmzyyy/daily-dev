import React from 'react';

export default function ProfileView({ onNavigate }) {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-4 sm:p-6 md:p-8 max-w-4xl mx-auto pb-24">
      <div className="bg-zinc-900/60 border border-zinc-800 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-violet-600/30 border-2 border-[#7c3aed] flex items-center justify-center text-2xl font-bold text-violet-200 shrink-0">
          AR
        </div>

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="font-['Outfit'] text-2xl font-bold">Alex Rivers</h1>
            <button
              onClick={() => onNavigate?.('profile-edit')}
              className="px-4 py-1.5 border border-zinc-700 bg-zinc-800 text-xs font-['JetBrains_Mono'] uppercase hover:border-zinc-500 self-center sm:self-auto"
            >
              Edit Profile
            </button>
          </div>
          <p className="text-zinc-400 text-sm max-w-lg">
            Senior Fullstack Engineer working with React, Node, and Rust.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
            <span className="text-[11px] font-['JetBrains_Mono'] bg-zinc-800 text-zinc-300 px-2 py-0.5 border border-zinc-700">
              Frontend
            </span>
            <span className="text-[11px] font-['JetBrains_Mono'] bg-zinc-800 text-zinc-300 px-2 py-0.5 border border-zinc-700">
              Backend
            </span>
          </div>
        </div>
      </div>

      <div className="border-b border-zinc-800 flex gap-6 text-sm font-['JetBrains_Mono'] mb-6">
        <button className="pb-3 border-b-2 border-[#84cc16] text-[#84cc16] font-bold">
          Posted Content
        </button>
        <button className="pb-3 text-zinc-500 hover:text-zinc-300">
          Saved Items
        </button>
      </div>

      <div className="text-center py-12 border border-dashed border-zinc-800">
        <p className="text-zinc-500 font-['JetBrains_Mono'] text-sm">NO PUBLIC POSTS YET</p>
      </div>
    </div>
  );
}
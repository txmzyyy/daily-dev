import React, { useState } from 'react';

export default function OnboardingProfile({ onNavigate }) {
  const [bio, setBio] = useState('Senior engineer. Loves distributed systems and coffee.');

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col justify-between p-4 sm:p-8 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-[#7c3aed] w-full"></div>
          </div>
          <p className="text-xs font-['JetBrains_Mono'] text-[#84cc16] uppercase">Step 2 of 2</p>
          <h1 className="font-['Outfit'] text-2xl sm:text-4xl font-extrabold">Set up your profile</h1>
          <p className="text-zinc-400 text-sm">Let the community know who you are. You can always edit this later.</p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-zinc-800 bg-zinc-900/40">
            <div className="w-16 h-16 rounded-full bg-violet-900/40 border border-[#7c3aed] flex items-center justify-center text-violet-300 text-xl font-bold">
              DEV
            </div>
            <div className="text-center sm:text-left space-y-1">
              <button className="text-xs font-['JetBrains_Mono'] bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 border border-zinc-700">
                Upload Avatar
              </button>
              <p className="text-[11px] text-zinc-500">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-['JetBrains_Mono'] text-zinc-400">
              <label>BIO</label>
              <span>{bio.length}/160</span>
            </div>
            <textarea
              maxLength={160}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm text-zinc-100 focus:border-[#7c3aed] focus:outline-none min-h-[100px]"
            />
          </div>
        </div>
      </div>

      <div className="pt-8 flex gap-4">
        <button
          onClick={() => onNavigate?.('onboarding-interests')}
          className="w-1/2 sm:w-auto bg-zinc-900 border border-zinc-800 text-zinc-300 font-['JetBrains_Mono'] px-6 py-3 uppercase text-xs hover:bg-zinc-800"
        >
          &larr; Back
        </button>
        <button
          onClick={() => onNavigate?.('home')}
          className="w-1/2 sm:w-auto flex-1 bg-[#84cc16] text-black font-['JetBrains_Mono'] font-bold px-8 py-3 uppercase text-xs hover:bg-lime-400 transition-colors"
        >
          Complete Setup
        </button>
      </div>
    </div>
  );
}
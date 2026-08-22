import React, { useState } from 'react';

export default function SignUp({ onNavigate }) {
  const [role, setRole] = useState('developer');

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 p-6 sm:p-8 space-y-6">
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold">Join the community</h1>
          <p className="text-zinc-400 text-xs sm:text-sm">Create your developer account.</p>
        </div>

        <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-900 border border-zinc-800">
          <button
            type="button"
            onClick={() => setRole('developer')}
            className={`py-2 text-xs font-['JetBrains_Mono'] uppercase transition-colors ${
              role === 'developer' ? 'bg-[#7c3aed] text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Developer
          </button>
          <button
            type="button"
            onClick={() => setRole('writer')}
            className={`py-2 text-xs font-['JetBrains_Mono'] uppercase transition-colors ${
              role === 'writer' ? 'bg-[#7c3aed] text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Tech Writer
          </button>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1">
            <label className="text-[11px] font-['JetBrains_Mono'] text-zinc-400 uppercase">Full Name</label>
            <input
              type="text"
              placeholder="Jane Doe"
              className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm focus:border-[#7c3aed] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-['JetBrains_Mono'] text-zinc-400 uppercase">Email</label>
            <input
              type="email"
              placeholder="you@company.dev"
              className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm focus:border-[#7c3aed] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-['JetBrains_Mono'] text-zinc-400 uppercase">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm focus:border-[#7c3aed] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            onClick={() => onNavigate?.('onboarding-interests')}
            className="w-full bg-[#84cc16] text-black font-['JetBrains_Mono'] font-bold py-3 uppercase text-xs hover:bg-lime-400 transition-colors"
          >
            Create Account &rarr;
          </button>
        </form>

        <p className="text-center text-xs text-zinc-500 font-['JetBrains_Mono']">
          Already have an account?{' '}
          <button onClick={() => onNavigate?.('login')} className="text-[#84cc16] underline">
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}
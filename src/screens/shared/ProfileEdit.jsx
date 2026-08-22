import React from 'react';

export default function ProfileEdit({ onNavigate }) {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-4 sm:p-6 max-w-2xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
        <h1 className="font-['Outfit'] text-2xl font-bold">Edit Profile</h1>
        <button
          onClick={() => onNavigate?.('profile-view')}
          className="text-xs font-['JetBrains_Mono'] text-zinc-400 hover:text-white"
        >
          Cancel
        </button>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <label className="text-xs font-['JetBrains_Mono'] text-zinc-400 uppercase">Display Name</label>
          <input
            type="text"
            defaultValue="Alex Rivers"
            className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm focus:border-[#7c3aed] focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-['JetBrains_Mono'] text-zinc-400 uppercase">Bio</label>
          <textarea
            defaultValue="Senior Fullstack Engineer working with React, Node, and Rust."
            className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm focus:border-[#7c3aed] focus:outline-none h-24"
          />
        </div>

        <div className="pt-4 border-t border-zinc-800 space-y-4">
          <h3 className="font-['Outfit'] text-base font-semibold text-zinc-200">Change Password</h3>
          <input
            type="password"
            placeholder="Current Password"
            className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm focus:border-[#7c3aed] focus:outline-none"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm focus:border-[#7c3aed] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#7c3aed] text-white font-['JetBrains_Mono'] font-bold py-3 uppercase text-xs hover:bg-violet-600 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
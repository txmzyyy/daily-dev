import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-between p-6">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center items-center text-center">
        
        {/* Brand Icon */}
        <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center font-black text-4xl mb-6 shadow-2xl shadow-indigo-600/40">
          d.
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight mb-2">daily.dev</h1>
        <p className="text-lg text-zinc-300 font-medium mb-1">Where developers stay sharp.</p>
        <p className="text-sm text-zinc-500 mb-8">Curated content, zero noise.</p>

        {/* Category Pills matching Figma */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-xs">
          <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3.5 py-1.5 rounded-full text-xs font-medium">Articles</span>
          <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3.5 py-1.5 rounded-full text-xs font-medium">Videos</span>
          <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3.5 py-1.5 rounded-full text-xs font-medium">Podcasts</span>
          <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3.5 py-1.5 rounded-full text-xs font-medium">Discussions</span>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-3 gap-4 w-full mb-10 border-y border-zinc-800/80 py-4">
          <div>
            <p className="text-xl font-bold text-white">42k</p>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Articles</p>
          </div>
          <div>
            <p className="text-xl font-bold text-white">8.4k</p>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Writers</p>
          </div>
          <div>
            <p className="text-xl font-bold text-white">210k</p>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Devs</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <Link
            to="/signup"
            className="block w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-indigo-600/25"
          >
            Create account
          </Link>
          
          <Link
            to="/login"
            className="block w-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-200 font-semibold py-3 rounded-xl transition"
          >
            Sign in
          </Link>

          <Link
            to="/feed"
            className="block text-xs font-medium text-zinc-400 hover:text-white pt-2 transition"
          >
            Continue as guest
          </Link>
        </div>

      </div>
    </div>
  );
}
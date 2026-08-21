import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-2xl mb-6 shadow-xl shadow-indigo-600/30">
        d.
      </div>
      <h1 className="text-5xl font-extrabold tracking-tight mb-2">404</h1>
      <p className="text-sm text-zinc-400 mb-8">This page drifted off the feed. Let's get you back.</p>
      <Link
        to="/feed"
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition shadow-lg shadow-indigo-600/25"
      >
        Back to Feed
      </Link>
    </div>
  );
}
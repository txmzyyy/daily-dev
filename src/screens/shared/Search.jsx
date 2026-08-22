import React, { useState } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-4 sm:p-6 max-w-4xl mx-auto pb-24">
      <div className="space-y-4 mb-6">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles, videos, or tags..."
          className="w-full bg-zinc-900 border border-zinc-800 p-4 text-base focus:border-[#7c3aed] focus:outline-none"
        />

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['all', 'article', 'video', 'audio'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-['JetBrains_Mono'] uppercase border whitespace-nowrap ${
                filter === f
                  ? 'bg-[#7c3aed] border-[#7c3aed] text-white'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-zinc-800 pt-6">
        {!query ? (
          <p className="text-center text-zinc-500 font-['JetBrains_Mono'] text-sm py-12">
            TYPE A QUERY TO SEARCH CONTENT
          </p>
        ) : (
          <p className="text-zinc-400 text-sm">Showing results for "{query}"...</p>
        )}
      </div>
    </div>
  );
}
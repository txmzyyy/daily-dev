import React, { useState } from 'react';
import { mockContent } from '../mockContent';
import { Bookmark, Trash2, ExternalLink } from 'lucide-react';

export default function Wishlist({ onNavigate }) {
  // Pulling sample mock content tagged as saved
  const [savedItems, setSavedItems] = useState(
    mockContent ? mockContent.slice(0, 4) : [
      {
        id: '1',
        title: 'React Server Components Are Changing How We Think About State',
        type: 'article',
        category: 'Frontend',
        readTime: '9 min read',
        author: 'Sarah Chen',
        date: '2026-08-15'
      },
      {
        id: '2',
        title: 'Building Resilient Microservices with Go and gRPC',
        type: 'video',
        category: 'Backend',
        readTime: '18 min watch',
        author: 'Marcus Vance',
        date: '2026-08-18'
      }
    ]
  );

  const removeItem = (id) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-4 sm:p-6 md:p-8 max-w-7xl mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#84cc16] font-['JetBrains_Mono'] text-xs uppercase mb-1">
            <Bookmark size={14} />
            <span>Saved Content</span>
          </div>
          <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-bold tracking-tight">
            Your Reading List
          </h1>
        </div>
        <p className="text-zinc-500 font-['JetBrains_Mono'] text-xs self-start sm:self-auto">
          {savedItems.length} {savedItems.length === 1 ? 'ITEM' : 'ITEMS'} SAVED
        </p>
      </div>

      {/* Empty State */}
      {savedItems.length === 0 ? (
        <div className="border border-dashed border-zinc-800 p-12 text-center my-8 bg-zinc-950/40">
          <Bookmark size={32} className="mx-auto text-zinc-600 mb-3" />
          <p className="text-zinc-400 font-['Outfit'] text-base font-semibold">Your wishlist is empty</p>
          <p className="text-zinc-500 font-['JetBrains_Mono'] text-xs mt-1 mb-4">
            Bookmark posts from your feed to read or watch later.
          </p>
          <button
            onClick={() => onNavigate?.('home')}
            className="bg-[#7c3aed] text-white font-['JetBrains_Mono'] font-bold text-xs uppercase px-6 py-2.5 hover:bg-violet-600 transition-colors"
          >
            Explore Home Feed
          </button>
        </div>
      ) : (
        /* Responsive Card Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedItems.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-950 border border-zinc-800 p-5 flex flex-col justify-between hover:border-zinc-700 transition-all group relative"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-['JetBrains_Mono'] uppercase font-bold px-2 py-0.5 bg-[#7c3aed]/20 text-[#84cc16] border border-[#7c3aed]/40">
                    {item.type || 'ARTICLE'}
                  </span>
                  <span className="text-[11px] font-['JetBrains_Mono'] text-zinc-500">
                    {item.readTime || '5 min read'}
                  </span>
                </div>

                {/* Title */}
                <h3 
                  onClick={() => onNavigate?.('content-detail', { id: item.id })}
                  className="font-['Outfit'] font-bold text-base sm:text-lg text-zinc-100 group-hover:text-[#84cc16] cursor-pointer transition-colors line-clamp-2 mb-3"
                >
                  {item.title}
                </h3>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-2 border-t border-zinc-900 flex items-center justify-between">
                <div className="text-xs font-['JetBrains_Mono'] text-zinc-400">
                  <span className="text-zinc-500">By </span>
                  {item.author || 'Dev Contributor'}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/30"
                    title="Remove from wishlist"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    onClick={() => onNavigate?.('content-detail', { id: item.id })}
                    className="p-2 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
                    title="Open details"
                    aria-label="Open details"
                  >
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
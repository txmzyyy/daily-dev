import React, { useState } from 'react';

export default function PostContent({ onNavigate }) {
  const [contentType, setContentType] = useState('article');

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-4 sm:p-6 md:p-8 max-w-3xl mx-auto pb-24">
      <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-bold mb-6">Submit Content</h1>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div>
          <label className="block text-xs font-['JetBrains_Mono'] text-zinc-400 uppercase mb-2">Content Type</label>
          <div className="grid grid-cols-3 gap-2">
            {['article', 'video', 'audio'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setContentType(type)}
                className={`py-2.5 text-xs font-['JetBrains_Mono'] uppercase border ${
                  contentType === type
                    ? 'bg-[#7c3aed] border-[#7c3aed] text-white'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-['JetBrains_Mono'] text-zinc-400 uppercase mb-2">URL / Link</label>
          <input
            type="url"
            placeholder="https://..."
            className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm focus:border-[#7c3aed] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-['JetBrains_Mono'] text-zinc-400 uppercase mb-2">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm focus:border-[#7c3aed] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-['JetBrains_Mono'] text-zinc-400 uppercase mb-2">Category</label>
          <select className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm focus:border-[#7c3aed] focus:outline-none text-zinc-300">
            <option>Frontend</option>
            <option>Backend</option>
            <option>DevOps</option>
            <option>Mobile</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-['JetBrains_Mono'] text-zinc-400 uppercase mb-2">Description</label>
          <textarea
            rows={4}
            placeholder="Brief summary..."
            className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm focus:border-[#7c3aed] focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
          <button
            type="button"
            onClick={() => onNavigate?.('home')}
            className="px-5 py-2.5 bg-zinc-900 text-zinc-400 border border-zinc-800 text-xs font-['JetBrains_Mono'] uppercase"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#84cc16] text-black font-['JetBrains_Mono'] font-bold text-xs uppercase hover:bg-lime-400 transition-colors"
          >
            Submit for Review
          </button>
        </div>
      </form>
    </div>
  );
}
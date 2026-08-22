import React, { useState } from 'react';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';

export default function EditContent({ onNavigate }) {
  const [form, setForm] = useState({
    title: 'React Server Components Are Changing How We Think About State',
    type: 'article',
    url: 'https://dev.to/react/rsc-state-management-2026',
    category: 'Frontend',
    summary: 'A deep dive into RSC architecture, why client/server boundaries matter, and how streaming changes state models.'
  });

  const handleChange = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-4 sm:p-6 md:p-8 max-w-4xl mx-auto pb-24">
      <button
        onClick={() => onNavigate?.('writer-dashboard')}
        className="flex items-center gap-2 text-xs font-['JetBrains_Mono'] text-zinc-400 hover:text-white mb-6 p-2 border border-zinc-800 bg-zinc-950/60 w-fit transition-colors"
      >
        <ArrowLeft size={16} />
        <span>BACK TO DASHBOARD</span>
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4 mb-8">
        <div>
          <span className="text-[10px] font-['JetBrains_Mono'] uppercase font-bold px-2 py-0.5 bg-[#7c3aed]/20 text-[#7c3aed] border border-[#7c3aed]/40">
            Edit Mode
          </span>
          <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold mt-2">
            Edit Content
          </h1>
        </div>
        <button
          onClick={() => onNavigate?.('writer-dashboard')}
          className="self-start sm:self-auto p-2 text-xs font-['JetBrains_Mono'] uppercase border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-1.5"
        >
          <Trash2 size={14} />
          <span>Delete Post</span>
        </button>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div>
          <label className="block text-xs font-['JetBrains_Mono'] text-zinc-400 uppercase mb-2">Content Format</label>
          <div className="grid grid-cols-3 gap-2">
            {['article', 'video', 'audio'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setForm({ ...form, type: t })}
                className={`py-2.5 text-xs font-['JetBrains_Mono'] uppercase border ${
                  form.type === t
                    ? 'bg-[#7c3aed] border-[#7c3aed] text-white font-bold'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-['JetBrains_Mono'] text-zinc-400 uppercase">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={handleChange('title')}
              className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm focus:border-[#7c3aed] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-['JetBrains_Mono'] text-zinc-400 uppercase">Canonical URL</label>
            <input
              type="url"
              value={form.url}
              onChange={handleChange('url')}
              className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm focus:border-[#7c3aed] focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-['JetBrains_Mono'] text-zinc-400 uppercase">Category</label>
          <select
            value={form.category}
            onChange={handleChange('category')}
            className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm focus:border-[#7c3aed] focus:outline-none text-zinc-200"
          >
            <option>Frontend</option>
            <option>Backend</option>
            <option>DevOps</option>
            <option>Mobile</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-['JetBrains_Mono'] text-zinc-400 uppercase">Summary</label>
          <textarea
            rows={4}
            value={form.summary}
            onChange={handleChange('summary')}
            className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm focus:border-[#7c3aed] focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
          <button
            type="button"
            onClick={() => onNavigate?.('writer-dashboard')}
            className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-['JetBrains_Mono'] uppercase"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => onNavigate?.('writer-dashboard')}
            className="px-6 py-2.5 bg-[#84cc16] text-black font-['JetBrains_Mono'] font-bold text-xs uppercase hover:bg-lime-400 transition-colors flex items-center gap-2"
          >
            <Save size={14} />
            <span>Update Post</span>
          </button>
        </div>
      </form>
    </div>
  );
}
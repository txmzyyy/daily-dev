import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/layout/AppLayout';
import { addContent } from '../../features/content/contentSlice';

export default function CreateContentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    type: 'ARTICLE',
    category: categories[0] || 'Frontend',
    readTime: '5 min read',
    content: '',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    author: { name: 'Writer User', role: 'writer', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addContent(formData));
    navigate('/writer/dashboard');
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Create Content Post</h1>
          <p className="text-xs text-zinc-400">Share technical insights with the Moringa community.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">Content Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Building Async Microservices with Flask"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">Type</label>
              <select
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="ARTICLE">ARTICLE</option>
                <option value="VIDEO">VIDEO</option>
                <option value="PODCAST">PODCAST</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">Category</label>
              <select
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">Summary Description</label>
            <textarea
              rows={2}
              required
              placeholder="Brief introduction..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">Body Content / URL</label>
            <textarea
              rows={5}
              required
              placeholder="Article body or video embed link..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/writer/dashboard')}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20"
            >
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
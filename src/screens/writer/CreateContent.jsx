import React, { useState } from 'react';
import { ArrowLeft, Plus, Link, FileText, Video, Mic, Sparkles } from 'lucide-react';

export default function CreateContent({ onNavigate }) {
  const [contentType, setContentType] = useState('article');
  const [showNewCatModal, setShowNewCatModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [categories, setCategories] = useState([
    'Frontend', 'Backend', 'DevOps', 'Mobile', 'Data / ML', 'Security'
  ]);
  const [tags, setTags] = useState(['React', 'Architecture']);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (newCatName.trim() && !categories.includes(newCatName.trim())) {
      setCategories([...categories, newCatName.trim()]);
      setNewCatName('');
      setShowNewCatModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-4 sm:p-6 md:p-8 max-w-4xl mx-auto pb-24">
      {/* Top Bar Navigation */}
      <button
        onClick={() => onNavigate?.('writer-dashboard')}
        className="flex items-center gap-2 text-xs font-['JetBrains_Mono'] text-zinc-400 hover:text-white mb-6 p-2 border border-zinc-800 bg-zinc-950/60 w-fit transition-colors"
      >
        <ArrowLeft size={16} />
        <span>BACK TO DASHBOARD</span>
      </button>

      {/* Header */}
      <div className="border-b border-zinc-800 pb-4 mb-8">
        <span className="text-[10px] font-['JetBrains_Mono'] uppercase font-bold px-2 py-0.5 bg-[#7c3aed]/20 text-[#7c3aed] border border-[#7c3aed]/40">
          Tech Writer Portal
        </span>
        <h1 className="font-['Outfit'] text-2xl sm:text-4xl font-extrabold mt-2">
          Create New Content
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Publish engineering insights, tutorials, or curations directly to the platform feed.
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {/* Content Type Selector */}
        <div>
          <label className="block text-xs font-['JetBrains_Mono'] text-zinc-400 uppercase mb-2">
            Content Format
          </label>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {[
              { id: 'article', label: 'Article', icon: FileText },
              { id: 'video', label: 'Video', icon: Video },
              { id: 'audio', label: 'Audio / Podcast', icon: Mic }
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = contentType === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setContentType(item.id)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-2 p-3 sm:p-4 border text-xs font-['JetBrains_Mono'] uppercase transition-all ${
                    isSelected
                      ? 'bg-[#7c3aed] border-[#7c3aed] text-white font-bold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Title and External URL Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-['JetBrains_Mono'] text-zinc-400 uppercase">
              Title <span className="text-[#84cc16]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Deep Dive into Distributed Locking"
              className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm focus:border-[#7c3aed] focus:outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-['JetBrains_Mono'] text-zinc-400 uppercase">
              Canonical URL / External Link
            </label>
            <div className="relative">
              <input
                type="url"
                placeholder="https://dev.to/..."
                className="w-full bg-zinc-900 border border-zinc-800 p-3 pl-10 text-sm focus:border-[#7c3aed] focus:outline-none"
              />
              <Link size={16} className="absolute left-3 top-3.5 text-zinc-500" />
            </div>
          </div>
        </div>

        {/* Category Selector with Shortcut Modal Trigger */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-['JetBrains_Mono'] text-zinc-400 uppercase">
              Primary Category
            </label>
            <button
              type="button"
              onClick={() => setShowNewCatModal(true)}
              className="text-xs font-['JetBrains_Mono'] text-[#84cc16] hover:underline flex items-center gap-1"
            >
              <Plus size={12} />
              <span>New Category</span>
            </button>
          </div>
          <select className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm focus:border-[#7c3aed] focus:outline-none text-zinc-200">
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Dynamic Expertise Tags */}
        <div className="space-y-2">
          <label className="text-[11px] font-['JetBrains_Mono'] text-zinc-400 uppercase">
            Tags (Press Enter to add)
          </label>
          <div className="flex flex-wrap gap-2 p-3 bg-zinc-900 border border-zinc-800 min-h-[50px] items-center">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 bg-zinc-800 text-zinc-200 text-xs font-['JetBrains_Mono'] px-2.5 py-1 border border-zinc-700"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-zinc-400 hover:text-red-400 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder={tags.length === 0 ? "Type tag and press enter..." : ""}
              className="bg-transparent text-sm focus:outline-none text-zinc-100 flex-1 min-w-[120px]"
            />
          </div>
        </div>

        {/* Content Body / Summary */}
        <div className="space-y-1">
          <label className="text-[11px] font-['JetBrains_Mono'] text-zinc-400 uppercase">
            Summary / Content Snippet
          </label>
          <textarea
            rows={5}
            placeholder="Write a compelling breakdown or markdown body..."
            className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm focus:border-[#7c3aed] focus:outline-none"
          />
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-zinc-800">
          <span className="text-[11px] font-['JetBrains_Mono'] text-zinc-500">
            Auto-saves to drafts locally
          </span>
          <div className="flex w-full sm:w-auto gap-3">
            <button
              type="button"
              onClick={() => onNavigate?.('writer-dashboard')}
              className="flex-1 sm:flex-initial px-5 py-3 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-['JetBrains_Mono'] uppercase"
            >
              Save Draft
            </button>
            <button
              type="submit"
              onClick={() => onNavigate?.('writer-dashboard')}
              className="flex-1 sm:flex-initial px-6 py-3 bg-[#84cc16] text-black font-['JetBrains_Mono'] font-bold text-xs uppercase hover:bg-lime-400 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles size={14} />
              <span>Publish Article</span>
            </button>
          </div>
        </div>
      </form>

      {/* Shortcut Modal: Add New Category */}
      {showNewCatModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-md p-6 space-y-4">
            <h3 className="font-['Outfit'] text-xl font-bold text-white">Create New Category</h3>
            <div className="space-y-1">
              <label className="text-[11px] font-['JetBrains_Mono'] text-zinc-400 uppercase">
                Category Name
              </label>
              <input
                type="text"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. AI Engineering"
                className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm text-white focus:border-[#7c3aed] focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewCatModal(false)}
                className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-['JetBrains_Mono'] uppercase"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateCategory}
                className="px-4 py-2 bg-[#7c3aed] text-white text-xs font-['JetBrains_Mono'] uppercase font-bold hover:bg-violet-600"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
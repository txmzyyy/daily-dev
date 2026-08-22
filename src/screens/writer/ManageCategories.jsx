import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, FolderTree, Tag } from 'lucide-react';

export default function ManageCategories({ onNavigate }) {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [categories, setCategories] = useState([
    { id: '1', name: 'Frontend', description: 'UI frameworks, browsers, CSS, and web client tooling', parent: 'Engineering', postCount: 2840 },
    { id: '2', name: 'Backend', description: 'Server architecture, API design, microservices, and databases', parent: 'Engineering', postCount: 1920 },
    { id: '3', name: 'DevOps', description: 'CI/CD, cloud infrastructure, containerization, and monitoring', parent: 'Infrastructure', postCount: 1530 },
    { id: '4', name: 'Mobile', description: 'iOS, Android, React Native, and Flutter development', parent: 'Engineering', postCount: 1040 },
    { id: '5', name: 'Data / ML', description: 'Data pipelines, Machine Learning models, and AI tooling', parent: 'Data Science', postCount: 1280 }
  ]);

  const [form, setForm] = useState({ name: '', description: '', parent: 'Engineering' });

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setForm({ name: '', description: '', parent: 'Engineering' });
    setShowModal(true);
  };

  const handleOpenEdit = (category) => {
    setEditingCategory(category);
    setForm({ name: category.name, description: category.description, parent: category.parent });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (editingCategory) {
      setCategories(prev =>
        prev.map(c => (c.id === editingCategory.id ? { ...c, ...form } : c))
      );
    } else {
      setCategories(prev => [
        ...prev,
        { id: String(Date.now()), ...form, postCount: 0 }
      ]);
    }
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-4 sm:p-6 md:p-8 max-w-7xl mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#84cc16] font-['JetBrains_Mono'] text-xs uppercase mb-1">
            <FolderTree size={14} />
            <span>Taxonomy Management</span>
          </div>
          <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-bold tracking-tight">
            Manage Categories
          </h1>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-[#84cc16] text-black font-['JetBrains_Mono'] font-bold text-xs uppercase px-4 py-2.5 hover:bg-lime-400 transition-colors flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>New Category</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="relative mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter categories by name or description..."
          className="w-full bg-zinc-900 border border-zinc-800 p-3.5 pl-10 text-sm focus:border-[#7c3aed] focus:outline-none"
        />
        <Search size={16} className="absolute left-3.5 top-4 text-zinc-500" />
      </div>

      {/* Desktop Table View (hidden on mobile) */}
      <div className="hidden md:block border border-zinc-800 bg-zinc-950 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/50 text-[11px] font-['JetBrains_Mono'] uppercase text-zinc-400">
              <th className="p-4">Category Name</th>
              <th className="p-4">Parent Group</th>
              <th className="p-4">Description</th>
              <th className="p-4">Post Count</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {filteredCategories.map((cat) => (
              <tr key={cat.id} className="hover:bg-zinc-900/30 transition-colors group">
                <td className="p-4 font-bold text-sm text-zinc-100 group-hover:text-[#84cc16]">
                  {cat.name}
                </td>
                <td className="p-4">
                  <span className="text-[11px] font-['JetBrains_Mono'] bg-zinc-900 text-zinc-400 px-2.5 py-1 border border-zinc-800">
                    {cat.parent}
                  </span>
                </td>
                <td className="p-4 text-xs text-zinc-400 max-w-xs truncate">
                  {cat.description}
                </td>
                <td className="p-4 text-xs font-['JetBrains_Mono'] text-zinc-300">
                  {cat.postCount.toLocaleString()}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEdit(cat)}
                      className="p-1.5 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600 bg-zinc-900"
                      title="Edit Category"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-1.5 text-zinc-400 hover:text-red-400 border border-zinc-800 hover:border-red-500/30 bg-zinc-900 hover:bg-red-500/10"
                      title="Delete Category"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View (shown on screens smaller than md) */}
      <div className="md:hidden space-y-3">
        {filteredCategories.map((cat) => (
          <div key={cat.id} className="bg-zinc-950 border border-zinc-800 p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-base text-zinc-100">{cat.name}</h3>
                <span className="inline-block mt-1 text-[10px] font-['JetBrains_Mono'] bg-zinc-900 text-zinc-400 px-2 py-0.5 border border-zinc-800">
                  {cat.parent}
                </span>
              </div>
              <span className="text-xs font-['JetBrains_Mono'] text-[#84cc16]">
                {cat.postCount} posts
              </span>
            </div>

            <p className="text-xs text-zinc-400">{cat.description}</p>

            <div className="pt-3 border-t border-zinc-900 flex justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(cat)}
                className="px-3 py-1.5 text-xs font-['JetBrains_Mono'] uppercase border border-zinc-800 text-zinc-300 flex items-center gap-1.5"
              >
                <Edit2 size={12} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="px-3 py-1.5 text-xs font-['JetBrains_Mono'] uppercase border border-red-500/30 text-red-400 hover:bg-red-500/10 flex items-center gap-1.5"
              >
                <Trash2 size={12} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Shell for Add/Edit Category */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-lg p-6 space-y-4">
            <h3 className="font-['Outfit'] text-xl font-bold text-white">
              {editingCategory ? 'Edit Category' : 'Create New Category'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-['JetBrains_Mono'] text-zinc-400 uppercase">
                  Category Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Artificial Intelligence"
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm text-white focus:border-[#7c3aed] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-['JetBrains_Mono'] text-zinc-400 uppercase">
                  Parent Group
                </label>
                <select
                  value={form.parent}
                  onChange={(e) => setForm({ ...form, parent: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm text-zinc-200 focus:border-[#7c3aed] focus:outline-none"
                >
                  <option>Engineering</option>
                  <option>Infrastructure</option>
                  <option>Data Science</option>
                  <option>Product & Design</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-['JetBrains_Mono'] text-zinc-400 uppercase">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe what content belongs in this category..."
                  className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm text-white focus:border-[#7c3aed] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-zinc-900">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-['JetBrains_Mono'] uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#84cc16] text-black font-['JetBrains_Mono'] font-bold text-xs uppercase hover:bg-lime-400 transition-colors"
                >
                  {editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
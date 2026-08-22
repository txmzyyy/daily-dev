import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { useSelector, useDispatch } from 'react-redux';
import { addCategory, removeCategory } from '../../features/categories/categorySlice';
import { Plus, Trash2 } from 'lucide-react';

export default function CategoryManagementPage() {
  const { categories } = useSelector((state) => state.categories);
  const [newCat, setNewCat] = useState('');
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();
    if (newCat.trim()) {
      dispatch(addCategory(newCat.trim()));
      setNewCat('');
    }
  };

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Category Management</h1>
          <p className="text-xs text-zinc-400">Create and structure content categories.</p>
        </div>

        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            type="text"
            required
            placeholder="New Category (e.g., DevOps, Security)"
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
          />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1">
            <Plus size={16} /> Add
          </button>
        </form>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl divide-y divide-zinc-800">
          {categories.map((c) => (
            <div key={c} className="p-3.5 flex items-center justify-between text-sm text-zinc-200">
              <span className="font-mono font-medium">{c}</span>
              <button onClick={() => dispatch(removeCategory(c))} className="text-zinc-500 hover:text-red-400">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
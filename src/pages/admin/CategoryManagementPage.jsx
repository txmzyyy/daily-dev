import React, { useEffect, useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  addCategory,
  removeCategory,
} from '../../features/categories/categorySlice';
import { Plus, Trash2 } from 'lucide-react';

export default function CategoryManagementPage() {
  const dispatch = useDispatch();

  const {
    categories = [],
    status,
    error,
  } = useSelector((state) => state.categories);

  const [newCat, setNewCat] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAdd = async (e) => {
    e.preventDefault();

    const name = newCat.trim();

    if (!name) {
      return;
    }

    try {
      await dispatch(addCategory(name)).unwrap();
      setNewCat('');
      dispatch(fetchCategories());
    } catch (err) {
      console.error('Failed to add category:', err);
    }
  };

  const handleRemove = async (category) => {
    if (!window.confirm(`Delete "${category.name}"?`)) {
      return;
    }

    try {
      await dispatch(removeCategory(category.id)).unwrap();
      dispatch(fetchCategories());
    } catch (err) {
      console.error('Failed to delete category:', err);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto space-y-6">

        <div>
          <h1 className="text-2xl font-bold text-white">
            Category Management
          </h1>

          <p className="text-xs text-zinc-400">
            Create and manage content categories.
          </p>
        </div>

        {/* Add category */}
        <form
          onSubmit={handleAdd}
          className="flex gap-2"
        >
          <input
            type="text"
            required
            placeholder="New Category e.g. DevOps"
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
          />

          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1"
          >
            <Plus size={16} />

            {status === 'loading'
              ? 'Adding...'
              : 'Add'}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-4">
            <p className="text-sm text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Categories */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl divide-y divide-zinc-800">

          {categories.length === 0 && status !== 'loading' && (
            <div className="p-6 text-center text-sm text-zinc-500">
              No categories found.
            </div>
          )}

          {categories.map((category) => (
            <div
              key={category.id}
              className="p-3.5 flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-zinc-200 font-medium">
                  {category.name}
                </p>

                <p className="text-[10px] text-zinc-500 font-mono">
                  ID: {category.id}
                </p>
              </div>

              <button
                onClick={() => handleRemove(category)}
                className="text-zinc-500 hover:text-red-400 transition"
                title="Delete category"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

        </div>

      </div>
    </AppLayout>
  );
}
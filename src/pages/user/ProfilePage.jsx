import React from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSubscribeCategory } from '../../features/auth/authSlice';

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Profile Card */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center gap-4">
          <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-indigo-500" />
          <div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-xs text-zinc-400">{user.email}</p>
            <span className="inline-block mt-2 bg-indigo-600/20 text-indigo-400 text-[10px] font-mono px-2 py-0.5 rounded border border-indigo-500/30 uppercase">
              Role: {user.role}
            </span>
          </div>
        </div>

        {/* Subscribed Topics Management */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Subscribed Topics</h3>
            <p className="text-xs text-zinc-400">Manage topics you receive notification updates for.</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => {
              const isSubscribed = user.subscribedCategories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => dispatch(toggleSubscribeCategory(cat))}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    isSubscribed
                      ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'
                  }`}
                >
                  {cat} {isSubscribed ? '✓ Subscribed' : '+ Subscribe'}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
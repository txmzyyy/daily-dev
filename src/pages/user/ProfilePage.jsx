import React, { useEffect } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCategories,
  loadSubscriptions,
  subscribeCategory,
  unsubscribeCategory,
} from '../../features/categories/categorySlice';

export default function ProfilePage() {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const {
    categories,
    subscriptions,
    subscribedCategoryIds,
    status,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());

    if (isAuthenticated) {
      dispatch(loadSubscriptions());
    }
  }, [dispatch, isAuthenticated]);

  const handleToggleSubscription = (categoryId) => {
    if (!isAuthenticated) {
      alert('Please create an account or sign in to subscribe to categories.');
      return;
    }

    if (subscribedCategoryIds.includes(categoryId)) {
      dispatch(unsubscribeCategory(categoryId));
    } else {
      dispatch(subscribeCategory(categoryId));
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* Profile Card */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center gap-4">

          {/* Avatar */}
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user?.name || 'Profile'}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-indigo-500"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
              <span className="text-xs text-zinc-500">
                No avatar
              </span>
            </div>
          )}

          {/* Profile Information */}
          <div>
            <h2 className="text-xl font-bold text-white">
              {user?.name || 'No name'}
            </h2>

            <p className="text-xs text-zinc-400">
              {user?.email || 'No email'}
            </p>

            {!user && (
              <p className="text-xs text-zinc-500 mt-1">
                No personal information
              </p>
            )}

            {user?.role && (
              <span className="inline-block mt-2 bg-indigo-600/20 text-indigo-400 text-[10px] font-mono px-2 py-0.5 rounded border border-indigo-500/30 uppercase">
                Role: {user.role}
              </span>
            )}
          </div>
        </div>

        {/* Subscribed Topics Management */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">

          <div>
            <h3 className="text-base font-bold text-white">
              Subscribed Topics
            </h3>

            <p className="text-xs text-zinc-400">
              Manage topics you receive notification updates for.
            </p>
          </div>

          {status === 'loading' ? (
            <p className="text-xs text-zinc-500">
              Loading topics...
            </p>
          ) : (
            <div className="flex flex-wrap gap-2 pt-2">

              {categories.map((category) => {
                const isSubscribed =
                  subscribedCategoryIds.includes(category.id);

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() =>
                      handleToggleSubscription(category.id)
                    }
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                      isSubscribed
                        ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'
                    }`}
                  >
                    {category.name}{' '}
                    {isSubscribed
                      ? '✓ Subscribed'
                      : '+ Subscribe'}
                  </button>
                );
              })}

            </div>
          )}

          {categories.length === 0 && status !== 'loading' && (
            <p className="text-xs text-zinc-500">
              No topics available.
            </p>
          )}

        </div>

      </div>
    </AppLayout>
  );
}
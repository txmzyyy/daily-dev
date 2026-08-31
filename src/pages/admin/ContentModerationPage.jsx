import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '../../components/layout/AppLayout';

import {
  loadPendingContent,
  approve,
  removeContent,
} from '../../features/moderation/moderationSlice';

import {
  Check,
  Trash2,
} from 'lucide-react';

export default function ContentModerationPage() {
  const dispatch = useDispatch();

  const {
    pendingContent = [],
    status,
    error,
  } = useSelector(
    (state) => state.moderation
  );

  useEffect(() => {
    dispatch(loadPendingContent());
  }, [dispatch]);

  const handleApprove = async (id) => {
    try {
      await dispatch(approve(id)).unwrap();
      dispatch(loadPendingContent());
    } catch (err) {
      console.error('Approval failed:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this content?')) {
      return;
    }

    try {
      await dispatch(removeContent(id)).unwrap();
      dispatch(loadPendingContent());
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-2xl font-bold text-white">
            Content Moderation
          </h1>

          <p className="text-xs text-zinc-400">
            Review content submitted by writers and users.
          </p>
        </div>

        {status === 'loading' && (
          <div className="text-center py-12 text-zinc-500">
            Loading pending content...
          </div>
        )}

        {status === 'failed' && (
          <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-4">
            <p className="text-sm text-red-400">
              {error || 'Failed to load pending content.'}
            </p>
          </div>
        )}

        {status !== 'loading' &&
          pendingContent.length === 0 && (
            <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl">
              <p className="text-sm text-zinc-400">
                No pending content.
              </p>
            </div>
          )}

        <div className="space-y-4">

          {pendingContent.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl"
            >

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div className="min-w-0">

                  <p className="text-sm font-bold text-white">
                    {item.title}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">

                    <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded">
                      ID: {item.id}
                    </span>

                    <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded">
                      {item.type}
                    </span>

                    <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded">
                      {item.category || 'Uncategorized'}
                    </span>

                  </div>

                  <p className="text-xs text-zinc-500 mt-2">
                    Author: {item.author || 'Unknown'}
                  </p>

                </div>

                <div className="flex items-center gap-2">

                  <button
                    onClick={() => handleApprove(item.id)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-600/30 text-xs font-semibold"
                  >
                    <Check size={15} />
                    Approve
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30 text-xs font-semibold"
                  >
                    <Trash2 size={15} />
                    Remove
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </AppLayout>
  );
}
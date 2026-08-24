import React from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { useSelector, useDispatch } from 'react-redux';
import { approveContentItem, flagContentItem, deleteContentItem } from '../../features/content/contentSlice';
import { Check, Flag, Trash2 } from 'lucide-react';

export default function ContentModerationPage() {
  const { items } = useSelector((state) => state.content);
  const dispatch = useDispatch();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Content Moderation</h1>
          <p className="text-xs text-zinc-400">Approve or remove posted content that violates community guidelines.</p>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">{item.title}</p>
                <p className="text-xs text-zinc-400 font-mono mt-1">Author: {item.author.name} • Category: {item.category}</p>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => dispatch(approveContentItem(item.id))}
                  className="p-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-600/30"
                  title="Approve Public Post"
                >
                  <Check size={16} />
                </button>
                <button 
                  onClick={() => dispatch(flagContentItem(item.id))}
                  className="p-2 bg-amber-600/20 text-amber-400 border border-amber-500/30 rounded-lg hover:bg-amber-600/30"
                  title="Flag Violation"
                >
                  <Flag size={16} />
                </button>
                <button 
                  onClick={() => dispatch(deleteContentItem(item.id))}
                  className="p-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30"
                  title="Delete Content"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
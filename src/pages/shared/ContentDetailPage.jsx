import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppLayout from '../../components/layout/AppLayout';
import MediaViewer from '../../components/content/MediaViewer';
import CommentThread from '../../components/content/CommentThread';
import { ArrowLeft, ThumbsUp, Bookmark } from 'lucide-react';

export default function ContentDetailPage() {
  const { id } = useParams();
  const { items } = useSelector((state) => state.content);
  const item = items.find(i => i.id === id) || items[0];

  return (
    <AppLayout>
      <div className="space-y-6">
        <Link to="/feed" className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white">
          <ArrowLeft size={16} /> Back to Feed
        </Link>

        {/* Header Metadata */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 mb-2">
            <span>{item.category}</span>
            <span>•</span>
            <span className="text-zinc-400">{item.date}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4">{item.title}</h1>

          <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <img src={item.author.avatar} alt={item.author.name} className="w-10 h-10 rounded-full object-cover ring-1 ring-zinc-700" />
              <div>
                <p className="text-sm font-bold text-white">{item.author.name}</p>
                <p className="text-xs text-zinc-400">{item.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-zinc-400">
              <button className="flex items-center gap-1.5 hover:text-white text-xs bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg">
                <ThumbsUp size={14} /> {item.likes}
              </button>
              <button className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg hover:text-white">
                <Bookmark size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Body / Media Player */}
        <MediaViewer item={item} />

        {/* Commenting System */}
        <CommentThread />
      </div>
    </AppLayout>
  );
}
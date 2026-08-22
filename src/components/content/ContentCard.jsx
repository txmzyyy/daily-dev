import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThumbsUp, MessageSquare, Bookmark, Share2 } from 'lucide-react';
import { toggleWishlist, toggleLike } from '../../features/content/contentSlice';

export default function ContentCard({ item }) {
  const dispatch = useDispatch();
  const { id, title, summary, author, type, category, readTime, likes, commentsCount, date, thumbnail, isWishlisted } = item;

  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden mb-5 transition hover:border-zinc-700 shadow-lg">
      
      {/* Thumbnail with overlay tags */}
      {thumbnail && (
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-zinc-900 group">
          <img src={thumbnail} alt={title} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
          
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="bg-zinc-950/90 backdrop-blur-md text-emerald-400 text-[11px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border border-zinc-800">
              {type}
            </span>
          </div>

          {readTime && (
            <span className="absolute bottom-3 right-3 bg-zinc-950/80 backdrop-blur-md text-zinc-300 font-mono text-xs px-2.5 py-1 rounded-md border border-zinc-800">
              {readTime}
            </span>
          )}
        </div>
      )}

      {/* Body content */}
      <div className="p-5">
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
          <span className="text-emerald-400 font-bold uppercase tracking-wider font-mono">{category}</span>
          <span>{date}</span>
        </div>

        <Link to={`/content/${id}`}>
          <h3 className="text-lg font-bold text-white mb-2 leading-snug hover:text-indigo-400 transition">
            {title}
          </h3>
        </Link>

        <p className="text-sm text-zinc-400 mb-4 line-clamp-2 leading-relaxed">
          {summary}
        </p>

        {/* Footer actions matching wireframe */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 text-xs text-zinc-400">
          
          <div className="flex items-center gap-2.5">
            <img src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full object-cover ring-1 ring-zinc-700" />
            <span className="font-medium text-zinc-300">{author.name}</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => dispatch(toggleLike(id))}
              className="flex items-center gap-1.5 hover:text-white transition"
            >
              <ThumbsUp size={15} /> <span>{likes}</span>
            </button>

            <Link to={`/content/${id}`} className="flex items-center gap-1.5 hover:text-white transition">
              <MessageSquare size={15} /> <span>{commentsCount}</span>
            </Link>

            <button 
              onClick={() => dispatch(toggleWishlist(id))}
              className={`transition ${isWishlisted ? 'text-indigo-400 fill-indigo-400' : 'hover:text-white'}`}
            >
              <Bookmark size={15} className={isWishlisted ? 'fill-indigo-400' : ''} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
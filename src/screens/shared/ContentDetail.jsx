import React, { useState } from 'react';
import { ArrowLeft, Bookmark, Heart, ExternalLink, Share2, MessageSquare, Send } from 'lucide-react';

export default function ContentDetail({ onNavigate, contentId }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(312);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    { id: '1', author: 'dev_alex', text: 'Great breakdown of state synchronization across client and server boundaries!', time: '2h ago' },
    { id: '2', author: 'code_craft', text: 'Would love to see a follow-up post on streaming Suspense boundaries.', time: '4h ago' }
  ]);

  const article = {
    title: 'React Server Components Are Changing How We Think About State',
    author: 'Sarah Chen',
    authorRole: 'Senior Frontend Architect',
    date: 'Aug 18, 2026',
    readTime: '9 min read',
    category: 'Frontend',
    type: 'ARTICLE',
    url: 'https://dev.to',
    content: `React Server Components (RSC) represent a fundamental shift in how we architect web applications. By allowing components to execute exclusively on the server, we eliminate client bundle overhead while retaining component-driven UI paradigms.

Key concepts covered in this architecture shift:
• Zero-bundle-size server components that render directly to HTML streams.
• Direct backend access without public API layer boilerplates.
• Seamless composition between server component trees and client-side interactivity.`
  };

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([
      ...comments,
      { id: String(Date.now()), author: 'you', text: commentText.trim(), time: 'Just now' }
    ]);
    setCommentText('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-4 sm:p-6 md:p-8 max-w-4xl mx-auto pb-24">
      {/* Navigation Top Bar */}
      <button
        onClick={() => onNavigate?.('home')}
        className="flex items-center gap-2 text-xs font-['JetBrains_Mono'] text-zinc-400 hover:text-white mb-6 p-2 border border-zinc-800 bg-zinc-950/60 w-fit transition-colors"
      >
        <ArrowLeft size={16} />
        <span>BACK TO FEED</span>
      </button>

      {/* Main Header */}
      <header className="border-b border-zinc-800 pb-6 mb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-['JetBrains_Mono'] uppercase font-bold px-2 py-0.5 bg-[#7c3aed]/20 text-[#84cc16] border border-[#7c3aed]/40">
            {article.category}
          </span>
          <span className="text-[10px] font-['JetBrains_Mono'] uppercase font-bold px-2 py-0.5 bg-zinc-900 text-zinc-400 border border-zinc-800">
            {article.type}
          </span>
          <span className="text-xs font-['JetBrains_Mono'] text-zinc-500 ml-auto">
            {article.readTime}
          </span>
        </div>

        <h1 className="font-['Outfit'] text-2xl sm:text-4xl font-extrabold text-zinc-100 leading-tight">
          {article.title}
        </h1>

        {/* Author Metadata & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <div className="text-sm font-bold text-zinc-200">{article.author}</div>
            <div className="text-xs font-['JetBrains_Mono'] text-zinc-500">
              {article.authorRole} • {article.date}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLike}
              className={`p-2.5 border text-xs font-['JetBrains_Mono'] flex items-center gap-1.5 transition-colors ${
                liked
                  ? 'bg-red-500/10 border-red-500/40 text-red-400'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <Heart size={16} className={liked ? 'fill-current' : ''} />
              <span>{likesCount}</span>
            </button>

            <button
              onClick={() => setSaved(!saved)}
              className={`p-2.5 border text-xs font-['JetBrains_Mono'] transition-colors ${
                saved
                  ? 'bg-[#84cc16]/10 border-[#84cc16]/40 text-[#84cc16]'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
              title="Save to Wishlist"
            >
              <Bookmark size={16} className={saved ? 'fill-current' : ''} />
            </button>

            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title="Open Original Source"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <article className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-base leading-relaxed border-b border-zinc-800 pb-12 mb-8">
        {article.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </article>

      {/* Comments Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-lg font-['Outfit'] font-bold">
          <MessageSquare size={18} className="text-[#84cc16]" />
          <h2>Discussion ({comments.length})</h2>
        </div>

        {/* New Comment Input */}
        <form onSubmit={handleAddComment} className="flex gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add to the discussion..."
            className="flex-1 bg-zinc-900 border border-zinc-800 p-3 text-sm focus:border-[#7c3aed] focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-3 bg-[#84cc16] text-black font-['JetBrains_Mono'] font-bold text-xs uppercase hover:bg-lime-400 transition-colors flex items-center gap-1.5"
          >
            <Send size={14} />
            <span className="hidden sm:inline">Post</span>
          </button>
        </form>

        {/* Comment List */}
        <div className="space-y-3 pt-2">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-zinc-950 border border-zinc-800 p-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-['JetBrains_Mono'] font-bold text-[#84cc16]">
                  @{comment.author}
                </span>
                <span className="text-[11px] font-['JetBrains_Mono'] text-zinc-500">
                  {comment.time}
                </span>
              </div>
              <p className="text-sm text-zinc-300">{comment.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
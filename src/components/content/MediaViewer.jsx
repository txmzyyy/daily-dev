import React from 'react';

export default function MediaViewer({ item }) {
  if (item.type === 'VIDEO') {
    return (
      <div className="aspect-video w-full bg-black rounded-xl overflow-hidden border border-zinc-800 mb-6 flex items-center justify-center text-zinc-500">
        <div className="text-center p-6">
          <p className="text-sm font-semibold text-zinc-300 mb-1">Video Stream Embedded Player</p>
          <p className="text-xs font-mono">{item.content}</p>
        </div>
      </div>
    );
  }

  if (item.type === 'PODCAST') {
    return (
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl mb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white">
          ▶
        </div>
        <div className="flex-1">
          <p className="text-xs font-mono text-emerald-400 uppercase">Audio Episode</p>
          <p className="text-sm font-bold text-white">{item.title}</p>
        </div>
      </div>
    );
  }

  // Article content is stored as Tiptap-generated HTML. Fall back to a plain
  // paragraph for older mock items that were seeded with raw text.
  const looksLikeHtml = /<[a-z][\s\S]*>/i.test(item.content || '');

  return (
    <div
      className="prose prose-invert prose-sm sm:prose-base max-w-none mb-6
        prose-headings:text-white prose-headings:font-bold
        prose-p:text-zinc-300 prose-p:leading-relaxed
        prose-strong:text-white prose-a:text-indigo-400 hover:prose-a:text-indigo-300
        prose-blockquote:border-indigo-500 prose-blockquote:text-zinc-400
        prose-code:text-emerald-400 prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-li:text-zinc-300"
    >
      {looksLikeHtml ? (
        <div dangerouslySetInnerHTML={{ __html: item.content }} />
      ) : (
        <p className="text-zinc-300 text-sm leading-relaxed">{item.content}</p>
      )}
    </div>
  );
}
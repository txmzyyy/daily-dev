
import React from 'react';

export default function MediaViewer({ item }) {
  if (!item) {
    return null;
  }

  const type = item.type;
  const content = item.body_or_url;

  /*ARTICLE*/

 if (type === 'article') {
  const isUrl = content && /^https?:\/\//i.test(content.trim());

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sm:p-8">

      {!content && (
        <p className="text-zinc-500">
          No article content available.
        </p>
      )}

      {content && isUrl && (
        <a
          href={content}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 bg-zinc-950 border border-zinc-800 rounded-lg hover:border-indigo-500/50 transition group"
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white group-hover:text-indigo-400 transition mb-1">
              Read the full article
            </p>
            <p className="text-xs text-zinc-500 truncate">
              {content}
            </p>
          </div>
          <span className="text-indigo-400 text-sm shrink-0">
            ↗
          </span>
        </a>
      )}

      {content && !isUrl && (
        <article
          className="
            prose prose-invert prose-zinc max-w-none
            prose-p:text-zinc-300 prose-p:leading-8 prose-p:text-[15px]
            prose-headings:text-white prose-headings:font-bold
            prose-strong:text-white
            prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-indigo-500 prose-blockquote:text-zinc-400
            prose-code:text-emerald-400 prose-code:bg-zinc-950 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-li:text-zinc-300
          "
        >
          {content.split('\n').map((paragraph, i) =>
            paragraph.trim() ? (
              <p key={i}>{paragraph}</p>
            ) : null
          )}
        </article>
      )}

    </div>
  );
}

  /* VIDEO */

  if (type === 'video') {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden pt-4">

        {content ? (
          <video
            src={content}
            controls
            className="w-full max-w-xs mx-auto max-h-[220px] object-contain block"
          />
        ) : (
          <p className="p-6 text-zinc-500">
            No video available.
          </p>
        )}

      </div>
    );
  }


  /*AUDIO*/

  if (type === 'audio') {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        {content ? (
          <audio src={content} controls className="w-full" />
        ) : (
          <p className="text-zinc-500">No audio available.</p>
        )}
      </div>
    );
  }

  /*IMAGE*/

  if (type === 'image') {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">

        {content ? (
          <img
            src={content}
            alt={item.title || 'Content'}
            className="w-full object-contain"
          />
        ) : (
          <p className="p-6 text-zinc-500">
            No image available.
          </p>
        )}

      </div>
    );
  }


  /*DEFAULT*/

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">

      <p className="text-sm text-zinc-400">
        {content || 'No content available.'}
      </p>

    </div>
  );
}


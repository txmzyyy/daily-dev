
import React from 'react';

export default function MediaViewer({ item }) {
  if (!item) {
    return null;
  }

  const type = item.type;
  const content = item.body_or_url;

  /*ARTICLE*/

  if (type === 'article') {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">

        <h2 className="text-lg font-bold text-white mb-4">
          Article
        </h2>

        <div className="text-sm text-zinc-300 leading-7">

          {content ? (
            <a
              href={content}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 underline break-all"
            >
              {content}
            </a>
          ) : (
            <p className="text-zinc-500">
              No article content available.
            </p>
          )}

        </div>

      </div>
    );
  }


  /* VIDEO */

  if (type === 'video') {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">

        {content ? (
          <video
            src={content}
            controls
            className="w-full"
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


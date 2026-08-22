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

  return (
    <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed mb-6 space-y-4">
      <p>
        React Server Components (RSC) introduce a new mental model for building React applications. By allowing components to execute exclusively on the server, RSC reduces the bundle size sent to the browser and simplifies data fetching patterns.
      </p>
      <p>
        In traditional SSR, HTML is generated on the server, but all component JavaScript is still sent to the client to hydrate the interactive elements. RSC changes this by keeping pure logic components strictly on the server.
      </p>
    </div>
  );
}
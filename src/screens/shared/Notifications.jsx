import React from 'react';

export default function Notifications() {
  const notifications = [
    { id: 1, type: 'approval', title: 'Article Approved', detail: '"React Server Components Deep Dive" was published.', time: '2m ago', read: false },
    { id: 2, type: 'reply', title: 'New Reply', detail: 'alex_dev replied to your comment on Rust Async patterns.', time: '1h ago', read: false },
    { id: 3, type: 'category', title: 'Trending in Frontend', detail: '5 new articles added to Frontend today.', time: '4h ago', read: true }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-4 sm:p-6 max-w-4xl mx-auto pb-24">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
        <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-bold">Notifications</h1>
        <button className="text-xs text-[#84cc16] font-['JetBrains_Mono'] hover:underline">
          MARK ALL READ
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 border transition-all flex items-start justify-between gap-4 ${
              n.read ? 'bg-zinc-950 border-zinc-800 opacity-60' : 'bg-zinc-900 border-[#7c3aed]/40'
            }`}
          >
            <div className="space-y-1">
              <span className="text-[10px] font-['JetBrains_Mono'] uppercase px-2 py-0.5 bg-zinc-800 text-zinc-300">
                {n.type}
              </span>
              <h4 className="font-semibold text-sm sm:text-base text-zinc-100">{n.title}</h4>
              <p className="text-xs sm:text-sm text-zinc-400">{n.detail}</p>
            </div>
            <span className="text-[11px] font-['JetBrains_Mono'] text-zinc-500 whitespace-nowrap">
              {n.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
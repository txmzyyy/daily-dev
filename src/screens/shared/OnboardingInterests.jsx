import React, { useState } from 'react';

export default function OnboardingInterest({ onNavigate }) {
  const categories = [
    { id: 'frontend', label: 'Frontend', count: '2.8k posts' },
    { id: 'backend', label: 'Backend', count: '1.9k posts' },
    { id: 'devops', label: 'DevOps', count: '1.5k posts' },
    { id: 'mobile', label: 'Mobile', count: '1.0k posts' },
    { id: 'data', label: 'Data / ML', count: '1.3k posts' },
    { id: 'security', label: 'Security', count: '0.8k posts' }
  ];

  const [selected, setSelected] = useState(['frontend']);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col justify-between p-4 sm:p-8 max-w-3xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-[#7c3aed] w-1/2"></div>
          </div>
          <p className="text-xs font-['JetBrains_Mono'] text-[#84cc16] uppercase">Step 1 of 2</p>
          <h1 className="font-['Outfit'] text-2xl sm:text-4xl font-extrabold">What are you into?</h1>
          <p className="text-zinc-400 text-sm">Pick topics you care about. We'll tune your feed to match.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {categories.map((c) => {
            const isSel = selected.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                className={`p-4 text-left border transition-all ${
                  isSel
                    ? 'bg-[#7c3aed]/10 border-[#7c3aed] text-white'
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="font-bold text-sm sm:text-base">{c.label}</div>
                <div className="text-[11px] font-['JetBrains_Mono'] text-zinc-500 mt-1">{c.count}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-8">
        <button
          onClick={() => onNavigate?.('onboarding-profile')}
          className="w-full sm:w-auto sm:float-right bg-[#7c3aed] text-white font-['JetBrains_Mono'] font-bold px-8 py-3 uppercase text-sm hover:bg-violet-600 transition-colors"
        >
          Continue &rarr;
        </button>
      </div>
    </div>
  );
}
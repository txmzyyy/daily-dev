import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UploadCloud } from 'lucide-react';
import { toggleSubscribeCategory } from '../../features/auth/authSlice';

const TOPICS = [
  { name: 'Frontend', posts: '2.8k' },
  { name: 'Backend', posts: '1.9k' },
  { name: 'DevOps', posts: '1.5k' },
  { name: 'Mobile', posts: '1.0k' },
  { name: 'Data / ML', posts: '1.3k' },
  { name: 'Security', posts: '0.8k' },
  { name: 'Fullstack', posts: '1.1k' },
  { name: 'Architecture', posts: '0.8k' },
  { name: 'Open Source', posts: '2.1k' },
  { name: 'Career', posts: '0.7k' },
];

export default function OnboardingInterests() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(['Frontend', 'Fullstack']);
  const [bio, setBio] = useState('');

  const toggleTopic = (topic) => {
    setSelected((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleFinish = () => {
    selected.forEach((topic) => dispatch(toggleSubscribeCategory(topic)));
    navigate('/feed');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Progress bar */}
        <div className="flex gap-2 mb-6">
          <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-indigo-500' : 'bg-zinc-800'}`} />
          <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-indigo-500' : 'bg-zinc-800'}`} />
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <p className="text-xs font-mono font-bold text-lime-400 uppercase tracking-wider mb-2">
                Step 1 of 2
              </p>
              <h1 className="text-2xl font-bold tracking-tight">What are you into?</h1>
              <p className="text-xs text-zinc-400 mt-1">Pick topics you care about. We'll tune your feed to match.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {TOPICS.map((topic) => {
                const isSelected = selected.includes(topic.name);
                return (
                  <button
                    key={topic.name}
                    type="button"
                    onClick={() => toggleTopic(topic.name)}
                    className={`text-left p-4 rounded-xl border transition ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-600/10'
                        : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <p className={`text-sm font-bold mb-1 ${isSelected ? 'text-indigo-300' : 'text-white'}`}>
                      {topic.name}
                    </p>
                    <p className="text-[11px] font-mono text-zinc-500">{topic.posts} posts</p>
                  </button>
                );
              })}
            </div>

            <p className="text-center text-xs font-mono text-zinc-500">
              {selected.length} topic{selected.length === 1 ? '' : 's'} selected
            </p>

            <button
              onClick={() => setStep(2)}
              disabled={selected.length === 0}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white font-semibold py-3.5 rounded-xl text-sm transition shadow-lg shadow-indigo-600/25"
            >
              Continue &rarr;
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <p className="text-xs font-mono font-bold text-lime-400 uppercase tracking-wider mb-2">
                Step 2 of 2
              </p>
              <h1 className="text-2xl font-bold tracking-tight">Set up your profile.</h1>
              <p className="text-xs text-zinc-400 mt-1">
                Let the community know who you are. You can always edit this later.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                className="w-16 h-16 rounded-full border-2 border-dashed border-indigo-500/60 flex items-center justify-center text-indigo-400 hover:border-indigo-400 hover:text-indigo-300 transition shrink-0"
              >
                <UploadCloud size={22} />
              </button>
              <div>
                <p className="text-sm font-bold text-white">Upload avatar</p>
                <p className="text-[11px] text-zinc-500">JPG, PNG or GIF &middot; Max 2MB</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Bio</label>
                <span className="text-[10px] font-mono text-zinc-500">{bio.length}/160</span>
              </div>
              <textarea
                rows={3}
                maxLength={160}
                placeholder="Senior engineer. Loves distributed systems and coffee."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 block">
                Expertise Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {selected.map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-zinc-900 border border-zinc-700 text-zinc-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 rounded-xl text-sm transition shadow-lg shadow-indigo-600/25"
            >
              Go to my feed &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
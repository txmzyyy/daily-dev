import React, {
  useState,
  useEffect,
} from 'react';

import { useNavigate } from 'react-router-dom';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { UploadCloud } from 'lucide-react';

import {
  updateProfile,
} from '../../features/auth/authSlice';

import {
  fetchCategories,
} from '../../features/categories/categorySlice';

import {
  subscribeToCategory,
} from '../../features/categories/subscriptionsApi';


export default function OnboardingInterests() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector(
    (state) => state.auth.token
  );

  const categories = useSelector(
    (state) => state.categories.categories
  );

  const [step, setStep] = useState(1);
  const [selected, setSelected] =
    useState([]);

  const [bio, setBio] =
    useState('');

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState(null);


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  const toggleTopic = (topicName) => {
    setSelected((prev) =>
      prev.includes(topicName)
        ? prev.filter(
            (topic) =>
              topic !== topicName
          )
        : [...prev, topicName]
    );
  };


  const handleFinish = async () => {
    if (!token) {
      setError(
        'You need to be logged in.'
      );
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const matched =
        categories.filter(
          (category) =>
            selected.includes(
              category.name
            )
        );

      await Promise.all(
        matched.map((category) =>
          subscribeToCategory(
            category.id,
            token
          )
        )
      );

      await dispatch(
        updateProfile({ bio })
      ).unwrap();

      navigate('/feed');

    } catch (err) {
      console.error(
        'Onboarding failed:',
        err
      );

      setError(
        err.message ||
          'Something went wrong finishing setup.'
      );

    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center px-4 py-10">

      <div className="w-full max-w-md">

        {/* Progress */}

        <div className="flex gap-2 mb-6">

          <div
            className={`h-1 flex-1 rounded-full ${
              step >= 1
                ? 'bg-indigo-500'
                : 'bg-zinc-800'
            }`}
          />

          <div
            className={`h-1 flex-1 rounded-full ${
              step >= 2
                ? 'bg-indigo-500'
                : 'bg-zinc-800'
            }`}
          />

        </div>


        {/* STEP 1 */}

        {step === 1 && (
          <div className="space-y-6">

            <div>

              <p className="text-xs font-mono font-bold text-lime-400 uppercase tracking-wider mb-2">
                Step 1 of 2
              </p>

              <h1 className="text-2xl font-bold tracking-tight">
                What are you into?
              </h1>

              <p className="text-xs text-zinc-400 mt-1">
                Pick topics you care about. We'll tune your feed to match.
              </p>

            </div>


            {categories.length === 0 && (
              <p className="text-xs text-zinc-500 text-center">
                Loading topics...
              </p>
            )}


            <div className="grid grid-cols-2 gap-3">

              {categories.map(
                (topic) => {
                  const isSelected =
                    selected.includes(
                      topic.name
                    );

                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() =>
                        toggleTopic(
                          topic.name
                        )
                      }
                      className={`text-left p-4 rounded-xl border transition ${
                        isSelected
                          ? 'bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-600/10'
                          : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >

                      <p
                        className={`text-sm font-bold mb-1 ${
                          isSelected
                            ? 'text-indigo-300'
                            : 'text-white'
                        }`}
                      >
                        {topic.name}
                      </p>

                      <p className="text-[11px] font-mono text-zinc-500">
                        {topic.content_count ||
                          0}{' '}
                        posts
                      </p>

                    </button>
                  );
                }
              )}

            </div>


            <p className="text-center text-xs font-mono text-zinc-500">
              {selected.length} topic
              {selected.length === 1
                ? ''
                : 's'} selected
            </p>


            <button
              onClick={() =>
                setStep(2)
              }
              disabled={
                selected.length === 0
              }
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white font-semibold py-3.5 rounded-xl text-sm transition shadow-lg shadow-indigo-600/25"
            >
              Continue →
            </button>

          </div>
        )}


        {/* STEP 2 */}

        {step === 2 && (
          <div className="space-y-6">

            <div>

              <p className="text-xs font-mono font-bold text-lime-400 uppercase tracking-wider mb-2">
                Step 2 of 2
              </p>

              <h1 className="text-2xl font-bold tracking-tight">
                Set up your profile.
              </h1>

              <p className="text-xs text-zinc-400 mt-1">
                Let the community know who you are. You can always edit this later.
              </p>

            </div>


            {/* Avatar */}

            <div className="flex items-center gap-4">

              <button
                type="button"
                className="w-16 h-16 rounded-full border-2 border-dashed border-indigo-500/60 flex items-center justify-center text-indigo-400 hover:border-indigo-400 hover:text-indigo-300 transition shrink-0"
              >
                <UploadCloud size={22} />
              </button>

              <div>

                <p className="text-sm font-bold text-white">
                  Upload avatar
                </p>

                <p className="text-[11px] text-zinc-500">
                  JPG, PNG or GIF · Max 2MB
                </p>

              </div>

            </div>


            {/* Bio */}

            <div>

              <div className="flex items-center justify-between mb-1.5">

                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Bio
                </label>

                <span className="text-[10px] font-mono text-zinc-500">
                  {bio.length}/160
                </span>

              </div>

              <textarea
                rows={3}
                maxLength={160}
                placeholder="Senior engineer. Loves distributed systems and coffee."
                value={bio}
                onChange={(e) =>
                  setBio(e.target.value)
                }
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition resize-none"
              />

            </div>


            {/* Tags */}

            <div>

              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 block">
                Expertise Tags
              </label>

              <div className="flex flex-wrap gap-2">

                {selected.map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-zinc-900 border border-zinc-700 text-zinc-200"
                    >
                      {tag}
                    </span>
                  )
                )}

              </div>

            </div>


            {error && (
              <p className="text-xs text-red-400 text-center">
                {error}
              </p>
            )}


            <button
              onClick={handleFinish}
              disabled={submitting}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-semibold py-3.5 rounded-xl text-sm transition shadow-lg shadow-indigo-600/25"
            >
              {submitting
                ? 'Saving...'
                : 'Go to my feed →'}
            </button>

          </div>
        )}

      </div>

    </div>
  );
}
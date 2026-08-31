import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/layout/AppLayout';
import { submitContent } from '../../features/content/contentSlice';
import { fetchCategories } from '../../features/categories/categorySlice';
import { Upload, FileAudio, FileVideo } from 'lucide-react';

export default function CreateContentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.categories);
  const { status, error } = useSelector((state) => state.content);

  const [formData, setFormData] = useState({
    title: '',
    type: 'article',
    category_id: '',
    body_or_url: '',
    media_file: null,
  });

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  useEffect(() => {
    if (categories.length > 0 && !formData.category_id) {
      setFormData((prev) => ({ ...prev, category_id: categories[0].id }));
    }
  }, [categories, formData.category_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, media_file: file }));
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setFormData((prev) => ({
      ...prev,
      type,
      media_file: null,
      body_or_url: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(submitContent(formData)).unwrap();
      navigate('/writer/dashboard');
    } catch (err) {
      console.error('Failed to submit content:', err);
    }
  };

  const isMedia = formData.type === 'video' || formData.type === 'audio';

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Create Content Post</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Share articles, videos, and audio with the Moringa community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">Content Title</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Building Async Microservices with Flask"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">Type</label>
              <select
                name="type"
                required
                value={formData.type}
                onChange={handleTypeChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="article">Article</option>
                <option value="video">Video</option>
                <option value="audio">Audio / Podcast</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">Category</label>
              <select
                name="category_id"
                required
                value={formData.category_id}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>

          {isMedia ? (
            <div className="space-y-3">
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Upload {formData.type === 'video' ? 'Video' : 'Audio'}
              </label>

              <label className="flex flex-col items-center justify-center gap-2 min-h-40 border border-dashed border-zinc-700 rounded-xl bg-zinc-950 hover:border-indigo-500 cursor-pointer transition px-5 text-center">
                {formData.type === 'video' ? <FileVideo size={28} className="text-indigo-400" /> : <FileAudio size={28} className="text-indigo-400" />}
                <span className="text-sm text-zinc-200">
                  {formData.media_file?.name || `Choose ${formData.type} file`}
                </span>
                <span className="text-xs text-zinc-500">or paste a hosted media URL below</span>
                <Upload size={16} className="text-zinc-500" />
                <input
                  type="file"
                  accept={formData.type === 'video' ? 'video/*' : 'audio/*'}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <input
                type="url"
                name="body_or_url"
                placeholder={`Optional ${formData.type} URL`}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                value={formData.body_or_url}
                onChange={handleChange}
                required={!formData.media_file}
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">Article Content</label>
              <textarea
                name="body_or_url"
                rows={10}
                required
                placeholder="Write your article here..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                value={formData.body_or_url}
                onChange={handleChange}
              />
            </div>
          )}

          {error && <p className="text-xs text-red-400">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/writer/dashboard')}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-xl text-xs font-semibold"
            >Cancel</button>
            <button
              type="submit"
              disabled={status === 'loading' || categories.length === 0 || !formData.category_id}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2 rounded-xl text-xs font-semibold"
            >{status === 'loading' ? 'Submitting...' : 'Submit Post'}</button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

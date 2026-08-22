import React, { useState } from 'react';
import { MessageSquare, ThumbsUp } from 'lucide-react';

export default function CommentThread({ comments = [] }) {
  const [newComment, setNewComment] = useState('');

  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-lg font-bold text-white">Discussion</h3>

      {/* Input box */}
      <div className="flex gap-3">
        <textarea
          rows={3}
          placeholder="Share your technical context or thoughts..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-semibold">
          Post Comment
        </button>
      </div>

      {/* Mocked Nested Comments (Reddit style) */}
      <div className="space-y-4 pt-4 border-t border-zinc-800">
        <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/60">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-zinc-200">moringa_student_254</span>
            <span className="text-[10px] text-zinc-500">2h ago</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            The section about RSC hydration boundaries cleared up so much confusion. Great explanation on streaming server components!
          </p>

          <div className="flex items-center gap-4 mt-3 text-xs text-zinc-400">
            <button className="flex items-center gap-1 hover:text-white"><ThumbsUp size={12} /> 12</button>
            <button className="flex items-center gap-1 hover:text-white"><MessageSquare size={12} /> Reply</button>
          </div>

          {/* Nested Sub-comment */}
          <div className="ml-6 mt-3 pl-3 border-l-2 border-zinc-700/50 space-y-3">
            <div className="bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-indigo-400">Priya Nair (Author)</span>
                <span className="text-[10px] text-zinc-500">1h ago</span>
              </div>
              <p className="text-xs text-zinc-300">
                Glad it helped! Feel free to check the demo repo linked in the post notes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
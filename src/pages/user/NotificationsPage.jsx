import React from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { useSelector, useDispatch } from 'react-redux';
import { markAllAsRead } from '../../features/notifications/notificationSlice';
import { Bell, CheckCircle } from 'lucide-react';

export default function NotificationsPage() {
  const { notifications } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Notifications</h1>
            <p className="text-xs text-zinc-400">Updates from your subscribed tech categories.</p>
          </div>
          <button 
            onClick={() => dispatch(markAllAsRead())}
            className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
          >
            <CheckCircle size={14} /> Mark all read
          </button>
        </div>

        <div className="space-y-3">
          {notifications.map((n) => (
            <div key={n.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-start gap-3">
              <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg">
                <Bell size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">{n.title}</p>
                <p className="text-xs text-zinc-400 mt-1">{n.message}</p>
                <span className="text-[10px] font-mono text-zinc-500 mt-2 block">{n.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
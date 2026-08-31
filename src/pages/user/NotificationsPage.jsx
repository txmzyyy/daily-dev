import React, { useEffect } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadNotifications,
  markAsRead,
  markAllAsRead,
} from '../../features/notifications/notificationSlice';
import { Bell, CheckCircle } from 'lucide-react';

export default function NotificationsPage() {
  const dispatch = useDispatch();
  const { notifications, unreadCount, status, error } = useSelector((state) => state.notifications);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) dispatch(loadNotifications());
  }, [dispatch, token]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Notifications</h1>
            <p className="text-xs text-zinc-400">Your latest platform updates.</p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={() => dispatch(markAllAsRead())}
              className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
            >
              <CheckCircle size={14} /> Mark all read
            </button>
          )}
        </div>

        {error && <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-4 text-sm text-red-400">{error}</div>}
        {status === 'loading' && <div className="text-center py-12 text-zinc-500">Loading notifications...</div>}

        {status !== 'loading' && notifications.length === 0 && !error && (
          <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl text-sm text-zinc-500">
            No notifications yet.
          </div>
        )}

        <div className="space-y-3">
          {notifications.map((n) => (
            <button
              key={n.id}
              onClick={() => !n.is_read && dispatch(markAsRead(n.id))}
              className={`w-full text-left bg-zinc-900 border p-4 rounded-xl flex items-start gap-3 transition ${n.is_read ? 'border-zinc-800' : 'border-indigo-500/30 bg-indigo-950/10'}`}
            >
              <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg"><Bell size={16} /></div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">Notification</p>
                <p className="text-xs text-zinc-400 mt-1">{n.message}</p>
                <span className="text-[10px] font-mono text-zinc-500 mt-2 block">
                  {n.created_at ? new Date(n.created_at).toLocaleString() : ''}
                  {!n.is_read && <span className="ml-2 text-indigo-400">Unread</span>}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

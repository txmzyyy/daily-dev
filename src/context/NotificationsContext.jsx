import { createContext, useContext, useState, useMemo } from 'react'

const NotificationsContext = createContext(null)
export const useNotifications = () => useContext(NotificationsContext)

// Same mock set the Notifications screen was using per-role, now centralized
// so unread counts and the list itself live in exactly one place.
const MOCK_NOTIFICATIONS = {
  user: [
    { id: 1, type: 'content', text: 'New article in Frontend: "React Server Components..."', time: '2h ago', read: false },
    { id: 2, type: 'reply', text: 'jane_dev replied to your comment', time: '5h ago', read: false },
  ],
  writer: [
    { id: 1, type: 'approval', text: 'Your post "Understanding Suspense" was approved', time: '1h ago', read: false },
    { id: 2, type: 'flag', text: 'A comment on your post was flagged for review', time: '4h ago', read: true },
  ],
  admin: [
    { id: 1, type: 'flag', text: '3 new items in the moderation queue', time: '30m ago', read: false },
    { id: 2, type: 'content', text: 'New user signup: alex_writer', time: '2h ago', read: false },
  ],
}

export function NotificationsProvider({ role, children }) {
  // Keyed by role so switching demo-login roles doesn't bleed state together
  const [byRole, setByRole] = useState(MOCK_NOTIFICATIONS)

  const items = byRole[role] || []
  const unreadCount = useMemo(() => items.filter((n) => !n.read).length, [items])

  const markAllRead = () => {
    if (!role) return
    setByRole((prev) => ({
      ...prev,
      [role]: prev[role].map((n) => ({ ...n, read: true })),
    }))
  }

  const markRead = (id) => {
    if (!role) return
    setByRole((prev) => ({
      ...prev,
      [role]: prev[role].map((n) => (n.id === id ? { ...n, read: true } : n)),
    }))
  }

  return (
    <NotificationsContext.Provider value={{ items, unreadCount, hasUnread: unreadCount > 0, markAllRead, markRead }}>
      {children}
    </NotificationsContext.Provider>
  )
}
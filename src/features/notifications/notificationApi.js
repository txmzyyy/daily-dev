const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function authHeaders(token) {
  return { Authorization: `Bearer ${token}` };
}

export async function fetchNotifications(token) {
  const res = await fetch(`${BASE_URL}/api/notifications`, {
    headers: authHeaders(token),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || 'Failed to load notifications');
  return data.notifications || [];
}

export async function markNotificationRead(id, token) {
  const res = await fetch(`${BASE_URL}/api/notifications/${id}/read`, {
    method: 'PATCH',
    headers: authHeaders(token),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || 'Failed to mark notification as read');
  return data.notification;
}

export async function markAllNotificationsRead(token) {
  const res = await fetch(`${BASE_URL}/api/notifications/read-all`, {
    method: 'PATCH',
    headers: authHeaders(token),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || 'Failed to mark notifications as read');
  return data;
}

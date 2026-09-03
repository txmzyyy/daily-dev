const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function subscribeToCategory(categoryId, token) {
  const res = await fetch(`${BASE_URL}/api/subscriptions/${categoryId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to subscribe');
  }

  return res.json();
}

export async function unsubscribeFromCategory(categoryId, token) {
  const res = await fetch(`${BASE_URL}/api/subscriptions/${categoryId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to unsubscribe');
  }

  return res.json();
}

export async function fetchMySubscriptions(token) {
  const res = await fetch(`${BASE_URL}/api/subscriptions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to load subscriptions');
  }

  return res.json();
}
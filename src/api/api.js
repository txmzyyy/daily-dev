const API_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://moringa-school-daily-dev-backend-s3g1.onrender.com';

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error ||
        data.msg ||
        data.message ||
        'Something went wrong'
    );
  }

  return data;
}
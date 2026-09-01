const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function authHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
  };
}


export async function fetchPendingContent(token) {
  const res = await fetch(
    `${BASE_URL}/api/content/pending`,
    {
      headers: authHeaders(token),
    }
  );

  if (!res.ok) {
    throw new Error(
      'Failed to load pending content'
    );
  }

  return res.json();
}


export async function approveContent(
  id,
  token
) {
  const res = await fetch(
    `${BASE_URL}/api/content/${id}/approve`,
    {
      method: 'POST',
      headers: authHeaders(token),
    }
  );

  if (!res.ok) {
    throw new Error(
      'Failed to approve content'
    );
  }

  return res.json();
}


export async function deleteContent(
  id,
  token
) {
  const res = await fetch(
    `${BASE_URL}/api/content/${id}`,
    {
      method: 'DELETE',
      headers: authHeaders(token),
    }
  );

  if (!res.ok) {
    throw new Error(
      'Failed to delete content'
    );
  }

  return res.json();
}


export async function fetchReports(
  status = 'pending',
  token
) {
  const res = await fetch(
    `${BASE_URL}/api/reports?status=${status}`,
    {
      headers: authHeaders(token),
    }
  );

  if (!res.ok) {
    throw new Error(
      'Failed to load reports'
    );
  }

  return res.json();
}


export async function fileReport(
  contentId,
  reason,
  token
) {
  const res = await fetch(
    `${BASE_URL}/api/reports`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(token),
      },
      body: JSON.stringify({
        content_id: contentId,
        reason,
      }),
    }
  );

  if (!res.ok) {
    throw new Error(
      'Failed to file report'
    );
  }

  return res.json();
}


export async function dismissReport(
  id,
  token
) {
  const res = await fetch(
    `${BASE_URL}/api/reports/${id}/dismiss`,
    {
      method: 'POST',
      headers: authHeaders(token),
    }
  );

  if (!res.ok) {
    throw new Error(
      'Failed to dismiss report'
    );
  }

  return res.json();
}


export async function resolveReport(
  id,
  token
) {
  const res = await fetch(
    `${BASE_URL}/api/reports/${id}/resolve`,
    {
      method: 'POST',
      headers: authHeaders(token),
    }
  );

  if (!res.ok) {
    throw new Error(
      'Failed to resolve report'
    );
  }

  return res.json();
}
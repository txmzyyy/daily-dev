const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function authHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchFeed(categoryId) {
  const url = categoryId
    ? `${BASE_URL}/api/content?category_id=${categoryId}`
    : `${BASE_URL}/api/content`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to load feed');
  }

  return res.json();
}

export async function fetchRecommended(token) {
  const res = await fetch(`${BASE_URL}/api/content/recommended`, {
    headers: authHeaders(token),
  });

  if (!res.ok) {
    throw new Error('Failed to load recommendations');
  }

  return res.json();
}

export async function fetchContentById(id) {
  const res = await fetch(`${BASE_URL}/api/content/${id}`);

  if (!res.ok) {
    throw new Error('Content not found');
  }

  return res.json();
}

export async function createContent(data, token) {
  const hasFile = data?.media_file instanceof File;

  const options = {
    method: 'POST',
    headers: authHeaders(token),
  };

  if (hasFile) {
    const form = new FormData();
    form.append('title', data.title);
    form.append('type', data.type);
    form.append('category_id', data.category_id);
    if (data.body_or_url) form.append('body_or_url', data.body_or_url);
    form.append('media_file', data.media_file);
    options.body = form;
  } else {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  const res = await fetch(`${BASE_URL}/api/content`, options);

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));

    throw new Error(
      error.error ||
        error.message ||
        'Failed to create content'
    );
  }

  return res.json();
}

export async function updateContent(id, data, token) {
  const res = await fetch(`${BASE_URL}/api/content/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(token),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to update content');
  }

  return res.json();
}

export async function deleteContent(id, token) {
  const res = await fetch(`${BASE_URL}/api/content/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });

  if (!res.ok) {
    throw new Error('Failed to delete content');
  }

  return res.json();
}

export async function reactToContent(id, type, token) {
  const res = await fetch(
    `${BASE_URL}/api/reactions/content/${id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(token),
      },
      body: JSON.stringify({ type }),
    }
  );

  if (!res.ok) {
    throw new Error('Failed to react');
  }

  return res.json();
}

export async function removeReaction(id, token) {
  const res = await fetch(
    `${BASE_URL}/api/reactions/content/${id}`,
    {
      method: 'DELETE',
      headers: authHeaders(token),
    }
  );

  if (!res.ok) {
    throw new Error('Failed to remove reaction');
  }

  return res.json();
}

export async function addToWishlist(id, token) {
  const res = await fetch(`${BASE_URL}/api/wishlist/${id}`, {
    method: 'POST',
    headers: authHeaders(token),
  });

  if (!res.ok) {
    throw new Error('Failed to add to wishlist');
  }

  return res.json();
}

export async function removeFromWishlist(id, token) {
  const res = await fetch(`${BASE_URL}/api/wishlist/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });

  if (!res.ok) {
    throw new Error('Failed to remove from wishlist');
  }

  return res.json();
}

export async function fetchWishlist(token) {
  const res = await fetch(`${BASE_URL}/api/wishlist`, {
    headers: authHeaders(token),
  });

  if (!res.ok) {
    throw new Error('Failed to load wishlist');
  }

  return res.json();
}

export async function fetchComments(contentId) {
  const res = await fetch(
    `${BASE_URL}/api/comments/content/${contentId}`
  );

  if (!res.ok) {
    throw new Error('Failed to load comments');
  }

  return res.json();
}

export async function postComment(
  { content_id, text, parent_comment_id = null },
  token
) {
  const res = await fetch(`${BASE_URL}/api/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(token),
    },
    body: JSON.stringify({
      content_id,
      text,
      parent_comment_id,
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));

    throw new Error(
      error.error ||
        error.message ||
        'Failed to post comment'
    );
  }

  return res.json();
}

export async function deleteComment(id, token) {
  const res = await fetch(`${BASE_URL}/api/comments/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });

  if (!res.ok) {
    throw new Error('Failed to delete comment');
  }

  return res.json();
}
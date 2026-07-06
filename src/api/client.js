const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
const TOKEN_KEY = 'campusDelightsAdminToken';

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export async function apiFetch(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  const hasJsonBody =
    options.body &&
    typeof options.body === 'object' &&
    !(options.body instanceof FormData);

  if (hasJsonBody) {
    headers['Content-Type'] = 'application/json';
  }

  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
    body: hasJsonBody ? JSON.stringify(options.body) : options.body,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Request failed');
  }

  if (res.status === 204) return null;
  return res.json();
}

export { BASE_URL };

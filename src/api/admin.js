import { apiFetch, setAuthToken } from './client';

export async function loginAdmin(username, password) {
  const data = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: { username, password },
  });
  setAuthToken(data.token);
  return data;
}

export async function getAdminSession() {
  return apiFetch('/api/auth/me');
}

export function logoutAdmin() {
  setAuthToken(null);
}

export async function getSuggestions(status = 'pending') {
  const query = status === 'all' ? '' : `?status=${status}`;
  return apiFetch(`/api/suggestions${query}`);
}

export async function approveSuggestion(id, details = {}) {
  return apiFetch(`/api/suggestions/${id}/approve`, {
    method: 'PATCH',
    body: details,
  });
}

export async function rejectSuggestion(id, rejectionNote = '') {
  return apiFetch(`/api/suggestions/${id}/reject`, {
    method: 'PATCH',
    body: { rejectionNote },
  });
}

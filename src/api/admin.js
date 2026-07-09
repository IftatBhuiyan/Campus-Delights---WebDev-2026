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

export async function getAdminFoodSpots(show = 'all') {
  return apiFetch(`/api/admin/foodspots?show=${show}`);
}

export async function updateFoodSpot(id, payload) {
  return apiFetch(`/api/admin/foodspots/${id}`, {
    method: 'PATCH',
    body: payload,
  });
}

export async function setFoodSpotArchived(id, archived) {
  return apiFetch(`/api/admin/foodspots/${id}/archive`, {
    method: 'PATCH',
    body: { archived },
  });
}

export async function getAdminReports(status = 'open') {
  return apiFetch(`/api/admin/activity/reports?status=${status}`);
}

export async function getAdminMedia() {
  return apiFetch('/api/admin/activity/media');
}

export async function updateReportStatus(spotId, reportId, status) {
  return apiFetch(`/api/admin/activity/reports/${spotId}/${reportId}`, {
    method: 'PATCH',
    body: { status },
  });
}

export async function deleteSpotMedia(spotId, mediaId) {
  return apiFetch(`/api/admin/activity/media/${spotId}/${mediaId}`, {
    method: 'DELETE',
  });
}

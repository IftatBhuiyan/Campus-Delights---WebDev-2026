import { apiFetch } from './client';

export async function submitSuggestion(payload) {
  return apiFetch('/api/suggestions', {
    method: 'POST',
    body: payload,
  });
}

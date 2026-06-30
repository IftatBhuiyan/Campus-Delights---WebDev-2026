const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function getFoodSpots(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== undefined && value !== null) {
      query.append(key, value);
    }
  });

  const res = await fetch(`${BASE_URL}/api/foodspots?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to load food spots');
  return res.json();
}

export async function getFoodSpot(id) {
  const res = await fetch(`${BASE_URL}/api/foodspots/${id}`);
  if (!res.ok) throw new Error('Failed to load food spot');
  return res.json();
}

export async function addReview(id, review) {
  const res = await fetch(`${BASE_URL}/api/foodspots/${id}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });
  if (!res.ok) throw new Error('Failed to add review');
  return res.json();
}

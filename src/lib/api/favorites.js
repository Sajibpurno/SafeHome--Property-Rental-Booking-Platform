import { getToken } from './auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function addFavorite(payload) {
  const res = await fetch(`${BASE_URL}/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function getFavoritesByEmail(email) {
  const res = await fetch(`${BASE_URL}/favorites/${email}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    cache: 'no-store',
  });
  return res.json();
}

export async function removeFavorite(id) {
  const res = await fetch(`${BASE_URL}/favorites/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
}
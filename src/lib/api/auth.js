const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function generateToken(user) {
  const res = await fetch(`${BASE_URL}/jwt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem('safehome_token', data.token);
  }
  return data;
}

export function getToken() {
  return localStorage.getItem('safehome_token');
}

export function removeToken() {
  localStorage.removeItem('safehome_token');
}
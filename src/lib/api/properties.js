const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getAllProperties() {
  const res = await fetch(`${BASE_URL}/properties`, { cache: 'no-store' });
  return res.json();
}
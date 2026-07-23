const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getAllProperties() {
  const res = await fetch(`${BASE_URL}/properties`, { cache: 'no-store' });
  return res.json();
}

export async function getPropertyById(id) {
  const res = await fetch(`${BASE_URL}/properties/${id}`, { cache: 'no-store' });
  return res.json();
}

export async function getPropertiesByOwner(email) {
  const res = await fetch(`${BASE_URL}/properties/owner/${email}`, { cache: 'no-store' });
  return res.json();
}
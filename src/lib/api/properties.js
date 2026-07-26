import { getToken } from './auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getAllProperties(page = 1, limit = 6) {
  const res = await fetch(`${BASE_URL}/properties?page=${page}&limit=${limit}`, {
    cache: 'no-store'
  });
  return res.json();
}

export async function getPropertyById(id) {
  const res = await fetch(`${BASE_URL}/properties/${id}`, { cache: 'no-store' });
  return res.json();
}

export async function getPropertiesByOwner(email) {
  const res = await fetch(`${BASE_URL}/properties/owner/${email}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    cache: 'no-store',
  });
  return res.json();
}

export async function addProperty(payload) {
  const res = await fetch(`${BASE_URL}/properties`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function deleteProperty(id) {
  const res = await fetch(`${BASE_URL}/properties/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
}
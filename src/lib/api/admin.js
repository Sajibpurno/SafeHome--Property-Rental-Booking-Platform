import { getToken } from './auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getAllUsers() {
  const res = await fetch(`${BASE_URL}/users`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    cache: 'no-store',
  });
  return res.json();
}

export async function updateUserRole(id, role) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ role }),
  });
  return res.json();
}

export async function getAllPropertiesAdmin(page = 1, limit = 10) {
  const res = await fetch(`${BASE_URL}/admin/properties?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    cache: 'no-store',
  });
  return res.json();
}

export async function updatePropertyStatus(id, payload) {
  const res = await fetch(`${BASE_URL}/admin/properties/${id}`, {
    method: 'PATCH',
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

export async function getAllBookingsAdmin() {
  const res = await fetch(`${BASE_URL}/admin/bookings`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    cache: 'no-store',
  });
  return res.json();
}
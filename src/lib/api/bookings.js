const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function createBooking(payload) {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function getBookingsByEmail(email) {
  const res = await fetch(`${BASE_URL}/bookings/${email}`, { cache: 'no-store' });
  return res.json();
}

export async function getBookingsByOwner(email) {
  const res = await fetch(`${BASE_URL}/bookings/owner/${email}`, { cache: 'no-store' });
  return res.json();
}

export async function updateBookingStatus(id, status) {
  const res = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return res.json();
}
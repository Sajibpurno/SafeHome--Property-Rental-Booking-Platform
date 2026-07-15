"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Camera } from "lucide-react";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: session?.user?.name || "",
    phone: "",
    address: "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setEditing(false);
    }, 1000);
  };

  if (!session) return <p className="text-gray-400 text-sm">Loading...</p>;

  const user = session.user;
  const initials = user.name?.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl text-center font-bold text-gray-900 mb-6">My Profile</h2>

      <div className="max-w-2xl bg-white border border-gray-200 rounded-xl p-20 flex flex-col items-center justify-center shadow-2xl">

        {/* Avatar */}
        <div className="flex items-center gap-5 mb-8">
          <div className="relative">
            {user.image ? (
              <img src={user.image} alt={user.name} className="w-20 h-20 rounded-full object-cover" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                {initials}
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer">
              <Camera size={12} className="text-white" />
            </div>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <span className="text-xs bg-blue-100 text-blue-600 font-semibold px-2 py-0.5 rounded-full capitalize mt-1 inline-block">
              {user.role || "tenant"}
            </span>
          </div>
        </div>

        {/* Info */}
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Full Name</label>
              <input
                value={editing ? form.name : user.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                readOnly={!editing}
                className={`w-full border rounded-lg px-4 h-11 text-sm text-gray-700 outline-none transition
                  ${editing ? "border-gray-400 bg-white" : "border-gray-200 bg-gray-50"}`}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Email</label>
              <input
                value={user.email}
                readOnly
                className="w-full border border-gray-200 rounded-lg px-4 h-11 text-sm text-gray-500 bg-gray-50 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Phone</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                readOnly={!editing}
                placeholder="017XXXXXXXXX"
                className={`w-full border rounded-lg px-4 h-11 text-sm text-gray-700 outline-none transition
                  ${editing ? "border-gray-400 bg-white" : "border-gray-200 bg-gray-50"}`}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Address</label>
              <input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                readOnly={!editing}
                placeholder="Your address"
                className={`w-full border rounded-lg px-4 h-11 text-sm text-gray-700 outline-none transition
                  ${editing ? "border-gray-400 bg-white" : "border-gray-200 bg-gray-50"}`}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            {editing ? (
              <>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-6 py-2.5 border border-gray-200 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
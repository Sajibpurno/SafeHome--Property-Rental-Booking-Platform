"use client";

import { useEffect, useState } from "react";
import { getAllUsers, updateUserRole } from "@/lib/api/admin";

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleRoleChange = async (id, role) => {
    try {
      await updateUserRole(id, role);
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role } : u))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-muted-foreground text-sm">Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">All Users</h2>

      {users.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground text-sm">No users found.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">User</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Email</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Current Role</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Change Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-muted transition">
                  {/* User */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-foreground">{user.name}</span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-5 py-4 text-muted-foreground">{user.email}</td>

                  {/* Current Role */}
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize
                      ${user.role === "admin" ? "bg-purple-100 text-purple-700" :
                        user.role === "owner" ? "bg-blue-100 text-blue-700" :
                        "bg-surface-2 text-muted-foreground"}`}>
                      {user.role || "user"}
                    </span>
                  </td>

                  {/* Change Role */}
                  <td className="px-5 py-4">
                    <select
                      value={user.role || "user"}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="border border-border rounded-lg px-3 h-9 text-sm text-foreground outline-none bg-card focus:border-ring"
                    >
                      <option value="user">User</option>
                      <option value="owner">Owner</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsersPage;
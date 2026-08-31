import React, { useEffect, useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import {
  UserPlus,
  UserX,
  UserCheck,
} from 'lucide-react';

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:5000';

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showAddForm, setShowAddForm] =
    useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const token = localStorage.getItem('token');

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        `${BASE_URL}/api/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.error ||
          'Failed to load users'
        );
      }

      setUsers(
        Array.isArray(data)
          ? data
          : data.users || []
      );

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${BASE_URL}/api/users`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.error ||
          'Failed to create user'
        );
      }

      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: 'user',
      });

      setShowAddForm(false);

      loadUsers();

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const toggleUserStatus = async (user) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/users/${user.id}`,
        {
          method: 'PATCH',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            is_active: !user.is_active,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.error ||
          'Failed to update user'
        );
      }

      loadUsers();

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const changeRole = async (user, role) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/users/${user.id}`,
        {
          method: 'PATCH',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.error ||
          'Failed to update role'
        );
      }

      loadUsers();

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          <div>
            <h1 className="text-2xl font-bold text-white">
              User Management
            </h1>

            <p className="text-xs text-zinc-400 mt-1">
              Manage users, roles, and account status.
            </p>
          </div>

          <button
            onClick={() =>
              setShowAddForm(!showAddForm)
            }
            className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-3.5 py-2.5 rounded-xl font-semibold"
          >
            <UserPlus size={14} />

            Add User
          </button>

        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-4">
            <p className="text-sm text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Add user */}
        {showAddForm && (
          <form
            onSubmit={handleAddUser}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4"
          >

            <h2 className="text-sm font-bold text-white">
              Create New User
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <input
                name="first_name"
                required
                placeholder="First name"
                value={formData.first_name}
                onChange={handleChange}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white"
              />

              <input
                name="last_name"
                required
                placeholder="Last name"
                value={formData.last_name}
                onChange={handleChange}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white"
              />

              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white"
              />

              <input
                name="password"
                type="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white"
              />

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white"
              >
                <option value="user">
                  User
                </option>

                <option value="writer">
                  Writer
                </option>

                <option value="admin">
                  Admin
                </option>
              </select>

            </div>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-semibold"
            >
              Create User
            </button>

          </form>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12 text-zinc-500">
            Loading users...
          </div>
        )}

        {/* Users */}
        {!loading && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-x-auto">

            <table className="w-full text-left text-xs">

              <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800 font-mono">
                <tr>
                  <th className="p-3.5">
                    Name
                  </th>

                  <th className="p-3.5">
                    Email
                  </th>

                  <th className="p-3.5">
                    Role
                  </th>

                  <th className="p-3.5">
                    Status
                  </th>

                  <th className="p-3.5 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-800 text-zinc-300">

                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-8 text-center text-zinc-500"
                    >
                      No users found.
                    </td>
                  </tr>
                )}

                {users.map((user) => (
                  <tr key={user.id}>

                    <td className="p-3.5">
                      <p className="font-bold text-white">
                        {user.first_name}{' '}
                        {user.last_name}
                      </p>
                    </td>

                    <td className="p-3.5">
                      {user.email}
                    </td>

                    <td className="p-3.5">

                      <select
                        value={user.role}
                        onChange={(e) =>
                          changeRole(
                            user,
                            e.target.value
                          )
                        }
                        className="bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-[10px] text-white"
                      >
                        <option value="user">
                          User
                        </option>

                        <option value="writer">
                          Writer
                        </option>

                        <option value="admin">
                          Admin
                        </option>
                      </select>

                    </td>

                    <td className="p-3.5">

                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          user.is_active
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {user.is_active
                          ? 'Active'
                          : 'Deactivated'}
                      </span>

                    </td>

                    <td className="p-3.5 text-right">

                      <button
                        onClick={() =>
                          toggleUserStatus(user)
                        }
                        className={`inline-flex items-center gap-1 text-xs underline ${
                          user.is_active
                            ? 'text-red-400'
                            : 'text-emerald-400'
                        }`}
                      >

                        {user.is_active ? (
                          <>
                            <UserX size={14} />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <UserCheck size={14} />
                            Activate
                          </>
                        )}

                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>
    </AppLayout>
  );
}
import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { UserPlus, Shield, UserX } from 'lucide-react';

export default function UserManagementPage() {
  const [users, setUsers] = useState([
    { id: 1, name: 'James Maina', email: 'james@moringa.dev', role: 'User', active: true },
    { id: 2, name: 'Priya Nair', email: 'priya@moringa.dev', role: 'Writer', active: true },
    { id: 3, name: 'Admin Root', email: 'admin@moringa.dev', role: 'Admin', active: true },
  ]);

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, active: !u.active } : u));
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">User Management</h1>
            <p className="text-xs text-zinc-400">Manage user authorization and platform activity.</p>
          </div>
          <button className="flex items-center gap-1.5 bg-indigo-600 text-white text-xs px-3.5 py-2 rounded-xl font-semibold">
            <UserPlus size={14} /> Add User
          </button>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800 font-mono">
              <tr>
                <th className="p-3.5">Name</th>
                <th className="p-3.5">Email</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="p-3.5 font-bold text-white">{u.name}</td>
                  <td className="p-3.5">{u.email}</td>
                  <td className="p-3.5"><span className="bg-zinc-800 px-2 py-0.5 rounded text-[10px]">{u.role}</span></td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${u.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {u.active ? 'Active' : 'Deactivated'}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button 
                      onClick={() => toggleStatus(u.id)}
                      className="text-xs text-zinc-400 hover:text-white underline"
                    >
                      {u.active ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
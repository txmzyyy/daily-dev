import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import { Users, ShieldAlert, FolderPlus } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Administration Panel</h1>
          <p className="text-xs text-zinc-400">Manage community users, categories, and content moderation.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/admin/users" className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl hover:border-indigo-500 transition space-y-2">
            <Users className="text-indigo-400" size={24} />
            <h3 className="text-base font-bold text-white">User Management</h3>
            <p className="text-xs text-zinc-400">Add users, assign roles, or deactivate accounts.</p>
          </Link>

          <Link to="/admin/moderation" className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl hover:border-indigo-500 transition space-y-2">
            <ShieldAlert className="text-amber-400" size={24} />
            <h3 className="text-base font-bold text-white">Content Moderation</h3>
            <p className="text-xs text-zinc-400">Review flagged content and approve public releases.</p>
          </Link>

          <Link to="/admin/categories" className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl hover:border-indigo-500 transition space-y-2">
            <FolderPlus className="text-emerald-400" size={24} />
            <h3 className="text-base font-bold text-white">Category Management</h3>
            <p className="text-xs text-zinc-400">Create and structure new content tags.</p>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
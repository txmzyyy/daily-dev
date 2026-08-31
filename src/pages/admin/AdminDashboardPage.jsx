import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import {
  Users,
  ShieldAlert,
  FolderPlus,
  FileCheck,
} from 'lucide-react';
import { useSelector } from 'react-redux';

export default function AdminDashboardPage() {
  const user = useSelector((state) => state.auth.user);

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            Admin Administration Panel
          </h1>

          <p className="text-xs text-zinc-400 mt-1">
            Welcome, {user?.first_name || 'Admin'}. Manage users,
            categories, content, and reports.
          </p>
        </div>

        {/* Admin information */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <p className="text-xs text-zinc-500 font-mono uppercase">
            Signed in as
          </p>

          <div className="flex items-center justify-between mt-2">
            <div>
              <p className="text-white font-semibold">
                {user?.first_name} {user?.last_name}
              </p>

              <p className="text-xs text-zinc-400">
                {user?.email}
              </p>
            </div>

            <span className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase">
              {user?.role || 'admin'}
            </span>
          </div>
        </div>

        {/* Admin tools */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <Link
            to="/admin/users"
            className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl hover:border-indigo-500 transition"
          >
            <Users
              className="text-indigo-400 mb-3"
              size={24}
            />

            <h3 className="text-base font-bold text-white">
              User Management
            </h3>

            <p className="text-xs text-zinc-400 mt-1">
              Manage users, roles, and account status.
            </p>
          </Link>


          <Link
            to="/admin/moderation"
            className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl hover:border-indigo-500 transition"
          >
            <FileCheck
              className="text-emerald-400 mb-3"
              size={24}
            />

            <h3 className="text-base font-bold text-white">
              Content Moderation
            </h3>

            <p className="text-xs text-zinc-400 mt-1">
              Review and approve pending content.
            </p>
          </Link>


          <Link
            to="/admin/categories"
            className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl hover:border-indigo-500 transition"
          >
            <FolderPlus
              className="text-amber-400 mb-3"
              size={24}
            />

            <h3 className="text-base font-bold text-white">
              Categories
            </h3>

            <p className="text-xs text-zinc-400 mt-1">
              Create and manage content categories.
            </p>
          </Link>


          <Link
            to="/admin/reports"
            className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl hover:border-indigo-500 transition"
          >
            <ShieldAlert
              className="text-red-400 mb-3"
              size={24}
            />

            <h3 className="text-base font-bold text-white">
              Reports
            </h3>

            <p className="text-xs text-zinc-400 mt-1">
              Review reports submitted by users.
            </p>
          </Link>

        </div>

      </div>
    </AppLayout>
  );
}
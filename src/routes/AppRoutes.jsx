import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LandingPage from '../pages/shared/LandingPage';
import LoginPage from '../pages/shared/LoginPage';
import SignUpPage from '../pages/shared/SignUpPage';
import OnboardingInterests from '../pages/shared/OnboardingInterests';
import ContentDetailPage from '../pages/shared/ContentDetailPage';
import NotFoundPage from '../pages/shared/NotFoundPage';
import HomeFeedPage from '../pages/user/HomeFeedPage';
import ExplorePage from '../pages/user/ExplorePage';
import WishlistPage from '../pages/user/WishlistPage';
import NotificationsPage from '../pages/user/NotificationsPage';
import ProfilePage from '../pages/user/ProfilePage';
import WriterDashboardPage from '../pages/writer/WriterDashboardPage';
import CreateContentPage from '../pages/writer/CreateContentPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import ReportsPage from '../pages/admin/Reportspage';
import UserManagementPage from '../pages/admin/UserManagementPage';
import ContentModerationPage from '../pages/admin/ContentModerationPage';
import CategoryManagementPage from '../pages/admin/CategoryManagementPage';


export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/onboarding" element={<OnboardingInterests />} />

      {/* Routes available to any authenticated role */}
      <Route element={<ProtectedRoute allowedRoles={['user', 'writer', 'admin']} />}>
        <Route path="/feed" element={<HomeFeedPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/content/:id" element={<ContentDetailPage />} />
      </Route>

      {/* Tech Writer Routes */}
      <Route element={<ProtectedRoute allowedRoles={['writer', 'admin']} />}>
        <Route path="/writer/dashboard" element={<WriterDashboardPage />} />
        <Route path="/writer/create" element={<CreateContentPage />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<UserManagementPage />} />
        <Route path="/admin/moderation" element={<ContentModerationPage />} />
        <Route path="/admin/categories" element={<CategoryManagementPage />} />
        <Route path="/admin/reports" element={<ReportsPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
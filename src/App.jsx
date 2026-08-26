import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import AppLayout from './components/layout/AppLayout.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { NavigationProvider } from './context/NavigationContext.jsx'
import { NotificationsProvider } from './context/NotificationsContext.jsx'
import { ROLES } from './screens/utils/roles.js'

// Shared
import Splash from './screens/shared/Splash.jsx'
import SignUp from './screens/shared/SignUp.jsx'
import LogIn from './screens/shared/Login.jsx'
import OnboardingInterests from './screens/shared/OnboardingInterests.jsx'
import OnboardingProfile from './screens/shared/OnboardingProfile.jsx'
import Search from './screens/shared/Search.jsx'
import Notifications from './screens/shared/Notifications.jsx'
import ContentDetail from './screens/shared/ContentDetail.jsx'
import ProfileView from './screens/shared/ProfileView.jsx'
import ProfileEdit from './screens/shared/ProfileEdit.jsx'

// User
import HomeFeed from './screens/user/HomeFeed.jsx'
import CategoryFeed from './screens/user/CategoryFeed.jsx'
import MySubscriptions from './screens/user/MySubscriptions.jsx'
import PostContent from './screens/user/PostContent.jsx'
import Wishlist from './screens/user/Wishlist.jsx'

// Writer
import WriterDashboard from './screens/writer/WriterDashboard.jsx'
import CreateContent from './screens/writer/CreateContent.jsx'
import ManageCategories from './screens/writer/ManageCategories.jsx'
import ReviewQueue from './screens/writer/ReviewQueue.jsx'
import EditContent from './screens/writer/EditContent.jsx'

// Admin
import AdminDashboard from './screens/admin/AdminDashboard.jsx'
import UserManagement from './screens/admin/UserManagement.jsx'
import ContentModerationQueue from './screens/admin/ContentModerationQueue.jsx'
import CategoryManagement from './screens/admin/CategoryManagement.jsx'

// --- Simple route guard by role ---
function RequireRole({ role, children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role) return <Navigate to="/" replace />
  return children
}

function AppRoutes() {
  const { user } = useAuth()

  return (
    <NavigationProvider>
      <NotificationsProvider role={user?.role}>
        <Routes>
        {/* Auth screens — no nav chrome */}
        <Route path="/" element={<Splash />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/onboarding/interests" element={<OnboardingInterests />} />
        <Route path="/onboarding/profile" element={<OnboardingProfile />} />

        {/* Screens with nav chrome (Header/BottomNav on mobile, SideNav on desktop) */}
        <Route element={<AppLayout />}>
          {/* Shared */}
          <Route path="/search" element={<Search />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/content/:id" element={<ContentDetail />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />

          {/* User flow */}
          <Route path="/home" element={<RequireRole role={ROLES.USER}><HomeFeed /></RequireRole>} />
          <Route path="/category/:slug" element={<CategoryFeed />} />
          <Route path="/subscriptions" element={<MySubscriptions />} />
          <Route path="/post" element={<PostContent />} />
          <Route path="/wishlist" element={<Wishlist />} />

          {/* Writer flow */}
          <Route path="/writer/dashboard" element={<RequireRole role={ROLES.WRITER}><WriterDashboard /></RequireRole>} />
          <Route path="/writer/create" element={<CreateContent />} />
          <Route path="/writer/categories" element={<ManageCategories />} />
          <Route path="/writer/review-queue" element={<ReviewQueue />} />
          <Route path="/writer/edit/:id" element={<EditContent />} />

          {/* Admin flow */}
          <Route path="/admin/dashboard" element={<RequireRole role={ROLES.ADMIN}><AdminDashboard /></RequireRole>} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/moderation" element={<ContentModerationQueue />} />
          <Route path="/admin/categories" element={<CategoryManagement />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </NotificationsProvider>
    </NavigationProvider>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
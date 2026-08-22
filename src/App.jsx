import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';

// Shared Screens
import Splash from './screens/shared/Splash';
import Login from './screens/shared/Login';
import SignUp from './screens/shared/SignUp';
import ContentDetail from './screens/shared/ContentDetail';
import ProfileView from './screens/shared/ProfileView';
import ProfileEdit from './screens/shared/ProfileEdit';
import Notifications from './screens/shared/Notifications';
import Search from './screens/shared/Search';

// User Screens
import HomeFeed from './screens/user/HomeFeed';
import CategoryFeed from './screens/user/CategoryFeed';
import MySubscriptions from './screens/user/MySubscriptions';
import Wishlist from './screens/user/Wishlist';

// Writer Screens
import WriterDashboard from './screens/writer/WriterDashboard';
import CreateContent from './screens/writer/CreateContent';
import EditContent from './screens/writer/EditContent';
import ManageCategories from './screens/writer/ManageCategories';
import ReviewQueue from './screens/writer/ReviewQueue';

// Admin Screens
import AdminDashboard from './screens/admin/AdminDashboard';
import CategoryManagement from './screens/admin/CategoryManagement';
import ContentModerationQueue from './screens/admin/ContentModerationQueue';
import UserManagement from './screens/admin/UserManagement';

// Layout Components (Fixed "componets" typo)
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';

/* ==========================================
   VIEW ROUTER SWITCH
   ========================================== */
function MainView() {
  const { currentView } = useNavigation();

  switch (currentView) {
    // Shared / Auth Routes
    case 'splash':
      return <Splash />;
    case 'login':
      return <Login />;
    case 'signup':
      return <SignUp />;
    case 'notifications':
      return <Notifications />;
    case 'search':
      return <Search />;
    case 'content-detail':
      return <ContentDetail />;
    case 'profile':
      return <ProfileView />;
    case 'profile-edit':
      return <ProfileEdit />;

    // User Routes
    case 'home':
      return <HomeFeed />;
    case 'category':
      return <CategoryFeed />;
    case 'subscriptions':
      return <MySubscriptions />;
    case 'wishlist':
      return <Wishlist />;

    // Writer Routes
    case 'writer-dashboard':
      return <WriterDashboard />;
    case 'create-content':
      return <CreateContent />;
    case 'edit-content':
      return <EditContent />;
    case 'manage-categories':
      return <ManageCategories />;
    case 'review-queue':
      return <ReviewQueue />;

    // Admin Routes
    case 'admin-dashboard':
      return <AdminDashboard />;
    case 'admin-categories':
      return <CategoryManagement />;
    case 'admin-moderation':
      return <ContentModerationQueue />;
    case 'admin-users':
      return <UserManagement />;

    default:
      return <HomeFeed />;
  }
}

/* ==========================================
   MAIN APP LAYOUT
   ========================================== */
function AppContent() {
  const { currentView } = useNavigation();

  // Hide global navigation framing on standalone auth/onboarding screens
  const isStandalonePage = ['splash', 'login', 'signup'].includes(currentView);

  if (isStandalonePage) {
    return <MainView />;
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="screen" style={{ paddingBottom: '80px' }}>
        <MainView />
      </main>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationProvider initialView="home">
        <AppContent />
      </NavigationProvider>
    </AuthProvider>
  );
}
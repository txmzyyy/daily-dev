import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import BottomNav from './BottomNav.jsx'
import SideNav from './SideNav.jsx'

/**
 * AppLayout — shell wrapping every screen that needs navigation chrome
 * (i.e. everything after onboarding: Home, Search, Content Detail, etc.)
 *
 * Responsive strategy: all three nav components mount at once; each shows
 * or hides itself purely via CSS media query (see style.css). No JS resize
 * listeners, no layout flash on load, and it degrades gracefully with SSR.
 *
 *   < 1024px (mobile/tablet): Header (top) + BottomNav (bottom)
 *   >= 1024px (desktop):      SideNav (left rail) replaces both
 */
export default function AppLayout() {
  return (
    <div className="app-shell">
      <SideNav />
      <div className="app-shell-desktop">
        <Header />
        <Outlet />
      </div>
      <BottomNav />
    </div>
  )
}
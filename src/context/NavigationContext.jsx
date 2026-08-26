import { createContext, useContext, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'

/**
 * NavigationContext — a thin layer on top of react-router-dom, not a
 * replacement for it. React Router still owns actual routing; this just
 * centralizes two things that were previously duplicated in Header,
 * BottomNav, SideNav, and Login:
 *
 *   1. homePath — which route counts as "home" depends on role
 *      (/home for users, /writer/dashboard for writers, /admin/dashboard
 *      for admins). Before, each nav component computed this itself with
 *      its own ternary, which meant four separate places to keep in sync.
 *
 *   2. goBack() — navigate(-1) is unsafe as the very first action after
 *      a fresh page load or a deep link, since there's no history to go
 *      back to. This falls back to homePath when that happens instead of
 *      leaving the user stranded or exiting the app.
 */
const NavigationContext = createContext(null)
export const useAppNavigation = () => useContext(NavigationContext)

/**
 * getHomePathForRole — pure version of the homePath logic, for the one
 * case where a component knows a role before AuthContext's state has
 * re-rendered (e.g. Login's quickLogin calls loginAs(role) then needs to
 * navigate immediately). Keeps a single source of truth for the
 * role -> path mapping instead of a second duplicated ternary.
 */
export function getHomePathForRole(role) {
  if (role === 'writer') return '/writer/dashboard'
  if (role === 'admin') return '/admin/dashboard'
  if (role === 'user') return '/home'
  return '/'
}

export function NavigationProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  const homePath = useMemo(() => getHomePathForRole(user?.role), [user])

  const goHome = () => navigate(homePath)

  const goBack = () => {
    // window.history.state.idx is set by react-router's browser history;
    // 0 (or undefined) means this is the first entry — nothing to go back to.
    const hasHistory = window.history.state?.idx > 0
    if (hasHistory) {
      navigate(-1)
    } else {
      navigate(homePath)
    }
  }

  return (
    <NavigationContext.Provider value={{ homePath, goHome, goBack, currentPath: location.pathname }}>
      {children}
    </NavigationContext.Provider>
  )
}
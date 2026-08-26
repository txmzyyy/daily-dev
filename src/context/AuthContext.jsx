import { createContext, useContext, useState } from 'react'

/**
 * AuthContext — holds the current user + role, and the "demo quick login"
 * used across the app (see LogIn.jsx). Previously this lived inline in
 * App.jsx; moved here since the real project expects a standalone
 * context/AuthContext.jsx file.
 */
const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // null = logged out

  const loginAs = (role) => {
    setUser({ name: 'Demo User', role }) // role: 'user' | 'writer' | 'admin'
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
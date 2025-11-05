import { createContext, useState } from 'react'
import { authService } from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.getCurrentUser())

  const login = async (email, password) => {
    const res = await authService.login({ email, password })
    setUser(res.data.user)
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Export context for use in useAuth hook
export { AuthContext }
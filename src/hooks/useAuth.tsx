import { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
   isAuthenticated: boolean
   login: (token: string) => void
   logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: any): any => {
   const [isAuthenticated, setIsAuthenticated] = useState(false)

   useEffect(() => {
      const token = localStorage.getItem('token')
      if (token) setIsAuthenticated(true)
   }, [])

   const login = (token: string): void => {
      localStorage.setItem('token', token)
      setIsAuthenticated(true)
   }

   const logout = (): void => {
      localStorage.removeItem('token')
      setIsAuthenticated(false)
   }

   const authContextValue: AuthContextType = {
      isAuthenticated,
      login,
      logout,
   }

   return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType | null => {
   const authContext = useContext(AuthContext)
   return authContext
}

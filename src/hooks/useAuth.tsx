import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
   accessToken: string | null
   refreshToken: string | null
   userId: string | number | null
   login: (token: string, refreshToken: string, userId?: string) => void
   logout: () => void
}
type Props = {
   children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: Props) => {
   const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null)
   const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null)
   const [userId, setUserId] = useState(localStorage.getItem('userId') || null)

   useEffect(() => {
      if (accessToken && userId) {
         localStorage.setItem('accessToken', accessToken)
         localStorage.setItem('userId', userId)
      }
   }, [accessToken, userId])

   useEffect(() => {
      if (refreshToken) {
         localStorage.setItem('refreshToken', refreshToken)
      } else {
         localStorage.removeItem('refreshToken')
      }
   }, [refreshToken])

   const login = (token: string, refreshToken: string, userId?: string) => {
      setAccessToken(token)
      setRefreshToken(refreshToken)
      setUserId(userId || null)
      localStorage.setItem('accessToken', token)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('userId', userId || '')
   }

   const logout = () => {
      setAccessToken(null)
      setRefreshToken(null)
      setUserId(null)
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userId')
   }

   const authContextValue: AuthContextType = {
      accessToken,
      refreshToken,
      userId,
      login,
      logout,
   }

   return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}

const useAuth = (): AuthContextType => {
   const context = useContext(AuthContext)
   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider')
   }
   return context
}

export { AuthProvider, useAuth }

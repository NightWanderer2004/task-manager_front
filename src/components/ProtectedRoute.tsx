import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useLazyQuery, useMutation } from '@apollo/client'
import { CHECK_ACCESS } from '../graphql/queries'
import { REFRESH_TOKEN } from '../graphql/mutations'
import { useEffect } from 'react'

const ProtectedRoute = () => {
   const { accessToken, refreshToken, login } = useAuth()
   const navigate = useNavigate()

   const [checkAccessQuery, { called, loading }] = useLazyQuery(CHECK_ACCESS)
   const [refreshTokenMutation] = useMutation(REFRESH_TOKEN)

   useEffect(() => {
      const refreshTokens = async () => {
         try {
            await checkAccessQuery().then(({ data }) => {
               if (data === null) throw new Error('Invalid access token')
            })
         } catch (error: any) {
            try {
               await refreshTokenMutation({
                  variables: { refreshToken },
               }).then(({ data }) => {
                  login(data.refreshToken.accessToken, data.refreshToken.refreshToken, data.refreshToken.userId)
                  navigate('/')
               })
            } catch (error: any) {
               if (error.message === 'Invalid refresh token') navigate('/login')
            }
         }
      }

      if (accessToken && !called && !loading) refreshTokens()
   }, [accessToken, called, loading, checkAccessQuery])

   return accessToken ? <Outlet /> : <Navigate to='/sign-up' />
}

export default ProtectedRoute

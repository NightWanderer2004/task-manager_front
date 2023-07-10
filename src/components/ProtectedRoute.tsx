import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useQuery, useMutation } from '@apollo/client'
import { CHECK_ACCESS } from '../graphql/queries'
import { REFRESH_TOKEN } from '../graphql/mutations'
import { useEffect } from 'react'

const ProtectedRoute = () => {
   const { accessToken, refreshToken, login } = useAuth()
   const navigate = useNavigate()

   const { refetch: refetchCheckAccess } = useQuery(CHECK_ACCESS, {
      skip: !accessToken,
   })
   const [refreshTokenMutation] = useMutation(REFRESH_TOKEN)

   useEffect(() => {
      const refreshTokens = async () => {
         try {
            await refetchCheckAccess()
         } catch (error) {
            const { data } = await refreshTokenMutation({
               variables: {
                  refreshToken,
               },
            })
            if (data) {
               login(data.refreshToken.accessToken, data.refreshToken.refreshToken)
               navigate('/')
            }
         }
      }

      if (accessToken) refreshTokens()
   }, [accessToken, refetchCheckAccess])

   return accessToken ? <Outlet /> : <Navigate to='/sign-up' />
}

export default ProtectedRoute

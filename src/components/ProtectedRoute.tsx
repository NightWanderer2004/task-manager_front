import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = (): JSX.Element => {
   const token = localStorage.getItem('token')

   return token ? <Outlet /> : <Navigate to='/sign-up' />
}

export default ProtectedRoute

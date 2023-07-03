import { Container } from '@mui/material'
import AuthPage from './pages/Auth'
import HomePage from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './hooks/useAuth'

function App() {
   // @ts-expect-error
   const { logout } = useAuth()

   return (
      <div className='App'>
         <Container>
            <button onClick={logout}>LOGOUT</button>
            <Routes>
               <Route element={<ProtectedRoute />}>
                  <Route index path='/' element={<HomePage />} />
               </Route>
               <Route path='/*' element={<AuthPage />} />
            </Routes>
         </Container>
      </div>
   )
}

export default App

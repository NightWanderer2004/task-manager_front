import { Container } from '@mui/material'
import CategoriesPage from './pages/Categories'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import CategoryPage from './pages/Category'
import SignupForm from './components/forms/SignupForm'
import LoginForm from './components/forms/LoginForm'

function App() {
   return (
      <div className='App'>
         <Container>
            <Routes>
               <Route element={<ProtectedRoute />}>
                  <Route index element={<CategoriesPage />} />
                  <Route path=':categoryId' element={<CategoryPage />} />
               </Route>
               <Route path='sign-up' element={<SignupForm />} />
               <Route path='login' element={<LoginForm />} />
            </Routes>
         </Container>
      </div>
   )
}

export default App

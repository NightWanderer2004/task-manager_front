import { Routes, Route } from 'react-router-dom'
import SignupForm from '../components/forms/SignupForm'
import LoginForm from '../components/forms/LoginForm'

type Props = {}

const AuthPage = (props: Props): JSX.Element => {
   return (
      <div>
         <Routes>
            <Route path='/sign-up' element={<SignupForm />} />
            <Route path='/login' element={<LoginForm />} />
         </Routes>
      </div>
   )
}

export default AuthPage

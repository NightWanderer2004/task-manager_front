import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../../graphql/mutations'
import AuthForm, { FormValues } from './AuthForm'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
   const navigate = useNavigate()
   const { login } = useAuth()
   const [loginUser, { error }] = useMutation(LOGIN_USER)
   const handleLogin = async (values: FormValues) => {
      try {
         const { data } = await loginUser({
            variables: { input: values },
         })
         if (data) {
            login(data.login.token, data.login.refreshToken, data.login.user.id)
            navigate('/')
         }
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <AuthForm handleSubmit={handleLogin} error={error?.message} buttonText='Login' linkText='Does not have an account? Sign Up' linkTo='/sign-up' />
   )
}

export default LoginForm

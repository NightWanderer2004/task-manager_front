import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../../graphql/mutations'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import AuthForm from './AuthForm'

const LoginForm = (): JSX.Element | string => {
   const navigate = useNavigate()
   // @ts-expect-error
   const { login } = useAuth()
   const [loginUser, { loading, error }] = useMutation(LOGIN_USER)

   const handleLogin = async (email: string, password: string) => {
      try {
         const { data } = await loginUser({
            variables: {
               input: {
                  email,
                  password,
               },
            },
         })
         login(data.login.token)
         navigate('/')
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <AuthForm handleSubmit={handleLogin} error={error?.message} buttonText='Login' linkText='Does not have an account? Sign Up' linkTo='/sign-up' />
   )
}

export default LoginForm

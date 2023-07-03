import { useMutation } from '@apollo/client'
import { LOGIN_USER, SIGNUP_USER } from '../../graphql/mutations'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import AuthForm from './AuthForm'

const SignupForm = (): JSX.Element | string => {
   const navigate = useNavigate()
   const [signupUser, { loading, error }] = useMutation(SIGNUP_USER)
   const [loginUser] = useMutation(LOGIN_USER)
   // @ts-expect-error
   const { login } = useAuth()

   const handleSignup = async (email: string, password: string) => {
      try {
         await signupUser({
            variables: {
               input: {
                  email,
                  password,
                  role: 'admin',
               },
            },
         })
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
      <AuthForm handleSubmit={handleSignup} error={error?.message} buttonText='Sign Up' linkText='Already have an account? Login' linkTo='/login' />
   )
}

export default SignupForm

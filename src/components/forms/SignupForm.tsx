import { useNavigate } from 'react-router-dom'
import { SIGNUP_USER } from '../../graphql/mutations'
import AuthForm, { FormValues } from './AuthForm'
import { useMutation } from '@apollo/client'

const SignupForm = () => {
   const navigate = useNavigate()
   const [signupUser, { error }] = useMutation(SIGNUP_USER)

   const handleSignup = async (values: FormValues) => {
      try {
         await signupUser({
            variables: { input: values },
         })
         navigate('/login')
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <AuthForm handleSubmit={handleSignup} error={error?.message} buttonText='Sign Up' linkText='Already have an account? Login' linkTo='/login' />
   )
}

export default SignupForm

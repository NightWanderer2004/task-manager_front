import { gql } from '@apollo/client'

const SIGNUP_USER = gql`
   mutation Signup($input: CreateUserDto!) {
      signup(signupUser: $input) {
         id
         email
      }
   }
`

const LOGIN_USER = gql`
   mutation Login($input: LoginUser!) {
      login(loginUser: $input) {
         user {
            id
            email
         }
         token
      }
   }
`

export { SIGNUP_USER, LOGIN_USER }

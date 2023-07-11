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
         refreshToken
      }
   }
`

const REFRESH_TOKEN = gql`
   mutation RefreshToken($refreshToken: String!) {
      refreshToken(refreshToken: $refreshToken) {
         accessToken
         refreshToken
         userId
      }
   }
`

const CREATE_CATEGORY = gql`
   mutation CreateCategory($input: CreateCategoryDto!) {
      createCategory(input: $input) {
         id
         dateCreated
         name
      }
   }
`

const UPDATE_CATEGORY = gql`
   mutation UpdateCategory($categoryId: Float!, $input: CreateCategoryDto!) {
      updateCategory(id: $categoryId, input: $input) {
         name
      }
   }
`

const DELETE_CATEGORY = gql`
   mutation DeleteCategory($categoryId: Float!) {
      deleteCategory(id: $categoryId) {
         name
      }
   }
`

const CREATE_TASK = gql`
   mutation CreateTask($input: CreateTaskDto!) {
      createTask(input: $input) {
         name
      }
   }
`

const UPDATE_TASK = gql`
   mutation UpdateTask($taskId: Float!, $input: CreateTaskDto!) {
      updateTask(id: $taskId, input: $input) {
         name
      }
   }
`

const DELETE_TASK = gql`
   mutation DeleteTask($taskId: Float!) {
      deleteTask(id: $taskId) {
         name
      }
   }
`

export { SIGNUP_USER, LOGIN_USER, REFRESH_TOKEN, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, CREATE_TASK, UPDATE_TASK, DELETE_TASK }

import { gql } from '@apollo/client'

const CHECK_ACCESS = gql`
   query {
      checkAccess
   }
`

const GET_USERS = gql`
   query {
      users {
         id
         email
      }
   }
`

const GET_USER_CATEGORIES = gql`
   query GetUserCategories($userId: Float!) {
      user(id: $userId) {
         categories {
            id
            name
            dateCreated
            tasks {
               id
               name
            }
         }
      }
   }
`

const GET_CATEGORY = gql`
   query GetCategory($categoryId: Float!) {
      category(id: $categoryId) {
         id
         name
         dateCreated
         tasks {
            id
            name
            dateStart
            dateEnd
         }
      }
   }
`

const GET_TASKS = gql`
   query TasksByCategoryId($id: Float!) {
      tasksByCategoryId(id: $id) {
         id
         name
         dateStart
         dateEnd
         taskId
      }
   }
`

export { CHECK_ACCESS, GET_USERS, GET_USER_CATEGORIES, GET_CATEGORY, GET_TASKS }

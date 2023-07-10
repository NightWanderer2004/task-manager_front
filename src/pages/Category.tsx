import { useParams } from 'react-router-dom'
import { GET_CATEGORY } from '../graphql/queries'
import { useQuery } from '@apollo/client'
import TaskList from '../components/tasks/TaskList'

const CategoryPage = () => {
   const { categoryId } = useParams()

   const { data, loading, error } = useQuery(GET_CATEGORY, {
      variables: { categoryId: categoryId ? +categoryId : null },
   })

   if (loading) {
      return <p>Loading...</p>
   }

   if (error) {
      return <p>Error: {error.message}</p>
   }

   return <TaskList data={data} />
}

export default CategoryPage

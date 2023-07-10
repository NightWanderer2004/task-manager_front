import { Box, Button, Divider, List, Skeleton, Typography } from '@mui/material'
import CategoryItem from './CategoryItem'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USER_CATEGORIES } from '../../graphql/queries'
import { CREATE_CATEGORY } from '../../graphql/mutations'
import { useState } from 'react'
import AddCategory from './popups/AddCategory'
import { useNavigate } from 'react-router-dom'
import AddButton from '../AddButton'
import { useAuth } from '../../hooks/useAuth'

type CategoryProps = {
   id: number
   name: string
   tasks: number[]
   dateCreated: number
}

const CategoryList = () => {
   const { userId, logout } = useAuth()
   const [open, setOpen] = useState(false)
   const handleOpen = () => setOpen(true)
   const handleClose = () => setOpen(false)
   const navigate = useNavigate()

   const { data, loading, error } = useQuery(GET_USER_CATEGORIES, {
      variables: { userId: userId ? +userId : null },
   })
   const [createCategory] = useMutation(CREATE_CATEGORY)

   const handleAddCategory = (values: { name: string }) => {
      try {
         createCategory({
            variables: {
               input: {
                  name: values.name,
                  userId: userId ? +userId : null,
                  dateCreated: Date.now(),
               },
            },
            refetchQueries: [{ query: GET_USER_CATEGORIES, variables: { userId: userId ? +userId : null } }],
         })
         handleClose()
      } catch (error: any) {
         console.error(error?.message)
      }
   }

   return (
      <>
         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant='h3'>Categories</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
               <AddButton handleClick={handleOpen} />
               <AddCategory open={open} handleClose={handleClose} submitHandler={handleAddCategory} />
               <Button
                  onClick={() => {
                     logout()
                     navigate('/')
                  }}
                  variant='contained'
                  size='large'
                  sx={{ fontWeight: 'bold' }}
               >
                  Logout
               </Button>
            </Box>
         </Box>
         <List>
            {loading ? (
               <Skeleton component='li' variant='text' width='100%' height='500px' />
            ) : (
               <>
                  {error && (
                     <Typography variant='h6' component='li' sx={{ textAlign: 'center', fontWeight: 'normal', marginTop: '40px' }}>
                        {error.message}
                     </Typography>
                  )}
                  {data && data.user.categories.length === 0 && (
                     <Typography variant='h6' component='li' sx={{ textAlign: 'center', fontWeight: 'normal', marginTop: '40px' }}>
                        You don't have any categories yet. Click the add button to create a new category.
                     </Typography>
                  )}
               </>
            )}
            {!loading &&
               !error &&
               data.user.categories.map((category: CategoryProps) => (
                  <>
                     <CategoryItem
                        key={category.id}
                        categoryId={category.id}
                        name={category.name}
                        sumOfTasks={category.tasks.length}
                        dateCreated={category.dateCreated}
                     />
                     <Divider component='li' />
                  </>
               ))}
         </List>
      </>
   )
}

export default CategoryList

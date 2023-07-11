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

type Category = {
   id: number
   name: string
   tasks: number[]
   dateCreated: number
}

const CategoryList = () => {
   const { userId, logout } = useAuth()
   const navigate = useNavigate()

   const [open, setOpen] = useState(false)
   const handleOpen = () => setOpen(true)
   const handleClose = () => setOpen(false)

   const { data, loading, error } = useQuery(GET_USER_CATEGORIES, {
      variables: { userId: userId ? +userId : null },
   })
   const [createCategory] = useMutation(CREATE_CATEGORY)

   const handleAddCategory = async (values: { name: string }) => {
      try {
         await createCategory({
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
      } catch (error) {
         console.error(error)
      }
   }

   if (loading) return <p>Loading...</p>
   if (error) return <p>Error: {error.message}</p>

   return (
      <>
         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'space-between',
               '@media (min-width: 600px)': { flexDirection: 'row' },
            }}
         >
            <Typography variant='h3' sx={{ fontSize: '42px', '@media (min-width: 600px)': { fontSize: '48px' } }}>
               Categories
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
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
            {data.user.categories.length === 0 && (
               <Typography variant='h6' component='li' sx={{ textAlign: 'center', fontWeight: 'normal', marginTop: '40px' }}>
                  You don't have any categories yet. Click the add button to create a new category.
               </Typography>
            )}
            {data.user.categories.map((el: Category) => (
               <>
                  <CategoryItem key={el.id} categoryId={el.id} name={el.name} sumOfTasks={el.tasks.length} dateCreated={el.dateCreated} />
                  <Divider component='li' />
               </>
            ))}
         </List>
      </>
   )
}

export default CategoryList

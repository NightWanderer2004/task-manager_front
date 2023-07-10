import { Box, Button, Popover, Stack } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'
import EditCategory from './popups/EditCategory'
import { DELETE_CATEGORY, UPDATE_CATEGORY } from '../../graphql/mutations'
import { useMutation } from '@apollo/client'
import { GET_USER_CATEGORIES } from '../../graphql/queries'
import DeleteCategory from './popups/DeleteCategory'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

type Props = {
   popoverId: string | undefined
   anchorEl: HTMLButtonElement | null
   open: boolean
   handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
   handleClose: () => void
   categoryId: number
   name: string
}

const CategoryActions = (props: Props) => {
   const navigate = useNavigate()
   const { userId } = useAuth()

   const [openUpdate, setOpenUpdate] = useState(false)
   const handleOpenUpdate = () => setOpenUpdate(true)
   const handleCloseUpdate = () => setOpenUpdate(false)

   const [openDelete, setOpenDelete] = useState(false)
   const handleOpenDelete = () => setOpenDelete(true)
   const handleCloseDelete = () => setOpenDelete(false)

   const [updateCategory] = useMutation(UPDATE_CATEGORY)
   const [deleteCategory] = useMutation(DELETE_CATEGORY)

   const handleUpdateCategory = (values: { name: string }) => {
      try {
         updateCategory({
            variables: {
               categoryId: Math.floor(props.categoryId),
               input: {
                  name: values.name,
               },
            },
            refetchQueries: [{ query: GET_USER_CATEGORIES, variables: { userId: userId ? +userId : null } }],
         })
         handleCloseUpdate()
      } catch (error) {
         console.error(error)
      }
   }

   const handleDeleteCategory = () => {
      try {
         deleteCategory({
            variables: {
               categoryId: Math.floor(props.categoryId),
            },
            refetchQueries: [{ query: GET_USER_CATEGORIES, variables: { userId: userId ? +userId : null } }],
         })
         handleCloseDelete()
      } catch (error) {
         console.error(error)
      }
   }

   const handleMore = () => {
      navigate(`/${props.categoryId}`)
   }

   return (
      <Box sx={{ display: 'flex', columnGap: 2, alignItems: 'center' }}>
         <Button aria-describedby={props.popoverId} variant='text' onClick={props.handleClick}>
            Actions
         </Button>
         <Popover
            id={props.popoverId}
            open={props.open}
            anchorEl={props.anchorEl}
            onClose={props.handleClose}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'left',
            }}
         >
            <Box sx={{ padding: 1 }}>
               <Stack spacing={1}>
                  <Button onClick={handleOpenUpdate} variant='contained' startIcon={<EditIcon />}>
                     edit
                  </Button>
                  <EditCategory name={props.name} open={openUpdate} handleClose={handleCloseUpdate} submitHandler={handleUpdateCategory} />
                  <Button onClick={handleOpenDelete} variant='contained' color='error' startIcon={<DeleteIcon />}>
                     delete
                  </Button>
                  <DeleteCategory open={openDelete} handleClose={handleCloseDelete} submitHandler={handleDeleteCategory} />
               </Stack>
            </Box>
         </Popover>
         <Button onClick={handleMore} variant='text'>
            more
         </Button>
      </Box>
   )
}

export default CategoryActions

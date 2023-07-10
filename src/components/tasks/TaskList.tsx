import { Box, Grid, Typography } from '@mui/material'
import TaskItem from './TaskItem'
import AddButton from '../AddButton'
import { useState } from 'react'
import AddTask from './popups/AddTask'
import { CREATE_TASK } from '../../graphql/mutations'
import { useMutation, useQuery } from '@apollo/client'
import { GET_TASKS } from '../../graphql/queries'

type Props = {
   data: {
      category: {
         name: string
         id: string
      }
   }
}

type Task = {
   id: number
   name: string
   dateStart: string
   dateEnd: string
}

const TaskList = (props: Props) => {
   const categoryId = parseInt(props.data.category.id)

   const [open, setOpen] = useState(false)
   const handleOpen = () => setOpen(true)
   const handleClose = () => setOpen(false)

   const { data, loading, error } = useQuery(GET_TASKS, {
      variables: { id: categoryId },
   })
   console.log(data)
   const [createTask] = useMutation(CREATE_TASK)

   const handleSubmit = (values: { name: string; dateStart?: string; dateEnd?: string }) => {
      try {
         createTask({
            variables: {
               input: {
                  name: values.name,
                  taskId: categoryId,
                  dateStart: values.dateStart,
                  dateEnd: values.dateEnd,
               },
            },
            // refetchQueries: [{ query: GET_TASKS, variables: { id: categoryId } }],
         })
         handleClose()
      } catch (error) {
         console.error(error)
      }
   }

   if (loading) {
      return <p>Loading...</p>
   }
   if (error) {
      return <p>Error: {error.message}</p>
   }

   return (
      <Box sx={{ marginTop: 8 }}>
         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant='h3'>{props.data.category.name}</Typography>
            <AddButton handleClick={handleOpen} />
            <AddTask open={open} handleClose={handleClose} submitHandler={handleSubmit} />
         </Box>
         <Grid container spacing={3} rowSpacing={3} sx={{ paddingTop: 2 }}>
            {data.tasksByCategoryId.map((el: Task) => (
               <TaskItem key={el.id} task={el} />
            ))}
         </Grid>
      </Box>
   )
}

export default TaskList

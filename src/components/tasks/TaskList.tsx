import { Box, Grid, Typography } from '@mui/material'
import TaskItem from './TaskItem'
import AddButton from '../AddButton'
import { useState } from 'react'
import AddTask from './popups/AddTask'
import { CREATE_TASK } from '../../graphql/mutations'
import { useMutation, useQuery } from '@apollo/client'
import { GET_TASKS } from '../../graphql/queries'
import { Dayjs } from 'dayjs'

type Props = {
   data: {
      category: {
         name: string
         id: string
      }
   }
}

type Task = {
   id: string
   name: string
   dateStart: Dayjs
   dateEnd: Dayjs
}

const TaskList = (props: Props) => {
   const categoryId = parseInt(props.data.category.id)

   const [open, setOpen] = useState(false)
   const handleOpen = () => setOpen(true)
   const handleClose = () => setOpen(false)

   const { data, loading, error } = useQuery(GET_TASKS, {
      variables: { id: categoryId },
   })
   const [createTask] = useMutation(CREATE_TASK)

   const handleAddTask = async (values: { name: string; dateStart: Dayjs; dateEnd: Dayjs }) => {
      try {
         await createTask({
            variables: {
               input: {
                  name: values.name,
                  dateStart: values.dateStart,
                  dateEnd: values.dateEnd,
                  taskId: categoryId,
               },
            },
            refetchQueries: [{ query: GET_TASKS, variables: { id: categoryId } }],
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
         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant='h3' sx={{ fontSize: '42px', '@media (min-width: 600px)': { fontSize: '48px' } }}>
               {props.data.category.name}
            </Typography>
            <AddButton handleClick={handleOpen} />
            <AddTask open={open} handleClose={handleClose} submitHandler={handleAddTask} />
         </Box>
         <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            {data.tasksByCategoryId.length === 0 && (
               <Typography variant='h6' sx={{ textAlign: 'center', width: '100%', fontWeight: 'normal', marginTop: '40px' }}>
                  You don't have any tasks yet. Click the add button to create a new task.
               </Typography>
            )}
            {data.tasksByCategoryId.map((el: Task) => (
               <TaskItem key={el.id} task={el} categoryId={categoryId} />
            ))}
         </Grid>
      </>
   )
}

export default TaskList

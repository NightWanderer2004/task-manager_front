import { Button, Stack } from '@mui/material'
import EditTask from './popups/EditTask'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { DELETE_TASK, UPDATE_TASK } from '../../graphql/mutations'
import { GET_TASKS } from '../../graphql/queries'
import DeleteTask from './popups/DeleteTask'
import dayjs, { Dayjs } from 'dayjs'

type Props = {
   categoryId: number
   task: {
      id: string
      name: string
      dateStart: Dayjs
      dateEnd: Dayjs
   }
}

const TaskActions = (props: Props) => {
   const [openEdit, setOpenEdit] = useState(false)
   const handleOpenEdit = () => setOpenEdit(true)
   const handleCloseEdit = () => setOpenEdit(false)
   const [openDelete, setOpenDelete] = useState(false)
   const handleOpenDelete = () => setOpenDelete(true)
   const handleCloseDelete = () => setOpenDelete(false)

   const [updateTask] = useMutation(UPDATE_TASK)
   const [deleteTask] = useMutation(DELETE_TASK)

   const handleEditTask = async (values: { name: string; dateStart: Dayjs; dateEnd: Dayjs }) => {
      try {
         await updateTask({
            variables: {
               input: {
                  name: values.name,
                  dateStart: dayjs(values.dateStart).add(1, 'day'),
                  dateEnd: dayjs(values.dateEnd).add(1, 'day'),
               },
               taskId: parseInt(props.task.id),
            },
            refetchQueries: [{ query: GET_TASKS, variables: { id: props.categoryId } }],
         })
         handleCloseEdit()
      } catch (error) {
         console.error(error)
      }
   }

   const handleDeleteTask = async () => {
      try {
         await deleteTask({
            variables: {
               taskId: parseInt(props.task.id),
            },
            refetchQueries: [{ query: GET_TASKS, variables: { id: props.categoryId } }],
         })
         handleCloseDelete()
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <Stack direction='row' spacing={1} sx={{ marginTop: 2 }}>
         <Button variant='outlined' onClick={handleOpenEdit}>
            edit
         </Button>
         <EditTask
            open={openEdit}
            name={props.task.name}
            dateStart={props.task.dateStart}
            dateEnd={props.task.dateEnd}
            handleClose={handleCloseEdit}
            submitHandler={handleEditTask}
         />
         <Button variant='outlined' onClick={handleOpenDelete} color='error'>
            delete
         </Button>
         <DeleteTask open={openDelete} handleClose={handleCloseDelete} submitHandler={handleDeleteTask} />
      </Stack>
   )
}

export default TaskActions

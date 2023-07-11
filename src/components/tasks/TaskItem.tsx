import { Box, Grid, Typography } from '@mui/material'
import TaskActions from './TaskActions'
import dayjs, { Dayjs } from 'dayjs'

type Props = {
   categoryId: number
   task: {
      name: string
      dateStart: Dayjs
      dateEnd: Dayjs
      id: string
   }
}

const TaskItem = (props: Props) => {
   const dateStartString = dayjs(props.task.dateStart).format('D MMM YYYY')
   const dateEndString = dayjs(props.task.dateEnd).format('D MMM YYYY')

   return (
      <Grid item xs={12} sm={6} md={3}>
         <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, border: 'solid lightgrey 1px', padding: 2 }}>
            <Typography variant='h5'>{props.task.name}</Typography>
            <Typography variant='body1'>start date: {dateStartString}</Typography>
            <Typography variant='body1'>end date: {dateEndString}</Typography>
            <TaskActions task={props.task} categoryId={props.categoryId} />
         </Box>
      </Grid>
   )
}

export default TaskItem

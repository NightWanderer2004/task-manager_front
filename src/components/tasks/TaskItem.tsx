import { Box, Grid, Typography } from '@mui/material'
import TaskActions from './TaskActions'

type Props = {
   task: {
      name: string
      dateStart: string
      dateEnd: string
   }
}

const TaskItem = ({ task }: Props) => {
   return (
      <Grid item xs={3}>
         <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, border: 'solid lightgrey 1px', padding: 2 }}>
            <Typography variant='h5'>{task.name}</Typography>
            <Typography variant='body1'>start date: {task.dateStart}</Typography>
            <Typography variant='body1'>end date: {task.dateEnd}</Typography>
            <TaskActions />
         </Box>
      </Grid>
   )
}

export default TaskItem

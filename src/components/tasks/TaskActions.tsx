import { Button, Stack } from '@mui/material'

type Props = {}

const TaskActions = (props: Props) => {
   return (
      <Stack direction='row' spacing={1} sx={{ marginTop: 2 }}>
         <Button variant='outlined'>edit</Button>
         <Button variant='outlined' color='error'>
            delete
         </Button>
      </Stack>
   )
}

export default TaskActions

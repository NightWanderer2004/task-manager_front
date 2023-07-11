import { Box, Modal, Typography } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
   open: boolean
   handleClose: () => void
   title: string
   children: ReactNode
}

const style = {
   position: 'absolute' as 'absolute',
   top: '30%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   bgcolor: 'background.paper',
   minWidth: '250px',
   borderRadius: 1,
   boxShadow: 5,
   padding: 4,
}

const Popup = (props: Props) => {
   return (
      <Modal open={props.open} onClose={props.handleClose}>
         <Box sx={style}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
               <Typography variant='h5'>{props.title}</Typography>
               {props.children}
            </Box>
         </Box>
      </Modal>
   )
}

export default Popup

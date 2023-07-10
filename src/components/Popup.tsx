import { Box, Modal, Typography } from '@mui/material'
import { Formik } from 'formik'
import { ReactNode } from 'react'

type Props = {
   withFormik?: boolean
   open: boolean
   handleClose: () => void
   initValues?: { name: string; dateStart?: string; dateEnd?: string }
   submitHandler: (values: { name: string; dateStart?: string; dateEnd?: string }) => void
   title: string
   validationSchema?: any
   children: ReactNode | { (props: { errors: any }): JSX.Element }
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
               <Formik
                  initialValues={props.initValues || { name: '', dateStart: '', dateEnd: '' }}
                  validationSchema={props.validationSchema}
                  onSubmit={props.submitHandler}
               >
                  {props.children}
               </Formik>
            </Box>
         </Box>
      </Modal>
   )
}

export default Popup

import { Button } from '@mui/material'
import { Form, Formik } from 'formik'
import Popup from '../../Popup'

type Props = {
   open: boolean
   handleClose: () => void
   submitHandler: () => void
}

const DeleteTask = (props: Props) => {
   return (
      <Popup open={props.open} handleClose={props.handleClose} title='Edit task'>
         <Formik initialValues={{}} onSubmit={props.submitHandler}>
            <Form>
               <Button sx={{ fontWeight: 'bold' }} fullWidth type='submit' variant='contained'>
                  Delete
               </Button>
            </Form>
         </Formik>
      </Popup>
   )
}

export default DeleteTask

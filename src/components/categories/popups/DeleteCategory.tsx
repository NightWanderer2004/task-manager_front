import { Button } from '@mui/material'
import { Form } from 'formik'
import Popup from '../../Popup'

type Props = {
   open: boolean
   handleClose: () => void
   submitHandler: () => void
}

const DeleteCategory = (props: Props) => {
   return (
      <Popup withFormik={false} open={props.open} handleClose={props.handleClose} submitHandler={props.submitHandler} title='Delete category'>
         <Form>
            <Button sx={{ fontWeight: 'bold', marginTop: 1 }} fullWidth type='submit' variant='contained'>
               Delete
            </Button>
         </Form>
      </Popup>
   )
}

export default DeleteCategory

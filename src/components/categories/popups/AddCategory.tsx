import { Button, TextField } from '@mui/material'
import { ErrorMessage, Field, Form } from 'formik'
import * as Yup from 'yup'
import Popup from '../../Popup'

type Props = {
   open: boolean
   handleClose: () => void
   submitHandler: (values: { name: string }) => void
}

const validationSchema = Yup.object().shape({
   name: Yup.string().required('Name is required'),
})

const initValues = {
   name: '',
}

const AddCategory = (props: Props) => {
   return (
      <Popup
         withFormik={true}
         open={props.open}
         handleClose={props.handleClose}
         initValues={initValues}
         submitHandler={props.submitHandler}
         validationSchema={validationSchema}
         title='Add category'
      >
         {({ errors }) => (
            <Form>
               <Field name='name' as={TextField} label='Category name' fullWidth error={!!errors.name} helperText={<ErrorMessage name='name' />} />
               <Button sx={{ fontWeight: 'bold', marginTop: 1 }} fullWidth type='submit' variant='contained'>
                  Add
               </Button>
            </Form>
         )}
      </Popup>
   )
}

export default AddCategory

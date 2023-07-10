import { Button, TextField } from '@mui/material'
import { ErrorMessage, Field, Form } from 'formik'
import * as Yup from 'yup'
import Popup from '../../Popup'

type Props = {
   name: string
   open: boolean
   handleClose: () => void
   submitHandler: (values: { name: string }) => void
}

const validationSchema = Yup.object().shape({
   name: Yup.string().required('Name is required'),
})

const EditCategory = (props: Props) => {
   const initValues = {
      name: props.name,
   }

   return (
      <Popup
         withFormik={true}
         open={props.open}
         handleClose={props.handleClose}
         initValues={initValues}
         submitHandler={props.submitHandler}
         validationSchema={validationSchema}
         title='Edit category'
      >
         {({ errors }) => (
            <Form>
               <Field name='name' as={TextField} label='Edit name' fullWidth error={!!errors.name} helperText={<ErrorMessage name='name' />} />
               <Button sx={{ fontWeight: 'bold', marginTop: 1 }} fullWidth type='submit' variant='contained'>
                  Save
               </Button>
            </Form>
         )}
      </Popup>
   )
}

export default EditCategory

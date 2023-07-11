import { Button, TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
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
      <Popup open={props.open} handleClose={props.handleClose} title='Edit category'>
         <Formik initialValues={initValues} validationSchema={validationSchema} onSubmit={props.submitHandler}>
            {({ errors }) => (
               <Form>
                  <Field name='name' as={TextField} label='Edit name' fullWidth error={!!errors.name} helperText={<ErrorMessage name='name' />} />
                  <Button sx={{ fontWeight: 'bold', marginTop: 1 }} fullWidth type='submit' variant='contained'>
                     Save
                  </Button>
               </Form>
            )}
         </Formik>
      </Popup>
   )
}

export default EditCategory

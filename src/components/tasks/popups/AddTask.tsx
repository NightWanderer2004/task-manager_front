import { Button, Stack, TextField } from '@mui/material'
import { ErrorMessage, Field, Form } from 'formik'
import * as Yup from 'yup'
import Popup from '../../Popup'

type Props = {
   open: boolean
   handleClose: () => void
   submitHandler: (values: { name: string; dateStart?: string; dateEnd?: string }) => void
}

const validationSchema = Yup.object().shape({
   name: Yup.string().required('Name is required'),
   dateStart: Yup.date().required('Start date is required'),
   dateEnd: Yup.date().required('End date is required'),
})

const initValues = {
   name: '',
   dateStart: '',
   dateEnd: '',
}

const AddTask = (props: Props) => {
   return (
      <Popup
         withFormik={true}
         open={props.open}
         handleClose={props.handleClose}
         initValues={initValues}
         submitHandler={props.submitHandler}
         validationSchema={validationSchema}
         title='Add task'
      >
         {({ errors }) => (
            <Form>
               <Field name='name' as={TextField} label='Task name' fullWidth error={!!errors.name} helperText={<ErrorMessage name='name' />} />
               <Stack direction='row' spacing={1} sx={{ marginY: 2 }}>
                  <Field
                     name='dateStart'
                     as={TextField}
                     label='Start date'
                     fullWidth
                     error={!!errors.dateStart}
                     helperText={<ErrorMessage name='dateStart' />}
                  />
                  <Field
                     name='dateEnd'
                     as={TextField}
                     label='End date'
                     fullWidth
                     error={!!errors.dateEnd}
                     helperText={<ErrorMessage name='dateEnd' />}
                  />
               </Stack>
               <Button sx={{ fontWeight: 'bold' }} fullWidth type='submit' variant='contained'>
                  Add
               </Button>
            </Form>
         )}
      </Popup>
   )
}

export default AddTask

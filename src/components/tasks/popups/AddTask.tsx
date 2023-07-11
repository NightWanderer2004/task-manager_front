import { Button, Stack, TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import Popup from '../../Popup'
import dayjs, { Dayjs } from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers'

type Props = {
   open: boolean
   handleClose: () => void
   submitHandler: (values: { name: string; dateStart: Dayjs; dateEnd: Dayjs }) => void
}

const validationSchema = Yup.object().shape({
   name: Yup.string().required('Name is required'),
   dateStart: Yup.date().required('Start date is required'),
   dateEnd: Yup.date().required('End date is required'),
})

const AddTask = (props: Props) => {
   const today = dayjs()
   const tomorrow = dayjs().add(1, 'day')

   const initValues = {
      name: '',
      dateStart: today,
      dateEnd: tomorrow,
   }

   return (
      <Popup open={props.open} handleClose={props.handleClose} title='Add task'>
         <Formik initialValues={initValues} validationSchema={validationSchema} onSubmit={props.submitHandler}>
            {({ errors, values, setFieldValue }) => (
               <Form>
                  <Field name='name' as={TextField} label='Task name' fullWidth error={!!errors.name} helperText={<ErrorMessage name='name' />} />
                  <Stack direction='row' spacing={1} sx={{ marginY: 2 }}>
                     <DatePicker
                        label='Start date'
                        value={values.dateStart}
                        disablePast
                        onChange={(newValue: Dayjs | null) => setFieldValue('dateStart', newValue)}
                     />
                     <DatePicker
                        label='End date'
                        value={values.dateEnd}
                        disablePast
                        onChange={(newValue: Dayjs | null) => setFieldValue('dateEnd', newValue)}
                     />
                  </Stack>
                  <Button sx={{ fontWeight: 'bold' }} fullWidth type='submit' variant='contained'>
                     Add
                  </Button>
               </Form>
            )}
         </Formik>
      </Popup>
   )
}

export default AddTask

import { Button, Stack, TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import Popup from '../../Popup'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'

type Props = {
   name: string
   dateStart: Dayjs
   dateEnd: Dayjs
   open: boolean
   handleClose: () => void
   submitHandler: (values: { name: string; dateStart: Dayjs; dateEnd: Dayjs }) => void
}

const validationSchema = Yup.object().shape({
   name: Yup.string().required('Name is required'),
   dateStart: Yup.date().required('Start date is required'),
   dateEnd: Yup.date().required('End date is required'),
})

const EditTask = (props: Props) => {
   const initValues = {
      name: props.name,
      dateStart: dayjs(props.dateStart),
      dateEnd: dayjs(props.dateEnd),
   }

   return (
      <Popup open={props.open} handleClose={props.handleClose} title='Edit task'>
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
                     Save
                  </Button>
               </Form>
            )}
         </Formik>
      </Popup>
   )
}

export default EditTask

import { Box, Button, Container, CssBaseline, Grid, TextField, Typography, Link } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link as RouterLink } from 'react-router-dom'

const validationSchema = Yup.object().shape({
   email: Yup.string().email('Invalid email address').required('Email is required'),
   password: Yup.string().required('Password is required'),
})

export type FormValues = {
   email: string
   password: string
}

type Props = {
   handleSubmit: (values: FormValues) => Promise<void>
   buttonText: string
   error: string | undefined | any
   linkText: string
   linkTo: string
}

const AuthForm = (props: Props) => {
   const handleFormSubmit = async (values: FormValues) => {
      await props.handleSubmit(values)
   }

   return (
      <Container component='main' maxWidth='xs'>
         <CssBaseline />
         <Box
            sx={{
               marginTop: 8,
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
            }}
         >
            <Typography component='h1' variant='h5' sx={{ marginBottom: 3 }}>
               {props.buttonText}
            </Typography>
            <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
               {({ errors }) => (
                  <Form>
                     <Grid container spacing={2}>
                        <Grid item xs={12}>
                           <Field
                              name='email'
                              as={TextField}
                              label='Email'
                              fullWidth
                              error={!!errors.email || !!props.error}
                              helperText={props.error || <ErrorMessage name='email' />}
                           />
                        </Grid>
                        <Grid item xs={12}>
                           <Field
                              name='password'
                              as={TextField}
                              label='Password'
                              type='password'
                              fullWidth
                              error={!!errors.password}
                              helperText={<ErrorMessage name='password' />}
                           />
                        </Grid>
                     </Grid>
                     <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                        {props.buttonText}
                     </Button>
                     <Grid container justifyContent='center'>
                        <Grid item>
                           <RouterLink to={props.linkTo}>
                              <Link>{props.linkText}</Link>
                           </RouterLink>
                        </Grid>
                     </Grid>
                  </Form>
               )}
            </Formik>
         </Box>
      </Container>
   )
}

export default AuthForm

import { Box, Button, Container, CssBaseline, Grid, TextField, Typography, Link } from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

type FormProps = {
   handleSubmit: (email: string, password: string) => Promise<void>
   error: string | undefined
   buttonText: string
   linkText: string
   linkTo: string
}

const AuthForm = ({ handleSubmit, error, buttonText, linkText, linkTo }: FormProps): JSX.Element => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const navigate = useNavigate()
   // @ts-expect-error
   const { login } = useAuth()

   const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      await handleSubmit(email, password)
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
            <Typography component='h1' variant='h5'>
               {buttonText}
            </Typography>
            <Box component='form' noValidate onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <TextField
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        onChange={e => setEmail(e.target.value)}
                        error={!!error}
                        helperText={error}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='new-password'
                        onChange={e => setPassword(e.target.value)}
                     />
                  </Grid>
               </Grid>
               <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                  {buttonText}
               </Button>
               <Grid container justifyContent='center'>
                  <Grid item>
                     <RouterLink to={linkTo}>
                        <Link>{linkText}</Link>
                     </RouterLink>
                  </Grid>
               </Grid>
            </Box>
         </Box>
      </Container>
   )
}

export default AuthForm

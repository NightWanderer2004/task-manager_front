import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AuthProvider, useAuth } from './hooks/useAuth'

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' })
const authLink = new ApolloLink((operation, forward) => {
   const accessToken = localStorage.getItem('accessToken')
   operation.setContext({
      headers: {
         authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
   })

   return forward(operation)
})

const client = new ApolloClient({
   cache: new InMemoryCache(),
   link: authLink.concat(httpLink),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
   <React.StrictMode>
      <AuthProvider>
         <ApolloProvider client={client}>
            <BrowserRouter>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <App />
               </LocalizationProvider>
            </BrowserRouter>
         </ApolloProvider>
      </AuthProvider>
   </React.StrictMode>
)

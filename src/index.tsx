import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'

const client = new ApolloClient({
   cache: new InMemoryCache(),
   link: new HttpLink({
      uri: 'http://localhost:3000/graphql',
   }),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
   <React.StrictMode>
      <ApolloProvider client={client}>
         <BrowserRouter>
            <AuthProvider>
               <App />
            </AuthProvider>
         </BrowserRouter>
      </ApolloProvider>
   </React.StrictMode>
)

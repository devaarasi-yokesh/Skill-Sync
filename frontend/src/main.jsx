import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import {Auth0Provider} from '@auth0/auth0-react';

const domain = import.meta.env.AUTH0_DOMAIN;
const clientId = import.meta.env.AUTH0_CLIENT_ID;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <BrowserRouter>
    <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{
      redirect_uri: window.location.origin
    }}>
    <App />
    </Auth0Provider>
    </BrowserRouter>
   
  </StrictMode>,
)

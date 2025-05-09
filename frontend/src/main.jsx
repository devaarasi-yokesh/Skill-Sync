import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import {Auth0Provider} from '@auth0/auth0-react';
import {Provider} from './components/ui/provider.jsx';


const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUDIENCE;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <BrowserRouter>

        <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{
          redirect_uri: 'http://localhost:5174',
          audience:audience}}>

            <Provider>
              <App />
            </Provider>

        </Auth0Provider>
        
    </BrowserRouter>
   
  </StrictMode>,
)

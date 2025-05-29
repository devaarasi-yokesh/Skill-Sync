import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import {Auth0Provider} from '@auth0/auth0-react';
import {Provider} from './components/ui/provider.jsx';
import * as Sentry from '@sentry/react'


const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUDIENCE;

//Sentry
Sentry.init({
    dsn: "https://3c7577859a1f358f7cddade51eedc1c2@o4509320753709056.ingest.de.sentry.io/4509320943042640",
    sendDefaultPii: true
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    
    <BrowserRouter>

        {/* Authentication */}
        <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{
          redirect_uri: 'https://skill-sync-2bln.onrender.com',
          scope: 'openid profile email',
          audience:audience}}>

            {/* Chakra Provider */}
            <Provider>
              <App />
            </Provider>

        </Auth0Provider>
        
    </BrowserRouter>
   
  </StrictMode>,
)

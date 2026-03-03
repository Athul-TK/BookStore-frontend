import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './ContextAPI/ContextShare.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthContext from './ContextAPI/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    {/* wrap contextshare file with app */}
      <ContextShare>
        <GoogleOAuthProvider clientId="877187405579-b5emvqk0r5g8rfa9gir2v5bbd520goc4.apps.googleusercontent.com">
          <AuthContext><App /></AuthContext>
          </GoogleOAuthProvider>
      </ContextShare>
    </BrowserRouter>
  </StrictMode>,
)

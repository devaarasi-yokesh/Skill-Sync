import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LogoutButton = () => {
    const { logout } = useAuth0();
  return (
   <button onClick={() => logout({ logoutParams: { returnTo:'https://skill-sync-2bln.onrender.com' } })}> Log out</button>
  )
}

export default LogoutButton

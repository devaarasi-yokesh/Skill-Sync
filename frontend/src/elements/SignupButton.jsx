import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const SignupButton = () => {
    const { loginWithRedirect } = useAuth0();
    const handleSignUp = async () => {
        await loginWithRedirect({
          appState: {
            returnTo: "/",
          },
          authorizationParams: {
            screen_hint: "signup",
          },
        });
      };
  return (
    <button className="button__sign-up" onClick={handleSignUp}>
    Sign Up
  </button>
  )
}

export default SignupButton

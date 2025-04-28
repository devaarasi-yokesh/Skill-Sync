import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/react';

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
    <Button className="button__sign-up" onClick={handleSignUp}>
    Sign Up
  </Button>
  )
}

export default SignupButton

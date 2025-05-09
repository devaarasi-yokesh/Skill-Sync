import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './styles.css'
import HomePage from './Pages/HomePage'
import CreatePage from './Pages/CreatePage'
import NavBar from './elements/NavBar'
import Goals from './Pages/Goals'
import Profile from './Pages/Profile'
import LoginButton from './elements/LoginButton'
import SignupButton from './elements/SignupButton'
import LogoutButton from './elements/LogoutButton'
import {useAuth0} from '@auth0/auth0-react'
import { Center, Flex, Heading, Box } from '@chakra-ui/react'
function App() {

  const {loginWithRedirect,isAuthenticated,isLoading,user,error} = useAuth0();

  return (
    <>
    <Center>
    <Flex flexDirection='column' gap='14'>
      <Box>
        <Flex>
        <Center>
        <Heading size='5xl' fontWeight='bold'>Skill Sync</Heading>
        </Center>
{/*       
      {!isAuthenticated  && (
        <>
        <Flex flexDir='row' gap='6' marginTop='8' marginLeft='24'>
          <LoginButton/>
          <SignupButton/>
        </Flex>
        
        </>
      )}
      {isAuthenticated && (
        <LogoutButton/>
      )} */}
        </Flex>
       
      </Box>
      <Box>
      <Routes>
        <Route path='/' element={<HomePage/>}> </Route>
        <Route path='/create' element={<CreatePage/>}></Route>
        <Route path='/goals' element={<Goals />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
      </Routes>
      </Box>
      <Box>
      <NavBar></NavBar>
      </Box>
    </Flex>
    </Center>
    </>
  )
}

export default App

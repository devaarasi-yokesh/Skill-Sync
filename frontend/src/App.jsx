import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Hotjar from '@hotjar/browser'
import HomePage from './Pages/HomePage'
import CreatePage from './Pages/CreatePage'
import NavBar from './elements/NavBar'
import Goals from './Pages/Goals'
import Profile from './Pages/Profile'
import LoginButton from './elements/LoginButton'
import SignupButton from './elements/SignupButton'

import {useAuth0} from '@auth0/auth0-react'
import { Center, Flex, Heading, Box } from '@chakra-ui/react'
import LogoutButton from './elements/LogoutButton'
import SyncProfile from './elements/SyncProfile'

function App() {

  const {loginWithRedirect,isAuthenticated,isLoading,user,error} = useAuth0();

  // Initializing hotjar
  const siteId = 6401644;
  const hotjarVersion = 6;
  Hotjar.init(siteId, hotjarVersion)

  return (
    <>
    <Center>
    <Flex flexDirection='column' gap='14'>
      <Box>
        <Flex>
        <Center>
        <Heading size='5xl' fontWeight='bold'>Skill Sync</Heading>
        </Center>
      
      <SyncProfile/>
      {!isAuthenticated ? (
        <>
        <Flex flexDir='row' gap='6' marginTop='8' marginLeft='24'>
          <LoginButton/>
          <SignupButton/>
        </Flex>
        
        </>
      ): <LogoutButton/>}
      
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
   {/* <button onClick={() => {throw new Error("This is your first error!");}}>Break the world</button>; */}
    </Center>
    </>
  )
}

export default App

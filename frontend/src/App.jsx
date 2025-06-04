import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NavBar from './elements/NavBar'
import Goals from './pages/Goals'
import Profile from './pages/Profile'
import LoginButton from './elements/LoginButton'
import SignupButton from './elements/SignupButton'
import './styles.css'
import {useAuth0} from '@auth0/auth0-react'
import { Center, Flex, Heading, Box } from '@chakra-ui/react'
import LogoutButton from './elements/LogoutButton'
import SyncProfile from './elements/SyncProfile'

function App() {

  const {loginWithRedirect,isAuthenticated,isLoading,user,error} = useAuth0();

  // // Initializing hotjar
  // const siteId = 6401644;
  // const hotjarVersion = 6;
  // Hotjar.init(siteId, hotjarVersion)

  return (
    <>
    <Box 
  bg="var(--background)" 
  minH="100vh" 
  p={4}
  fontFamily="'Inter', sans-serif"
>
  <Flex 
    flexDirection='column' 
    gap='14' 
    width="100%" 
    maxWidth="1200px"
  >
    {/* Header Section */}
    <Box 
      position="sticky" 
      top="0" 
      zIndex="100"
      bg="var(--card)" 
      py={4}
      borderRadius="8px"
      boxShadow="0 2px 10px rgba(0,0,0,0.05)"
    >
      <Flex 
        justifyContent="space-between" 
        alignItems="center"
        px={6}
      >
        <Center>
          <Heading 
            size='2xl' 
            fontWeight='bold'
            color="var(--secondary)"
            fontFamily="'Poppins', sans-serif"
          >
            Skill Sync
          </Heading>
        </Center>
        
        <Flex alignItems="center" gap={6}>
          <SyncProfile/>
          {!isAuthenticated ? (
            <Flex flexDir='row' gap='4'>
              <LoginButton 
                bg="var(--primary)" 
                color="white"
                _hover={{ bg: "var(--secondary)" }}
                borderRadius="6px"
                px={6}
                py={3}
                fontWeight="500"
              />
              <SignupButton 
                bg="transparent"
                color="var(--primary)"
                border="2px solid var(--primary)"
                _hover={{ bg: "rgba(67, 97, 238, 0.1)" }}
                borderRadius="6px"
                px={6}
                py={3}
                fontWeight="500"
              />
            </Flex>
          ) : (
            <LogoutButton 
              bg="transparent"
              color="var(--primary)"
              border="2px solid var(--primary)"
              _hover={{ bg: "rgba(67, 97, 238, 0.1)" }}
              borderRadius="6px"
              px={6}
              py={3}
              fontWeight="500"
            />
          )}
        </Flex>
      </Flex>
    </Box>

    {/* Main Content */}
    <Box 
      bg="var(--card)" 
      borderRadius="8px" 
      boxShadow="0 4px 6px rgba(0,0,0,0.05)"
      p={8}
      minH="60vh"
    >
      <Routes>
        <Route 
          path='/' 
          element={<HomePage/>} 
          className="nav-link"
        />
        <Route path='/create' element={<CreatePage/>} />
        <Route path='/goals' element={<Goals />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Box>

    {/* Navigation Bar */}
    <Box 
      bg="var(--card)" 
      borderRadius="8px" 
      boxShadow="0 4px 6px rgba(0,0,0,0.05)"
      py={4}
    >
      <NavBar 
        bg="transparent"
        colorScheme="var(--primary)"
      />
    </Box>
  </Flex>
</Box>
    </>
  )
}

export default App

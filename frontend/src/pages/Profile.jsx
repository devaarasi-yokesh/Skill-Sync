import { Center,Box,Image,Text, Flex, Button } from '@chakra-ui/react'
import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import LogoutButton from '../elements/LogoutButton'

function Profile() {


const {loginWithRedirect,isAuthenticated,getAccessTokenSilently} = useAuth0();

const callApi = async() =>{
  const token = await getAccessTokenSilently();
  const res = await fetch('http://localhost:3000/protected', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await res.json();
  console.log(data)
}

  return (
    <Box marginTop={4.5}>
        <Center>
        <Flex flexDir={'column'} gap={4.5}>
        <Image src='https://img.freepik.com/free-photo/portrait-smiling-blonde-woman_23-2148316635.jpg?semt=ais_hybrid&w=740' boxSize='140px' borderRadius='full' fit='cover' alt='user_image'></Image>
        <Box>
        <Text fontSize={'2xl'} textAlign={'center'} color={'blue.400'} fontWeight={'bolder'}>Emila Santos</Text>
        <Text>emila02@gmail.com</Text>
        </Box>
        </Flex>
        </Center>
        
        <Box display={'flex'} flexDir={'column'} alignItems='start' width={'inherit'} gap={4.5} marginTop={8} fontSize={'xl'}>
            <button>Change Password</button>
            <button>Edit User Details</button>
            <button>Delete Account</button>
            <button>Settings</button>
            <button>Sign-out</button>
            {isAuthenticated && (
        <>
        {/* <LogoutButton/> */}
        <button onClick={callApi}>Call API</button>
        </>
      )}
        </Box>
    </Box>
  )
}

export default Profile

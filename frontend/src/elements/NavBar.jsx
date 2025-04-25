import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
      <Flex flexDir='row' gap='28' fontWeight='bold' fontSize='2xl'>
      <Link to='/'>Dashboard</Link>
      <Link to='/create'>Create</Link>
      <Link to='/goals'>Goals</Link>
      </Flex>
     
    </div>
  )
}

export default NavBar

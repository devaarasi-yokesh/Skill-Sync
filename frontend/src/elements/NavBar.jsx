import { Flex } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {

    const linkStyle = {
    padding: '12px', // equivalent to p={3}
    color: 'var(--text-medium)',
    borderBottom: '2px solid transparent',
    textDecoration: 'none',
  };

  const activeStyle = {
    color: 'var(--primary)',
    borderBottom: '2px solid var(--primary)',
  };

  return (
    <div>
      <Flex flexDir='row' gap='28' fontWeight='bold' fontSize='2xl'>
             <NavLink
                to="/"
                style={({ isActive }) =>
                isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>Dashboard
              </NavLink>


              <NavLink
                  to="/create"
                  style={({ isActive }) =>
                    isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                  }
                >
                  Create
              </NavLink>

              <NavLink
                to="/goals"
                style={({ isActive }) =>
                  isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                }
              >
                Goals
              </NavLink>


              <NavLink
                to="/profile"
                style={({ isActive }) =>
                  isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                }
              >
                Profile
              </NavLink>
      </Flex>
     
    </div>
  )
}

export default NavBar

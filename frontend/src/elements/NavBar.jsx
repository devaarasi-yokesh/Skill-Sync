import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
      <ul className='inline-flex text-4xl mx-64'>
        <li className='m-3 p-5'><Link to='/'>Dashboard</Link></li>
        <li className='m-3 p-5'><Link to='/create'>Create</Link></li>
        <li className='m-3 p-5'><Link to='/goals'>Goals</Link></li>
      </ul>
    </div>
  )
}

export default NavBar

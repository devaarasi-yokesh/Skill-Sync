import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './styles.css'
import HomePage from './Pages/HomePage'
import CreatePage from './Pages/CreatePage'
import NavBar from './elements/NavBar'
import Goals from './Pages/Goals'
import LoginButton from './elements/LoginButton'
import SignupButton from './elements/SignupButton'
import LogoutButton from './elements/LogoutButton'
import {useAuth0} from '@auth0/auth0-react'
function App() {

  const {loginWithRedirect,isAuthenticated,isLoading,user,error} = useAuth0();

  return (
    <>
    <div className='max-w-3xl'>
      <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-semibold tracking-tight text-gray-800'>Skill Sync</h1>
      {!isAuthenticated  && (
        <>
        <LoginButton/>
        <SignupButton/>
        </>
      )}
      {isAuthenticated && (
        <LogoutButton/>
      )}
      <Routes>
        <Route path='/' element={<HomePage/>}> </Route>
        <Route path='/create' element={<CreatePage/>}></Route>
        <Route path='/goals' element={<Goals />}></Route>
      </Routes>
      <NavBar></NavBar>
    </div>
    </>
  )
}

export default App

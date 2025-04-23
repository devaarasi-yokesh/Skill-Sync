import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './styles.css'
import HomePage from './Pages/HomePage'
import CreatePage from './Pages/CreatePage'
import NavBar from './elements/NavBar'
import Goals from './Pages/Goals'
import LoginButton from './pages/LoginButton'

function App() {

  const handleGoals = () => {
    console.log("works")
  }

  return (
    <>
    <div className='max-w-3xl'>
      <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-semibold tracking-tight text-gray-800'>Skill Sync</h1>
    <LoginButton/>
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

import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './styles.css'
import HomePage from './Pages/HomePage'
import CreatePage from './Pages/CreatePage'
import NavBar from './elements/NavBar'
import Goals from './Pages/Goals'

function App() {

  const handleGoals = () => {
    console.log("works")
  }

  return (
    <>
      <h1 className='text-center text-5xl font-bold'>Skill Sync</h1>
      <Routes>
        <Route path='/' element={<HomePage/>}> </Route>
        <Route path='/create' element={<CreatePage/>}></Route>
        <Route path='/goals' element={<Goals />}></Route>
      </Routes>
      <NavBar></NavBar>
    </>
  )
}

export default App

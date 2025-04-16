import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './styles.css'
import HomePage from './Pages/HomePage'
import CreatePage from './Pages/CreatePage'

function App() {


  return (
    <>
      <h1 className='text-center text-5xl font-bold'>Skill Sync</h1>
      <Routes>
        <Route path='/' element={<HomePage/>}> </Route>
        <Route path='/create' element={<CreatePage/>}></Route>
      </Routes>
    </>
  )
}

export default App

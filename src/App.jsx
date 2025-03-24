import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'

const App = () => {
  return (
    <div className='w-full mx-auto'>
      <header className='sticky top-0'>
        <Navbar />
      </header>
      <main className=''>
        <Home/>
      </main>
    </div>
  )
}

export default App

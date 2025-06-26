import { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import InteractiveBackground from './components/common/InteractiveBackground/InteractiveBackground'
import Home from './pages/Home/Home'
import Drafter from './pages/Drafter/Drafter'

function App() {

  useEffect(() => {
    document.body.classList.add('dark')
  })

  return (
    <>
    <BrowserRouter>
      <Routes>
        
        <Route 
        path="/" element={<Home />}
        />

        <Route 
        path="/draft/:id" element={<Drafter />}
        />

      </Routes>
    </BrowserRouter>
    <InteractiveBackground />
    </>
  )
}

export default App

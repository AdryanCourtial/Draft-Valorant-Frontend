import { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import InteractiveBackground from './components/InteractiveBackground/InteractiveBackground'
import Home from './pages/Home/Home'

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

      </Routes>
    </BrowserRouter>
    <InteractiveBackground />
    </>
  )
}

export default App

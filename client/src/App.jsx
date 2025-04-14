import React from 'react'
import { BrowserRouter as Router,Routes, Route, Link, BrowserRouter } from 'react-router-dom'
import Nav from './components/Navbar/Nav'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Nav />
    </BrowserRouter>
    </div>
  )
}

export default App
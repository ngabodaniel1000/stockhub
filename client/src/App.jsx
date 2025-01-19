import React from 'react'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
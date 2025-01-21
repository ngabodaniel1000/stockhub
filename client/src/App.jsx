import React from 'react'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'
import Login from './components/Accounts/Login'
import Dashboard from './components/Dashboard'
import ManagerLogin from './components/Accounts/ManagerLogin'


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/managerlogin" element={<ManagerLogin />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
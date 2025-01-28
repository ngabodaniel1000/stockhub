import React from 'react'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'
import Login from './components/Accounts/Admin/Login'
import Dashboard from './components/Pages/Dashboard.jsx'
import ManagerLogin from './components/Accounts/Manager/ManagerLogin'
import { Profiler } from 'react'
import Profile from './components/Pages/Profile.jsx'


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/managerlogin" element={<ManagerLogin />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
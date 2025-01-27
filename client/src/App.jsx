import React from 'react'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'
import Login from './components/Accounts/Admin/Login'
import Dashboard from './components/Pages/Admin/Dashboard.jsx'
import ManagerLogin from './components/Accounts/Manager/ManagerLogin'
import ManagerDashboard from "./components/Pages/Manager/Dashboard.jsx"


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admindashboard" element={<Dashboard />} />
          <Route path="/managerdashboard" element={<ManagerDashboard />} />
          <Route path="/managerlogin" element={<ManagerLogin />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
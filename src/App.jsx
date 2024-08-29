import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Dashboard from './Dashboard'

import './App.css'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

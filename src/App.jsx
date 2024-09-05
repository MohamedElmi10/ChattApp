import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Chat from './Chat'
import ProtectedRoute from './ProtectedRoute'

import './App.css'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/Chat' element={<Chat />} />
          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// import {Typography} from '@mui/material'

import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

export const App = (): JSX.Element => {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />

          <Routes>
            <Route path='/' element={<Dashboard />} />

            <Route path='/login' element={<Login />} />

            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>

      {/*<Typography variant='h1' gutterBottom>*/}
      {/*  h1. Heading*/}
      {/*</Typography>*/}

      <ToastContainer />
    </>
  )
}

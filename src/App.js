import React, { Component, Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes, useNavigate } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import './scss/style.scss'
import useMeasurementService from './services/measurementsServices'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./Pages/Login.js'))
const Register = React.lazy(() => import('./Pages/Register'))

function App() {
  const navigate = useNavigate()

 
  /* useEffect(() => {
    localStorage.getItem('token') == null && navigate('/login')
  }, [user]) */
  return (
    <Suspense fallback={loading}>
      <Routes>
        <Route exact path="/login" name="Login Page" element={<Login />} />
        <Route exact path="/register" name="Register Page" element={<Register />} />
        <Route element={<PrivateRoutes></PrivateRoutes>}>
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App

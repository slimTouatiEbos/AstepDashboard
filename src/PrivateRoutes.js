import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutes() {
  if (!localStorage.getItem('user')) {
    return <Navigate to={'/login'}></Navigate>
  } else {
    return <Outlet></Outlet>
  }
}

export default PrivateRoutes

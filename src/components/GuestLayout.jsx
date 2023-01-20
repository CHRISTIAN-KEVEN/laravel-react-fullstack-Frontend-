import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const GuestLayout = () => {

  const {user, token} = useAuthContext();
  console.log('Token ', token);
  if(token) {
    console.log('Token ', token);
    return <Navigate to="/users" />
  }
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default GuestLayout
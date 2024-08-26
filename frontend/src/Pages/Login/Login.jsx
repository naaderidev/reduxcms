import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Login() {
  return (
    <div className="bg-login-baner baner flex-center h-screen opacity-90">
      <Outlet />
    </div>
  )
}

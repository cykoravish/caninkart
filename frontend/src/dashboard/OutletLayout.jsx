import React from 'react'
import { Outlet } from 'react-router-dom'
import DasNavbar from './dasNavbar'

const DashboardLayout = () => {
  return (
    <>
    <DasNavbar/>
    <Outlet/>
    </>
  )
}

export default DashboardLayout
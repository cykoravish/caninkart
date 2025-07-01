import React from 'react'
import { Outlet } from 'react-router-dom'
import DasNavbar from './dasNavbar'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const DashboardLayout = () => {
  return (
    <>
    <DasNavbar/>
    <Outlet/>
    <ToastContainer position="top-right" autoClose={1000} />

    </>
  )
}

export default DashboardLayout
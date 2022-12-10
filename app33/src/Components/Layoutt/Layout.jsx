import React from 'react'
import { Outlet,useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'




export default function Layout({userData,setuserData}) {

  let LogoutNavigator= useNavigate()

  function logout() {
  
          localStorage.removeItem(`userToken`)
          setuserData(null)
          LogoutNavigator('/Login')
  }

return <>
  
  <Navbar logout={logout} userData={userData} />
    <Outlet></Outlet>
  </>
}
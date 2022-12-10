import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './Components/Layoutt/Layout';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import Platforms from './Components/Platforms/Platforms';
import Sortby from './Components/Sortby/Sortby';
import Login from './Components/Login/Login';
import Categories from './Components/Categories/Categories';
import All from './Components/All/All';
import GameDetails from './Components/GameDetails/GameDetails';
import { useState } from 'react';
import { useEffect } from 'react';
import  jwtDecode from "jwt-decode";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Notfound from './Components/Notfound/Notfound';
import { Online,Offline } from "react-detect-offline";

export default function App() {

  useEffect(
    ()=>{ 
      if(localStorage.getItem('userToken')!==null)
      {
        saveUserData()
      }
    },[]
  )
  
    
    const [userData, setuserData] = useState(null)
  
    function saveUserData() {
      let encodedToken= localStorage.getItem('userToken');
      let decodedToken= jwtDecode(encodedToken);
      // console.log(decodedToken);
      setuserData(decodedToken);
  
    }

  let routers= createBrowserRouter( [
    {path:'/',element:<Layout setuserData={setuserData}  userData={userData} />,
    errorElement: <Notfound/> ,
    children:[
      {index:true,element:<ProtectedRoute userData={userData}><Home/></ProtectedRoute> },
      {path:'Platform/:platform',element:<ProtectedRoute userData={userData}><Platforms/></ProtectedRoute>},
      {path:'All',element:<ProtectedRoute userData={userData}><All/></ProtectedRoute>},
      {path:'Sortby/:sortby',element:<ProtectedRoute userData={userData}><Sortby/></ProtectedRoute>},
      {path:'Categories/:genre',element:<ProtectedRoute userData={userData}><Categories/></ProtectedRoute>},
      {path:'GameDetails/:id',element:<ProtectedRoute userData={userData}><GameDetails/></ProtectedRoute>},

      {path:'Login',element:<Login  saveUserData={saveUserData}/>},
      {path:'Register',element:<Register/>},
    ]}
  ] )




  return <>
<Online>
      <RouterProvider router={routers} />
</Online>
<Offline>
<div className="alert alert-danger text-center fixed-bottom">
You are now offline, Please reconnect your internet again
  </div>
</Offline>

  </>
}

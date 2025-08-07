import React, { useState } from 'react'
import './style.scss'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import {Login,Write,Register,SinglePost,Home} from './pages/index.js'
import Layout from './Layout.jsx'


const router =createBrowserRouter([
  {
    path:'/',
    element:<Layout />,
    children:[
      {
        path:'',
        element:<Home />
      },
      {
        path:'/post/:id',
        element:<SinglePost />
      },
      {
        path:'/write',
        element:<Write />
      }
    ]
  },
  {
    path:'/login',
    element:<Login />
  },
  {
    path:'register',
    element:<Register />
  },
]);

function App() {

  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
   
  )
}

export default App

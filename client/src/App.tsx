import React from 'react'
import { createHashRouter, Link, RouterProvider } from 'react-router-dom'
import FarmerContext from './Context/FarmerContext'
import { About } from './pages/About'
import Counter from './pages/Counter'
import Home from './pages/Home'
import { Login } from './pages/Login'
import Print from './pages/Print'
import { Profile } from './pages/Profile'
import { Register } from './pages/Register'

import "react-toastify/dist/ReactToastify.css";
import { ForgotPassword } from './pages/ForgotPassword'
import { AdminLogin } from './pages/Admin.Login'
import AllFarmers from './pages/AllFarmers'

const App = () => {
  const router = createHashRouter(
    [
      {
        path: '/',
        element: <Login />

      },
      {
        path: '/admin/login',
        element: <AdminLogin/>

      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/counter',
        element: <Counter />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/register',
        element: <Register />

      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />

      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/admin/farmer/all',
        element: <AllFarmers />
      }

    ]
  )
  return (
    <FarmerContext>

      <div
        className='min-h-screen w-screen flex flex-row'
      >
        <RouterProvider
          router={router}
        />

      </div>
    </FarmerContext>
  )
}

export default App
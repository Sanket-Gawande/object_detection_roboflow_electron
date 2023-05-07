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

const App = () => {
  const router = createHashRouter(
    [
      {
        path: '/',
        element: <Login />

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
        path: '/home',
        element: <Home />
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
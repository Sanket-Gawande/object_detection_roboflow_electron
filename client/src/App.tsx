import React from 'react'
import { createHashRouter, Link, RouterProvider } from 'react-router-dom'
import { About } from './pages/About'
import Counter from './pages/Counter'
import Home from './pages/Home'
import Print from './pages/Print'

const App = () => {
  const router = createHashRouter(
    [
      {
        path: '/',
        element: <Home />
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
        path: '/print',
        element: <Print />
      }

    ]
  )
  return (
    <div
      className='h-screen w-screen flex flex-row'
    >
      <RouterProvider
        router={router}
      />

    </div>
  )
}

export default App
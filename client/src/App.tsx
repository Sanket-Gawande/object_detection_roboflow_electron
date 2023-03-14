import React from 'react'
import { createHashRouter, Link, RouterProvider } from 'react-router-dom'
import { About } from './pages/About'
import Counter from './pages/Counter'
import Home from './pages/Home'

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
      }

    ]
  )
  return (
    <div
      className='h-screen w-screen flex flex-row bg-dark2'
    >
      <RouterProvider
        router={router}
      />

    </div>
  )
}

export default App
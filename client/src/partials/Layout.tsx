import React, { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className='w-full'>
      <header className='bg-dark flex justify-between px-8 py-4 md:py-6 text-lg md:text-xl w-full shadow-lg fixed'>
        <NavLink
        to={'/'}
        className='text-slate-200 font-semibold'
        >
          Logger Drones
        </NavLink>

        <nav className='space-x-4 text-slate-400'>
          <NavLink
          className='hover:text-sky-200'
            to={'/'}
          >
            Home
          </NavLink>
          <NavLink
          className='hover:text-sky-200'
            to={'/about'}
          >
            About
          </NavLink>
          <NavLink
          className='hover:text-sky-200'
            to={'/counter'}
          >
            Count plants
          </NavLink>
        </nav>
      </header>
      {children}
    </main>
  )
}

export default Layout
import { farmerContext } from '@/Context/FarmerContext'
import React, { ReactNode, useContext } from 'react'
import { NavLink, useHref, useNavigate, useParams, useRoutes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { farmer, setFarmer } = useContext(farmerContext);
  const navigate = useNavigate();

  React.useEffect(() => {
  }, [])

  return (
    <main className='w-full h-full overflow-y-auto'>
      <ToastContainer position='top-right' />
      <section
        className='fixed bg-sky-700 text-xl  sm:text-4xl font-semibold text-white lg:hidden z-50 inset-0 grid place-items-center h-screen w-full '
      >
        Please resize screen to 900x900 atlest
      </section>
      <header className='bg-slate-900 fixed z-[5] flex justify-between px-8 py-4 md:py-6 text-xl md:text-2xl w-full shadow-lg'>
        <NavLink
          to={'/home'}
          className='text-slate-200 font-semibold'
        >
          Logger Drones
        </NavLink>

        <nav className='space-x-4 text-slate-400'>
          <NavLink
            className='hover:text-sky-200'
            to={'/home'}
          >
            Home
          </NavLink>
          <NavLink
            className='hover:text-sky-200'
            to={'/about'}
          >
            About
          </NavLink>
          {
            farmer?._id
              ? <>
                <NavLink
                  className='hover:text-sky-200'
                  to={'/profile'}
                >
                  Profile
                </NavLink>
                <NavLink
                  className='hover:text-sky-200'
                  to={'/counter'}
                >
                  Count plants
                </NavLink>
              </>
              : <>
                <NavLink
                  className='hover:text-sky-200'
                  to={'/'}
                >
                  Login
                </NavLink>
              </>
          }






        </nav>

      </header>
      {children}
    </main>
  )
}

export default Layout
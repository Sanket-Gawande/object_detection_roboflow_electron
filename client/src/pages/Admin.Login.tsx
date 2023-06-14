import { farmerContext } from '@/Context/FarmerContext'
import Layout from '@/partials/Layout';
import extractFormData from '@/utils/extractFormData';
import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
export const AdminLogin = () => {
  const [loading, setLoading] = React.useState(false);
  const { farmer, setFarmer } = useContext(farmerContext);
  const location = useLocation()
  const navigate = useNavigate()

  async function handleForm(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true)
    const payload = extractFormData(e.target);
    // setFarmer(payload)
    const path = import.meta.env.VITE_BASE_URL + '/api/admin/get-in';
    try {
      const req = await fetch(path, {
        method: 'post',
        body: JSON.stringify(payload),
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include'
      });
      const res = await req.json();
      console.log(res)
      if (res.error) {
        toast(res.message, { type: 'error' });
        setLoading(false)
        return
      }
      if (!res.error) {
        toast(res.message, { type: 'success' });
        console.log(res.farmer);
        setLoading(false);
        setFarmer(res.data);
        localStorage.setItem('user', JSON.stringify(res?.data))
        navigate('/home')
        return
      }
    } catch (error) {

      toast('Something went wrong, try again', { type: 'error' })
      setLoading(false)

    }

  }

  return (

    <main
      className='w-full p-8'
    >

      <ToastContainer position='top-right' />
      <section className='w-11/12 max-w-[600px] shadow-2xl border-slate-600 p-8 rounded-xl bg-slate-900/30 border mx-auto mt-24 text-md'>
        <form
          onSubmit={handleForm}
          className='space-y-6'
        >
          <h4
            className='pb-5 text-2xl font-bold text-white'
          >
            Admin login.
          </h4>

          <main
            className='space-y-8'
          >

            <div
              className='flex flex-col text-slate-200 text-xl'
            >
              <label htmlFor="email">
                Enter email
              </label>
              <input
                required
                defaultValue={farmer?.email}
                className='rounded-md py-2 px-4 bg-transparent border'
                type="text" placeholder='name@domain.com' name='email' />
            </div>


            <div
              className='flex flex-col text-slate-100 text-xl'
            >
              <label htmlFor="email">
                Password
              </label>
              <input
                required
                defaultValue={farmer?.area}
                className='rounded-md py-2 px-4 bg-transparent border'
                type="password" placeholder='*******' name='password' />
            </div>

          </main>
          <button
            className='rounded-full px-6 py-3 bg-sky-600 text-white text-xl hover:scale-[.99] transform transition-all hover:bg-sky-700'
          >
            {
              loading
                ? 'Please wait...'
                : 'Login'
            }
          </button>

        </form>
      </section>
      <Link
        className='absolute bottom-4 right-4'
        to={'/admin/login'}
      >
        Admin login
      </Link>
    </main>

  )
}

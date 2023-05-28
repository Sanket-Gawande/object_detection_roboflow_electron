import { farmerContext } from '@/Context/FarmerContext'
import Layout from '@/partials/Layout';
import extractFormData from '@/utils/extractFormData';
import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
export const ForgotPassword = () => {
  const [loading, setLoading] = React.useState(false);
  const { farmer, setFarmer } = useContext(farmerContext);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [showOTP, setShowOTP] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  async function handle_sendotp() {
    setLoading(true)
    if (!email) {
      toast('Plese enter email')
      return
    }
    const path = import.meta.env.VITE_BASE_URL + '/api/farmer/forgot-password-request';
    try {
      const req = await fetch(path, {
        method: 'post',
        body: JSON.stringify({ email }),
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
        setShowOTP(true)

        return
      }
    } catch (error) {

      toast('Something went wrong, try again', { type: 'error' })
      setLoading(false)

    }

  }

  async function handle_verifyotp() {
    setLoading(true)
    if (!email || !otp) {
      toast('Plese enter email and otp')
      return
    }
    const path = import.meta.env.VITE_BASE_URL + '/api/farmer/forgot-password';
    try {
      const req = await fetch(path, {
        method: 'post',
        body: JSON.stringify({ email , otp, password}),
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
        setShowOTP(true)

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
        <div
          className='space-y-6'
        >
          <h4
            className='pb-5 text-2xl font-bold text-white'
          >
            Forgot password.
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
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                className='rounded-md py-2 px-4 bg-transparent border'
                type="text" placeholder='name@domain.com' name='email' />
            </div>


            <div
              style={{
                display: showOTP ? 'flex' : 'none'
              }}
              className='flex flex-col text-slate-200 text-xl'
            >
              <label htmlFor="email">
                Enter otp
              </label>
              <input
                required
                defaultValue={otp}
                onChange={(e) => setOtp(e.target.value)}
                className='rounded-md py-2 px-4 bg-transparent border'
                type="text" placeholder='*******' name='password' />
            </div>
            <div
              style={{
                display: showOTP ? 'flex' : 'none'
              }}
              className='flex flex-col text-slate-200 text-xl'
            >
              <label htmlFor="email">
                Enter new Password
              </label>
              <input
                required
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
                className='rounded-md py-2 px-4 bg-transparent border'
                type="password" placeholder='*******' name='password' />
            </div>

          </main>
          {


            !otp
              ? <button
                type='button'
                onClick={handle_sendotp}
                className='rounded-full px-6 py-3 bg-sky-600 text-white text-xl hover:scale-[.99] transform transition-all hover:bg-sky-700'
              >
                {
                  loading
                    ? 'Please wait...'
                    : 'Send otp'
                }
              </button>
              : <button
                type='button'
                onClick={handle_verifyotp}
                className='rounded-full px-6 py-3 bg-sky-600 text-white text-xl hover:scale-[.99] transform transition-all hover:bg-sky-700'
              >
                {
                  loading
                    ? 'Please wait...'
                    : 'Verify otp'
                }
              </button>
          }
          <p
            className='text-slate-300 text-lg text-right pt-4'
          >
            Don't have an account,
            <Link
              className='text-sky-600 ml-1 underline'
              to={'/register'}>
              Sign-up here</Link>
          </p>
          <p
            className='text-slate-300 text-lg text-right pt-4'
          >
            Already have an account,
            <Link
              className='text-sky-600 ml-1 underline'
              to={'/'}>
              Login here</Link>
          </p>
        </div>
      </section>
    </main>

  )
}

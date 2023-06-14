import { farmerContext } from '@/Context/FarmerContext'
import Layout from '@/partials/Layout';
import extractFormData from '@/utils/extractFormData';
import React, { ChangeEvent, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export const Register = () => {
  const [loading, setLoading] = React.useState(false)
  const farmer = {
    email: '',
    area: '',
    survey_no: '',
    name: '',
    phone: ''
  }
  const [showotp, setshwootp] = useState(false);
  const [otp, setotp] = useState('');
  const [email, setEmail] = useState('')
  async function handleForm(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true)
    const payload = extractFormData(e.target);
    // setFarmer(payload)
    const path = import.meta.env.VITE_BASE_URL + '/api/farmer';
    try {
      const req = await fetch(path, {
        method: 'post',
        body: JSON.stringify({ payload }),
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include'
      });
      const res = await req.json();
      console.log(res)
      if (!res.success) {
        toast(res.message, { type: 'error' });
        return
        setLoading(false)
      }
      if (res.success) {
        toast(res.message, { type: 'success' })
        setshwootp(true)
        setLoading(false)
      }
    } catch (error) {

      toast('Something went wrong, try again', { type: 'error' })
      setLoading(false)

    }

  }


  async function verify_account(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true)
    const payload = { otp, email }
    const path = import.meta.env.VITE_BASE_URL + '/api/farmer/verify';
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
      setLoading(false)
      if (!res.error) {
        toast.success(res.message)

        return
      }
      toast.error(res.message)
    } catch {
      toast.error('Something went wrong')
      setLoading(false)
    }
  }
  return (

    <main
      className='w-full  h-screen grid place-items-center'
    >
      <ToastContainer

        position='top-right'
      />
      <section className='w-11/12 max-w-[600px] shadow-2xl border-slate-600 p-8 rounded-xl bg-slate-900/30 border mx-auto  text-md'>
        <form
          style={{
            display: showotp ? 'none' : 'block'
          }}
          onSubmit={handleForm}
          className='space-y-6'
        >
          <h4
            className='pb-5 text-2xl font-bold text-white'
          >
            Farmer registration.
          </h4>
          <div
            className='flex flex-col text-slate-200 text-xl'
          >
            <label htmlFor="name">
              Full name
            </label>
            <input
              required
              className='rounded-md py-2 px-4 bg-transparent border'
              defaultValue={farmer?.name}
              type="text" placeholder='Sanket Gawande' name='name' />
          </div>

          <div
            className='flex flex-col text-slate-200 text-xl'
          >
            <label htmlFor="phone">
              Phone number
            </label>
            <input
              required
              defaultValue={farmer?.phone}
              className='rounded-md py-2 px-4 bg-transparent border'
              type="text" placeholder='+91 1212121212' name='phone' />
          </div>

          <div
            className='flex flex-col text-slate-200 text-xl'
          >
            <label htmlFor="email">
              Enter email
            </label>
            <input
              required
              defaultValue={farmer?.email}
              onChange={e => setEmail(e.target.value)}
              className='rounded-md py-2 px-4 bg-transparent border'
              type="text" placeholder='name@domain.com' name='email' />
          </div>

          <div
            className='flex flex-col text-slate-200 text-xl'
          >
            <label htmlFor="sur">
              Survey number
            </label>
            <input
              required
              defaultValue={farmer?.survey_no}
              className='rounded-md py-2 px-4 bg-transparent border'
              type="text" placeholder='abc/d' name='survey_no' />
          </div>

          <div
            className='flex flex-col text-slate-200 text-xl'
          >
            <label htmlFor="email">
              Farm Area (in Hector)
            </label>
            <input
              required
              defaultValue={farmer?.area}
              className='rounded-md py-2 px-4 bg-transparent border'
              type="text" placeholder='00' name='area' min={0} />
          </div>

          <div
            className='flex flex-col text-slate-200 text-xl'
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

          <p
            className='text-slate-300 text-lg text-right pt-4'
          >
            Already registered,
            <Link
              className='text-sky-600 ml-1 underline'
              to={'/'}>
              Login here</Link>
          </p>
          <button
            disabled={loading}
            className='rounded-full px-6 py-3 bg-sky-600 text-white text-xl hover:scale-[.99] transform transition-all hover:bg-sky-700'
          >
            {
              loading
                ? 'Please wait...'
                : 'Register'
            }
          </button>

        </form>
        {/*  otp verification form */}
        <form
          style={{
            display: !showotp ? 'none' : 'block'
          }}
          className='space-y-8'
          onSubmit={verify_account}
        >
          <div
            className='flex flex-col text-slate-200 text-xl'
          >
            <label htmlFor="email">
              Email
            </label>
            <input
              required
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              className='rounded-md py-2 px-4 bg-transparent border'
              type="email" placeholder='Your email' name='password' />
          </div>
          <div
            className='flex flex-col text-slate-200 text-xl'
          >
            <label htmlFor="email">
              Enter otp
            </label>
            <input
              required
              defaultValue={otp}
              onChange={e => setotp(e.target.value)}
              className='rounded-md py-2 px-4 bg-transparent border'
              type="password" placeholder='*******' name='password' />
          </div>
          <button
            disabled={loading}
            className='rounded-full px-6 py-3 bg-sky-600 text-white text-xl hover:scale-[.99] transform transition-all hover:bg-sky-700'
          >
            {
              loading
                ? 'Please wait...'
                : 'Verify otp'
            }
          </button>
        </form>
      </section>
      <div >
        <Link className='text-lg  px-4  text-white' to={'/'}>
          Login</Link>
        <button onClick={() => setshwootp(false)} className='text-lg  px-4  text-white'>
          Reset form
        </button>
      </div>
    </main>

  )
}

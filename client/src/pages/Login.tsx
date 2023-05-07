import { farmerContext } from '@/Context/FarmerContext'
import Layout from '@/partials/Layout';
import extractFormData from '@/utils/extractFormData';
import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
export const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const { farmer, setFarmer } = useContext(farmerContext);
  const location = useLocation()
  const navigate = useNavigate()

  async function handleForm(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true)
    const payload = extractFormData(e.target);
    // setFarmer(payload)
    const path = import.meta.env.VITE_BASE_URL + '/api/login';
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
        setLoading(false)
        return
      }
      if (res.success) {
        toast(res.message, { type: 'success' });
        console.log(res.farmer);
        setLoading(false);
        setFarmer(res.farmer);
        localStorage.setItem('farmer', JSON.stringify(res?.farmer))
        navigate('/home')
        return
      }
    } catch (error) {

      toast('Something went wrong, try again', { type: 'error' })
      setLoading(false)

    }

  }



  // check if already logged in
  React.useEffect(() => {
    // let frmr;
    // if (!frmr) {
    //   frmr = JSON.parse(localStorage.getItem('farmer') as string)
    //   console.log(frmr)
    //   setFarmer(frmr);
    //   navigate('/home')
    // }
  }, [])
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
            Login here.
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
          <p
            className='text-slate-300 text-lg text-right pt-4'
          >
            Don't have an account,
            <Link
              className='text-sky-600 ml-1 underline'
              to={'/register'}>
              Sign-up here</Link>
          </p>
        </form>
      </section>
    </main>

  )
}

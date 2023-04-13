import { farmerContext } from '@/Context/FarmerContext'
import Layout from '@/partials/Layout';
import extractFormData from '@/utils/extractFormData';
import React, { useContext } from 'react'

export const Login = () => {
  const farmer = {}

  async function handleForm(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = extractFormData(e.target);
    // setFarmer(payload)
  }
  return (
    <Layout>
      <main
        className='w-full p-8'
      >

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


            <div
              className='flex items-center space-x-6 text-slate-200 text-xl'
            >
              <label htmlFor="email">
                Enter email
              </label>
              <input
                defaultValue={farmer?.email}
                className='rounded-md py-2 px-4 bg-transparent border'
                type="text" placeholder='name@domain.com' name='email' />
            </div>


            <div
              className='flex items-center space-x-6 text-slate-200 text-xl'
            >
              <label htmlFor="email">
                Password
              </label>
              <input
                defaultValue={farmer?.area}
                className='rounded-md py-2 px-4 bg-transparent border'
                type="password" placeholder='*******' name='pass' />
            </div>

            <button
              className='rounded-full px-6 py-3 bg-sky-600 text-white text-xl hover:scale-[.99] transform transition-all hover:bg-sky-700'
            >
              Login
            </button>
          </form>
        </section>
      </main>
    </Layout>
  )
}

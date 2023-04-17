import { farmerContext } from '@/Context/FarmerContext'
import Layout from '@/partials/Layout';
import extractFormData from '@/utils/extractFormData';
import React, { useContext } from 'react'

export const Profile = () => {
  const { farmer, setFarmer } = useContext(farmerContext);

  async function handleForm(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = extractFormData(e.target);
    setFarmer(payload)
  }
  return (
    <Layout>
      <main
        className='w-full p-8'
      >

        {/* cover and profile */}
        <div className='bg-[url("/cover.jpg")]  relative w-full h-44'>
          <img src="/placeholder.jpg" className='absolute left-8 -bottom-16 shadow-xl rounded-full w-44 h-44 object-cover' alt="" />
        </div>

        <section className='w-10/12 mx-auto mt-24 text-md'>
          <form
            onSubmit={handleForm}
            className='space-y-6'
          >
            <div
              className='flex items-center space-x-6 text-slate-200 text-xl'
            >
              <label htmlFor="name">
                Full name
              </label>
              <input
                className='rounded-md py-2 px-4 bg-transparent border'
                defaultValue={farmer?.name}
                type="text" placeholder='Sanket Gawande' name='name' />
            </div>

            <div
              className='flex items-center space-x-6 text-slate-200 text-xl'
            >
              <label htmlFor="phone">
              Phone number
              </label>
              <input
                defaultValue={farmer?.phone}
                className='rounded-md py-2 px-4 bg-transparent border'
                type="text"  placeholder='+91 1212121212' name='phone' />
            </div>

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
              <label htmlFor="sur">
                Survey number
              </label>
              <input
                defaultValue={farmer?.survey_no}
                className='rounded-md py-2 px-4 bg-transparent border'
                type="text" placeholder='abc/d' name='survey_no' />
            </div>

            <div
              className='flex items-center space-x-6 text-slate-200 text-xl'
            >
              <label htmlFor="email">
                Farm Area (in Hector)
              </label>
              <input
                defaultValue={farmer?.area}
                className='rounded-md py-2 px-4 bg-transparent border'
                type="text"  placeholder='5.2' name='area' min={0} />
            </div>

            <button
              className='rounded-full px-6 py-3 bg-sky-600 text-white text-xl hover:scale-[.99] transform transition-all hover:bg-sky-700'
            >
              Update
            </button>
          </form>
        </section>
      </main>
    </Layout>
  )
}

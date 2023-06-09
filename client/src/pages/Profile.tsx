import { farmerContext } from '@/Context/FarmerContext'
import Layout from '@/partials/Layout';
import extractFormData from '@/utils/extractFormData';
import React, { useContext, useEffect, useState } from 'react'
import { delete_my_reports, get_my_reports } from '../../service/create_report.service';
import { toast } from 'react-toastify';
import { AiFillInfoCircle, AiOutlineInfo } from 'react-icons/ai';
import { clipboard } from 'electron';

export const Profile = () => {
  
  const { farmer, setFarmer } = useContext(farmerContext);
  const [loading, setLoading] = useState(false)
  const [reports, setReport] = useState<{ count: number, label: string, date: any, _id: string, createdAt: any }[] | null>(null)
  async function handleForm(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = extractFormData(e.target);
    setLoading(true)
    try {
      const req = await fetch(`${import.meta.env.VITE_BASE_URL}/api/farmer/update`, {
        method: 'post',
        body: JSON.stringify({
          _id: farmer?._id,
          ...payload
        }),
        credentials: 'include',
        headers: {
          'Content-type': 'application/json'
        }
      })

      const { error, message } = await req.json() as { error: boolean, message: string }
      setLoading(false)
      localStorage.setItem('user', JSON.stringify({
        ...payload,
        _id: farmer?._id
      }));
      setFarmer({
        ...payload,
        ...farmer
      })
      toast(message, { position: 'top-right', type: error ? 'error' : 'success' })
    } catch (error) {
      toast('Network issue found', { position: 'top-right', type: 'error' })
      setLoading(false)
    }

  }

  console.log(farmer?._id)
  const load_reports = async () => {
    const data = await get_my_reports(farmer?._id);
    setReport(data.data)

    toast(data.message, { type: 'success' })
  }
  const delete_report = async (id: string) => {
    const data = await delete_my_reports(farmer?._id, id)
    toast(data.message, { type: 'info' })
    load_reports()
  }

  useEffect(() => {
    farmer?._id && load_reports()
  }, [farmer?._id])
  return (
    <Layout>
      <main
        className='w-full p-8'
      >
        <div className='bg-[url("/cover.jpg")]  relative w-full h-44'>
          <img src="/placeholder.webp" className='absolute left-8 -bottom-16 shadow-sm shadow-lime-100 rounded-full w-44 h-44 object-cover' alt="" />
        </div>

        <section className='flex px-12 justify-between  mx-auto mt-24 text-md'>
          <form
            onSubmit={handleForm}
            className='space-y-6 w-1/3'
          >
            <div
              className='flex flex-col text-slate-200 text-xl'
            >
              <label htmlFor="name">
                Full name
              </label>
              <input
                className='rounded-md py-2 px-4 bg-transparent border'
                defaultValue={farmer?.name}
                type="text" placeholder='John doe' name='name' />
            </div>

            <div
              className='flex flex-col text-slate-200 text-xl'
            >
              <label htmlFor="phone">
                Phone number
              </label>
              <input
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
                defaultValue={farmer?.email}
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
                defaultValue={farmer?.area}
                className='rounded-md py-2 px-4 bg-transparent border'
                type="text" placeholder='5.2' name='area' min={0} />
            </div>

            <button
              disabled={loading}
              className='rounded-full px-6 py-3 bg-sky-600 text-white text-xl hover:scale-[.99] transform transition-all hover:bg-sky-700'
            >
              {
                loading
                  ? 'Please wait'
                  : 'Update'
              }
            </button>
          </form>
          <section
            className='w-1/2 px-12 lg:px-24 space-y-6 text-white'
          >
            <h3
              className='text-xl font-semibold'
            >
              Past reports
            </h3>
            <main
              className=''
            >
              {
                reports && reports?.map((item: {
                  label: string,
                  _id: string,
                  date: string
                }, index: number) =>
                  <div
                    key={index}
                    className='mb-4 px-4 py-4 bg-gradient-to-bl hover:bg-gradient-to-br transition-all duration-300 shadow-lg from-white/20 via-slate-400/40 to-slate-800/40 border border-white rounded-md flex justify-between flex-col lg:flex-row lg:items-center'
                  >
                    <p
                      className='font-semibold'
                    >({`${index + 1}`.padStart(3, '0')}) {item?.label}</p>
                    <div
                      className='flex space-x-4 lg:items-center flex-col lg:flex-row'
                    >
                      <p
                        className='text-slate-300'
                      >
                        {new Date(item?.date).toLocaleString('en-in', { dateStyle: 'full' })}
                      </p>
                      <div
                        className='space-x-2'
                      >
                        <button
                          onClick={() => {
                            delete_report(item._id)
                          }}
                          className='bg-red-500 text-white py-2 hover:underline text-xs px-4 rounded-full'
                        >
                          Delete
                        </button>
                        {/* <button
                          className='bg-slate-800 text-white py-2 hover:underline  text-xs px-4 rounded-full'
                        >Print</button> */}
                      </div>
                    </div>
                  </div>
                )
              }
              {
                !reports?.length &&
                <main
                  className='border px-4 py-4 text-xl bg-red-600/20 text-red-400 border-current font-semibold'
                >

                  <h2>
                    No record found
                  </h2>
                </main>
              }
            </main>
          </section>
        </section>
      </main>
    </Layout>
  )
}

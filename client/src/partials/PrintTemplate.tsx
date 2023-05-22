import { farmerContext } from '@/Context/FarmerContext'
import React, { useContext } from 'react'
import Layout from './Layout'

const PritTemplate = ({
  count = 0,
  setViewReport,
  setResult,
  ptype
}: {
  count: Number | 0
  ptype: string
  setViewReport: React.Dispatch<React.SetStateAction<boolean>>,
  setResult: React.Dispatch<React.SetStateAction<any>>
}) => {
  const { farmer } = useContext(farmerContext)
  function printHandler() {
    window.print()
    setViewReport(false);
    setResult(false)
    window.addEventListener('afterprint', () => {
      setViewReport(false);
      setResult(false)
    })
  }
  return (

    <main
      className='z-[60] fixed bg-black/50 backdrop-filter backdrop-blur-lg grid place-items-center h-full w-full top-0 left-0'
      id='print-area'
    >
      <section
        className='bg-dark2 p-8 min-w-[700px] rounded-xl shadow-lg'

      >
        <div
          className='flex items-center justify-between w-full'
        >

          <h1
            className='text-2xl font-semibold text-slate-200'
          >
            Analyzed data
          </h1>
          <div>

            <button
              onClick={() => setViewReport(false)}
              className='px-6 py-2 text-sm text-white bg-rose-600 mr-4 font-semibold rounded-full border border-current'
            >
              Close
            </button>

            <button
              onClick={() => printHandler()}
              className='px-6 py-2 text-sm text-white bg-sky-600 font-semibold rounded-full border border-current'
            >
              Print
            </button>
          </div>
        </div>
        <h4
          className='text-slate-200 font-semibold text-lg py-1'
        >
          Name : {farmer?.name}
        </h4>
        <h4
          className='text-slate-200 font-semibold text-lg py-1'
        >
          Email : {farmer?.email}
        </h4>
        <h4
          className='text-slate-200 font-semibold text-lg py-1'
        >
          Survey Number : {farmer?.survey_no}
        </h4>
        <h4
          className='text-slate-200 font-semibold text-lg py-1'
        >
          Area (in Hector) : {farmer?.area}
        </h4>
        <h4
          className='text-slate-200 font-semibold text-lg py-1'
        >
          Crop type : {ptype}
        </h4>

        <div
          className='text-slate-200 font-semibold text-lg pb-1'
        >
          <p>
            Date : {new Date().toLocaleDateString('en-us', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p>
            <>
              Plant count  : {JSON.stringify(count)}
            </>
          </p>
        </div>

        {/* <img
            src={image}
            alt="crop"
          /> */}
      </section>
    </main>
  )
}

export default PritTemplate
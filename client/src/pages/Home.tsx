import Layout from '@/partials/Layout'
import React from 'react'
import { AiOutlineArrowDown } from 'react-icons/ai'
const Home = () => {
  return (
    <Layout>
      <div className=''>
        <main
          className='w-full h-screen  home-bg bg-center bg-[url("/homepagebg.jpg")]'
        >
          <section
            className='bg-slate-900/70 backdrop-filter backdrop-blur-[1px] w-full h-full flex flex-col items-center justify-center'
          >
            <h1
              className='text-4xl p-6 bg-white/20 backdrop-filter backdrop-blur-sm px-12 border-4  font-semibold text-slate-200'
            >
              Welcome to
              <span
                className='text-yellow-500'
              > logger Drones</span>!
            </h1>
            <p
              className='text-white text-2xl pt-6'
            >
              Monitoring farms become easy with logger drones
            </p>
            <div
              className='text-white text-lg   space-y-4 mt-36'
            >
              <p>Scroll down for more</p>
              <AiOutlineArrowDown
                size={'30px'}
                className='mx-auto animate-bounce'
              />
            </div>
          </section>
        </main>
        <section
          className='w-full p-12 relative text-white'
        >
          <h4
            className='text-2xl  font-semibold'
          >
            How it works.
          </h4>
          <span
            className='absolute inline-block w-[2px] h-[50%] mt-12 left-[7.5rem] bg-white/90 top-24'
          />
          <div
            className='p-12'
          >

            {
              [
                {
                  title: ' Capture the images of fields you want to analyze'
                }, {
                  title: 'Upload image using drop-zone'
                },
                {
                  title: 'View result'
                },
                { title: 'Print and save report' }
              ].map((ITEM, index) =>
                <article
                  key={ITEM.title}
                  className='flex mb-12  space-x-6'
                >
                  <button
                    className='bg-white/20 text-white  rounded-full  shrink-0 w-12 h-12 border border-current z-30'
                  >
                    {index + 1}

                  </button>
                  <p
                    className='pt-3 underline'
                  >
                    {ITEM.title}
                  </p>
                </article>
              )
            }

          </div>
        </section>
      </div>

    </Layout>
  )
}

export default Home
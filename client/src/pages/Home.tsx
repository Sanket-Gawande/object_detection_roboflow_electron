import Layout from '@/partials/Layout'
import React from 'react'

const Home = () => {
  return (
    <Layout>
      <div className='grid place-items-center h-full'>
        <main>
          <h1
            className='text-4xl font-semibold text-slate-200'
          >
            Welcome to logger Drones! 
          </h1>
        </main>
      </div>

    </Layout>
  )
}

export default Home
import Layout from '@/partials/Layout'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function AllFarmers() {

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function get_farmer() {
    setLoading(true)
    try {
      const req = await fetch(`${import.meta.env.VITE_BASE_URL}/api/farmer`, {

        credentials: 'include',
        headers: {
          'Content-type': 'application/json'
        }
      })

      const { error, message, data } = await req.json() as { error: boolean, message: string, data: any[] }
      setLoading(false)
      setData(data)


      toast(message, { position: 'top-right', type: error ? 'error' : 'success' })
    } catch (error) {
      toast('Network issue found', { position: 'top-right', type: 'error' })
      setLoading(false)
    }
  }

  useEffect(() => {
    get_farmer()
  }, [])
  return (
    <Layout>
      <main
        className='py-24 space-y-5  w-9/12  mx-auto text-2xl text-white'
      >
        <h4>
          All farmers
        </h4>
        {
          data.map((item, index) => {

            return <details
              key={index}
            >
              <summary
                className='flex cursor-pointer py-4 pb-4 space-x-3 border-b w-max'
              >
                <p>
                  Name:
                  {
                    item.name
                  }
                </p>
                <p>
                  Farm area: {' '}
                  {
                    item.area
                  }
                  {' Hector'}
                </p>
              </summary>
              <div
              className='border'
              >
                {

                  item?.reports_generated?.map((item: any, index: number) =>
                    <div
                      key={index}
                      className='p-6 bg-slate-700/10 space-y-3'
                    >
                      <h4
                        className='font-medium text-yellow-500'
                      >
                        Report {index + 1}
                      </h4>
                      <p>
                        Plant type : {item.label}
                      </p>
                      <p>
                        Plant count : {item.count}
                      </p>
                      <p>
                        Report date : {item.date}
                      </p>

                    </div>
                  )
                }
                {
                  item?.reports_generated?.length
                    ? null
                    : <p
                      className='bg-red-600/20 p-3'
                    >
                      No reports found
                    </p>
                }
              </div>
            </details>
          })
        }

      </main>
    </Layout>
  )
}

export default AllFarmers
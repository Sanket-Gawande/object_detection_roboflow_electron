import Layout from '@/partials/Layout'
import { FileUploader } from 'react-drag-drop-files'
import React, { useContext, useEffect } from 'react'
import PritTemplate from '@/partials/PrintTemplate'
import save_report from '../../service/create_report.service'
import { farmerContext } from '@/Context/FarmerContext'
type Prediction = {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  class: string;
}

const Counter = () => {
  const { farmer } = useContext(farmerContext);
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState<File | null>(null);
  const [imageString, setImageString] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<boolean | null | string>(null);
  const [count, setCount] = React.useState([])
  const [imageElement, setImageElement] = React.useState<HTMLImageElement | null>(null);
  const [error, setError] = React.useState<null | string>(null);
  const [viewReport, setViewReport] = React.useState(false);
  const [season, setseason] = React.useState('summer');
  const [plantType, setplantType] = React.useState('Cotton');
  const canvasRef = React.useRef<HTMLCanvasElement>(null);



  function getBase64FromFile(image: File | string) {
    const file = image as File;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      // get image width and height
      const img = new Image();
      img.src = reader.result as string;
      img.id = Math.random().toString();
      img.onload = () => {
        setImageElement(img);
        console.log(img.width, img.height);
      }
      setImageString(reader.result as string);
    });
    reader.readAsDataURL(file);
    setImage(file);
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      getBase64FromFile(e.target.files[0]);
    }
  }

  function formatImagesize(size: number) {
    return size > 1000000 ? `${Math.round(size / 1000000)} MB` : `${Math.round(size / 1000)} KB`;
  }

  async function handleCountPlants() {
    // setResult('loading')
    // const type = prompt('Please enter plant type') || '';
    // setplantType(type);
    if (!plantType) { return alert('Plant type required.') }
    if (!image || !imageString) return;
    setLoading(true);
    const api = `http://localhost:3000/api/v1/count`
    const req = await fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        image: imageString
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const res = await req.json();
    if (res.status === 'success') {
      // error handling
      console.log(res.data.predictions);
      if (res.data.predictions.length === 0) {
        setError('no plants found')
        setLoading(false);
        return;
      }
      if (!res.data.predictions) {
        setError('Something went wrong')
        setLoading(false);
        return;
      }

      const { data } = res;

      setCount(data.predictions);

      if (canvasRef.current && imageElement) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const predictions = data.predictions as Prediction[];
        if (ctx) {
          for (let i = 0; i < predictions.length; i++) {
            const prediction = predictions[i] as Prediction;
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 4;
            ctx.strokeRect(prediction.x - 30, prediction.y - 30, prediction.width, prediction.height);
            ctx.fillStyle = 'blue';
            ctx.font = '24px Arial';
            ctx.fillText(`${prediction.class} (${i + 1})`, prediction.x - 25, prediction.y - 35);
          }
          ctx.fillStyle = 'blue';
          ctx.fillText(`Total plants: ${predictions.length}`, 10, 50);
        }
      }
      setLoading(false);
      setResult('success');
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setResult(null);
      }
    })

  }, [])


  //  draw image on canvas once image is loaded
  useEffect(() => {
    getData();
  }, [imageElement?.id])

  function getData() {
    if (canvasRef.current && imageElement) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = imageElement.width;
        canvas.height = imageElement.height;
        ctx.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height);
      }
    }
  }

  return (
    <Layout>
      <section
        className='pt-20 z-0 p-12 w-full min-h-screen overflow-y-auto grid place-items-center relative'
      >
        {
          viewReport
            // print preview component
            ? <PritTemplate
              ptype={plantType}
              setViewReport={setViewReport}
              setResult={setResult}
              image={canvasRef.current?.toDataURL('png', 1) || '/placeholder.png'}
              count={count.length || 0}
              name='Mr. Gopal Jawle'
            />
            : null
        }

        <img
          src={imageString || ''}
          alt=""
          className='-z-10 select-none blur-2xl absolute top-0 left-0 w-full h-full object-cover opacity-[.3]'
        />
        {
          error
            ?
            <div
              className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-md backdrop-filter flex items-center justify-center'
            >
              <div className='p-8 relative w-[600px] text-2xl text-red-500  bg-dark2 rounded-xl'>
                <button
                  title='close'
                  onClick={() => setError(null)}
                  className='bg-red-500 z-10 absolute w-max shrink-0 text-slate-200 px-4 py-2 rounded-lg -top-2 -right-2'
                >
                  &times;
                </button>
                <h1
                  className='bg-red-500/10 p-4 rounded-xl'
                >
                  {error}
                </h1>
              </div>
            </div>

            : null
        }
        {

          <div
            style={{
              visibility: result ? 'visible' : 'hidden',
              opacity: result ? 1 : 0
            }}
            className='transition-all z-50 duration-300 absolute top-0 pt-16 left-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-md backdrop-filter flex items-center justify-center'
          >
            <input
              className='absolute bottom-16 right-16 cursor-pointer w-56 accent-slate-600 '
              type="range"
              min="20"
              defaultValue={100}
              max="100"
              onChange={(e) => {
                canvasRef.current!.style.scale = `${((e.target.value as unknown as number) / 100)}`;
              }}
            />
            <button
              onClick={() => setResult(null)}
              className='bg-red-500 z-10 absolute w-max shrink-0 text-slate-200 px-4 py-2 rounded-full top-20 right-16'
            >
              &times;
            </button>
            <button
              onClick={async () => {
                await save_report({
                 ...farmer
                }, count.length, plantType)
                setViewReport(!viewReport)
              }}
              className='bg-sky-500 absolute w-max shrink-0 text-white px-4 py-2 rounded-full top-20 right-28'
            >
              View & Save Report
            </button>
            <div
              className='bg-slate-800  h-[90%] border-8 border-dark overflow-auto rounded-lg w-[95%] Jay Wankhadeshadow-xl'
            >
              <canvas
                ref={canvasRef}
              >
              </canvas>
            </div>
          </div>

        }

        <main
          className='w-10/12  max-w-[600px] bg-gray-900 border border-slate-700 rounded-lg shadow-2xl p-8'
        >
          <input
            type="file"
            accept='.jpeg,.png,.webp,.jpg'
            id='image'
            className='hidden'
            onChange={handleImageChange}
          />
          {
            imageString ? (
              <div
                className='flex w-full items-center justify-between py-4'
              >
                <span>

                  <h5
                    className='text-sky-600 text-lg font-semibold break-words w-[21rem]'
                  >
                    Name : {image?.name}
                  </h5>
                  <p
                    className='text-slate-300'
                  >
                    Size: {formatImagesize(image?.size as number)}
                  </p>
                </span>

              </div>
            )
              : null
          }



          <div
            className='flex flex-col border rounded-lg border-dashed p-4 justify-center'
          >

            {
              imageString ?
                <>
                  <img
                    className='w-full h-64 object-cover rounded-lg shadow-xl  p-4'
                    src={imageString || '/thumbnail-placeholder.svg'}
                    alt="Choose image"

                  />
                  <div
                    className='flex items-center'
                  >
                    <h1
                      className='py-2  flex-1 px-4 rounded-l-lg text-white font-semibold'
                    >
                    </h1>
                    <p
                      className='text-white text-lg pr-2 w-52'
                    >
                      Add label :
                    </p>
                    <input type="text" placeholder='eg. cotton' className='bg-transparent py-2 rounded-full mr-4 outline-none ring-0 border text-white font-medium px-4 ' value={plantType} onChange={e => setplantType(e.target.value)} />
                    <button
                      onClick={handleCountPlants}
                      disabled={loading}
                      className='bg-green-600 ml-auto w-max shrink-0 text-white px-4 py-2 rounded-full'
                    >
                      {
                        loading ? 'Loading...' : 'Count plants'
                      }
                    </button>
                  </div>


                </>
                :
                <FileUploader
                  handleChange={getBase64FromFile}
                  types={['jpg', 'jpeg', 'png', 'webp']}

                >
                  <div>
                    <img
                      className='mx-auto py-6'
                      src="/drag-and-drop.png" alt="drop" />
                    <h3
                      className='text-2xl text-center font-semibold text-slate-300 pt-4'
                    >
                      Drop image or <span
                        className='underline text-sky-600'>Browse files</span>
                    </h3>
                    <p
                      className='text-center py-4 text-slate-400'
                    >
                      only .Jpg, .Jpeg, .png, .Jpeg
                    </p>
                  </div>
                </FileUploader>
            }

          </div>
        </main>
      </section>
    </Layout>
  )
}

export default Counter
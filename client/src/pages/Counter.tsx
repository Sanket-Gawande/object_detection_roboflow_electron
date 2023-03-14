import Layout from '@/partials/Layout'
import React, { useEffect } from 'react'
type Prediction = {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  class: string;
}

const Counter = () => {
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState<File | null>(null);
  const [imageString, setImageString] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<null | string>(null);
  const [imageElement, setImageElement] = React.useState<HTMLImageElement | null>(null);
  const [error, setError] = React.useState<null | string>(null);
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
      if (canvasRef.current && imageElement) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const predictions = data.predictions as Prediction[];
        if (ctx) {
          for (let i = 0; i < predictions.length; i++) {
            const prediction = predictions[i] as Prediction;
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 4;
            ctx.strokeRect(prediction.x, prediction.y, prediction.width, prediction.height);
            ctx.fillStyle = 'blue';
            ctx.font = '24px Arial';
            ctx.fillText(`${prediction.class} (${i + 1})`, prediction.x, prediction.y - 10);
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
    getData()
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
        className='pt-20 z-0 p-12 w-full h-[calc(100%-5rem)] overflow-y-auto grid place-items-center relative'
      >
        <img 
        src={imageString || ''} 
        alt="" 
        
        className='-z-10 select-none blur-lg absolute top-0 left-0 w-full h-full object-cover opacity-50'
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
            className='transition-all duration-300 absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-md backdrop-filter flex items-center justify-center'
          >
            <input
              className='absolute top-8 left-12 cursor-pointer w-56 accent-green-500 '
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
              className='bg-red-500 z-10 absolute w-max shrink-0 text-slate-200 px-4 py-2 rounded-lg top-8 right-8'
            >
              &times;
            </button>

            <div
              className='bg-dark h-[90%] border-8 border-dark overflow-auto rounded-lg w-[95%] shadow-xl'
            >
              <canvas
                ref={canvasRef}
              >
              </canvas>
            </div>
          </div>

        }

        <main
          className='w-10/12  max-w-[600px] bg-dark2/60 rounded-lg shadow-2xl p-8'
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
                <h5
                  className='text-yellow-500 text-lg break-words w-[21rem]'
                >
                  Image chosen : {image?.name} (image size: {formatImagesize(image?.size as number)})
                </h5>

                <button
                  disabled={loading}
                  onClick={handleCountPlants}
                  className='bg-green-700 w-max shrink-0 text-slate-100 px-4 py-2 rounded-lg'
                >
                  {
                    loading ? 'Loading...' : 'Count plants'
                  }
                </button>
              </div>
            )
              : null
          }
          <label htmlFor="image"
            className='flex flex-col justify-center cursor-pointer'
          >
            <img
              className='w-full h-64 object-cover rounded-lg shadow-xl opacity0 border p-4 border-dashed'
              src={imageString || '/placeholder.jpg'}
              alt="Choose image"
            />
            <h3
              className='text-2xl font-semibold text-slate-400 py-6'
            >
              Choose image to count from
            </h3>
          </label>
        </main>
      </section>
    </Layout>
  )
}

export default Counter
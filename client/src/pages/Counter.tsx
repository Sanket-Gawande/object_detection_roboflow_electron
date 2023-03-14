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
        className='pt-20 p-12 w-full h-full overflow-y-auto grid place-items-center relative'
      >
        {

          <div
            style={{
              visibility: result ? 'visible' : 'hidden',
              opacity: result ? 1 : 0
            }}
            className='transition-all duration-300 absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-md backdrop-filter flex items-center justify-center'
          >
            <div
              className='bg-dark h-[90%] border-8 border-dark overflow-auto rounded-lg w-[95%] shadow-xl'
            >
              <button
                onClick={() => setResult(null)}
                className='bg-red-500 absolute w-max shrink-0 text-slate-200 px-4 py-2 rounded-lg top-8 right-8'
              >
                &times;
              </button>
              <canvas
                ref={canvasRef}
              >

              </canvas>

            </div>
          </div>

        }

        <main
          className='w-10/12  max-w-[600px] bg-dark rounded-lg shadow-xl p-8'
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
                className='flex items-center justify-between py-4'
              >
                <h5
                  className='text-yellow-500 text-lg '
                >
                  Image chosen : {image?.name} (image size: {formatImagesize(image?.size as number)})
                </h5>

                <button
                  disabled={loading}
                  onClick={handleCountPlants}
                  className='bg-green-500 w-max shrink-0 text-slate-200 px-4 py-2 rounded-lg'
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
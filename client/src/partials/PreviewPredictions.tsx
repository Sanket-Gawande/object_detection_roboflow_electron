import { Prediction } from '@/pages/Counter';
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'

function PreviewPredictions({ image, predictions, id, setter, onClose }: { onClose: () => void, image: HTMLImageElement, predictions: Prediction[], setter: Dispatch<SetStateAction<Prediction[] | null>>, id: string | undefined }) {
  const [marker, setMarker] = useState(predictions);
  const [dim, setDim] = useState({ width: 640, height: 640 });
  const [confidence, setConfidence] = useState(700);
  useEffect(() => {
    setDim({ width: image.width, height: image.height })
    const canvas_element = document.querySelector('.image-canvas') as HTMLCanvasElement;
    if (canvas_element) {
      const ctx = canvas_element.getContext('2d')
      if (ctx) {
        // draw image on canvas
        canvas_element.width = image.width;
        canvas_element.height = image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height);
      }
    }
  }, [id])

  // change markers
  useEffect(() => {
    const canvas_element = document.querySelector('.predictions-canvas') as HTMLCanvasElement;
    if (canvas_element) {
      const ctx = canvas_element.getContext('2d')
      //  draw predictions on canvas, mapping them on image
      if (ctx) {
        ctx?.clearRect(0, 0, image.width, image.height)
        for (let i = 0; i < marker.length; i++) {
          const prediction = marker[i] as Prediction;
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 4;
          ctx.strokeRect(prediction.x - 100, prediction.y - 100, prediction.width, prediction.height);
          // adding label on bounding box 
          ctx.fillStyle = 'white';
          ctx.font = '20px Arial';
          ctx.fillText(`${prediction.class} (${i + 1})(${(prediction.confidence * 100).toFixed(2)}%)`, prediction.x - 100, prediction.y - 100);
        }
      }
    }
  }, [marker.length, predictions.length])
  return (

    <section
      className='fixed inset-0 h-full bg-black/50 p-28'
    >
      <main className='border relative text-right p-12 bg-white rounded-md h-full w-11/12 mx-auto'>
        <button
          onClick={() => onClose()}
          className='top-2 absolute right-2 text-4xl h-12 w-12 bg-slate-200 rounded-full text-red-500'
        >
          &times;
        </button>

        <h3
          className='text-2xl font-semibold'
        >
          Preview Predictions
        </h3>
        <p
          className='text-xl pb-4'
        >
          Confidence Score  :{confidence / 10}
          <br />

          <small
            className='text-xl pb-4 text-rose-600 '
          >
            *check objects where confidence score is equal to or above {confidence / 10}
          </small>
        </p>
        <h4
          className='text-2xl'
        >
          Total plants with confidence score {confidence / 10} and above are {marker.length}
        </h4>
        <section>
          {/* prediction controls */}

        </section>

        <div
          className='mx-auto h-auto relative'
        >

          <input
            type="range"
            className='absolute top-12 border w-52 -right-0 accent-slate-600'
            min={100}
            max={1000}
            defaultValue={700}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setConfidence(Number(e.target.value))
              const markers = predictions.filter(i => i.confidence >= (Number(e.target.value) / 1000));
              console.log(markers)
              setMarker(markers)
            }}
          />
          <canvas width={dim.width} height={dim.height} className='predictions-canvas inline-block left-0 -top-24 border absolute z-10'>

          </canvas>
          <canvas className='image-canvas absolute left-0 inline-block border -top-24 z-[9]'>

          </canvas>
        </div>
      </main>
    </section>
  )
}

export default PreviewPredictions
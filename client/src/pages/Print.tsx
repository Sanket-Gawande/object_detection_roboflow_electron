import React, { useEffect } from 'react'

const Print = () => {
  useEffect(() => {
    window.print()
  }, [])
  return (
    <body>
      <h1>
        This is a static template, there is no bundler or bundling involved!
      </h1>
      <h4>Name : Jay Wankhade</h4>
      <img
        src="https://images.unsplash.com/photo-1593466144596-8abd50ad2c52?w=320"
        alt="crop"
      />
    </body>
  )
}

export default Print
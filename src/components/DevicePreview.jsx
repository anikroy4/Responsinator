import React from 'react'

const Devices = [
  {
    name: 'Mobile Portrait',
    width: 375,
    height: 667,
    minWidth: 320,
    maxWidth: 480,
  },
  {
    name: 'Mobile Landscape',  
    width: 667,
    height: 375,
    minWidth: 481,
    maxWidth: 761,
  },
  {
    name: 'Tablet Portrait', 
    width: 768,
    height: 1124,
    minWidth: 768,
    maxWidth: 1024,
  },
  {
    name: 'Tablet Landscape',  
    width: 1124,
    height: 768,
    minWidth: 1024,
    maxWidth: 768,
  },
  {
    name: 'Desktop',  
    width: 1440,
    height: 900,
    borderRadius: 0,
  },
  {
    name: 'Large Desktop',  
    width: 1920,
    height: 1080,
    borderRadius: 0,
  },
  
] 
const DevicePreview = () => {
  return (
    <>
      {Devices.map((Devices, index) => (

      <div key={index} className='mb-17.5 text-center'>
        <h3 className='mb-4 text-lg font-medium'>{Devices.name} -- (Min-Width: {Devices.minWidth}px Max-Width: {Devices.maxWidth}px)</h3>
        <div
          className='mx-auto border-solid border-black  bg-white '>
        </div> 
      </div>

    ))}
    </>
  )
}

export default DevicePreview
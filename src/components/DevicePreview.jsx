import React from 'react'


const devices = [
  {
    name: 'Mobile Potrait',
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
] 
const DevicePreview = () => {
  return (
    <div>DevicePreview</div>
  )
}

export default DevicePreview
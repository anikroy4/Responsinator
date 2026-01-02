import { useState } from 'react'
import './App.css'
import DevicePreview from './components/DevicePreview'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DevicePreview/>
    </>
  )
}

export default App

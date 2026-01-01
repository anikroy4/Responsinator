import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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

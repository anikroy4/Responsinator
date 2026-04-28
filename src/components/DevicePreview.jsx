import React, { useState } from 'react'

const Devices = [
  {
    name: 'Mobile Portrait',
    width: 375,
    height: 667,
    minWidth: 320,
    maxWidth: 480,
    icon: '📱',
    category: 'Mobile',
    gradient: 'from-slate-600 to-slate-700',
    bgGradient: 'from-slate-50 to-slate-100',
  },
  {
    name: 'Mobile Landscape',  
    width: 667,
    height: 375,
    minWidth: 481,
    maxWidth: 767,
    icon: '📱',
    category: 'Mobile',
    gradient: 'from-slate-600 to-slate-700',
    bgGradient: 'from-slate-50 to-slate-100',
  },
  {
    name: 'Tablet Portrait', 
    width: 768,
    height: 1024,
    minWidth: 768,
    maxWidth: 1024,
    icon: '📱',
    category: 'Tablet',
    gradient: 'from-neutral-500 to-neutral-600',
    bgGradient: 'from-neutral-50 to-neutral-100',
  },
  {
    name: 'Tablet Landscape',  
    width: 1024,
    height: 768,
    minWidth: 1024,
    maxWidth: 1279,
    icon: '📱',
    category: 'Tablet',
    gradient: 'from-neutral-500 to-neutral-600',
    bgGradient: 'from-neutral-50 to-neutral-100',
  },
  {
    name: 'Desktop',  
    width: 1440,
    height: 900,
    minWidth: 1280,
    maxWidth: 1919,
    icon: '🖥️',
    category: 'Desktop',
    gradient: 'from-stone-600 to-stone-700',
    bgGradient: 'from-stone-50 to-stone-100',
  },
  {
    name: 'Large Desktop',  
    width: 1920,
    height: 1080,
    minWidth: 1920,
    maxWidth: 2560,
    icon: '🖥️',
    category: 'Desktop',
    gradient: 'from-stone-600 to-stone-700',
    bgGradient: 'from-stone-50 to-stone-100',
  },
] 

const DevicePreview = () => {
  const [urlInput, setUrlInput] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [zoom, setZoom] = useState(100)
  const [selectedDevices, setSelectedDevices] = useState(new Set())
  const [viewMode, setViewMode] = useState('single') // 'single' or 'grid'
  const [useProxy, setUseProxy] = useState(true)

  const getIframeUrl = (url) => {
    if (!url) return ''
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
      return url
    }
    if (useProxy) {
      return `https://corsproxy.io/?${encodeURIComponent(url)}`
    }
    return url
  }
  const handleSearch = (e) => {
    e.preventDefault()
    if (urlInput.trim()) {
      let url = urlInput.trim()
      // Add https:// if no protocol is specified
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url
      }
      setPreviewUrl(url)
      setUrlInput('')
    }
  }

  const toggleDeviceSelection = (deviceName) => {
    const newSelected = new Set(selectedDevices)
    if (newSelected.has(deviceName)) {
      newSelected.delete(deviceName)
    } else {
      newSelected.add(deviceName)
    }
    setSelectedDevices(newSelected)
  }

  const downloadScreenshot = async () => {
    // Simple screenshot download
    const element = document.querySelector('[data-screenshot]')
    if (element) {
      const canvas = await html2canvas(element)
      const link = document.createElement('a')
      link.href = canvas.toDataURL()
      link.download = `responsinator-${new Date().getTime()}.png`
      link.click()
    }
  }

  const displayedDevices = selectedDevices.size > 0 
    ? Devices.filter(d => selectedDevices.has(d.name))
    : Devices

  const getPreviewFrameSize = (device, mode) => {
    const isTabletLandscape = device.name === 'Tablet Landscape'

    if (isTabletLandscape) {
      const width = mode === 'grid' ? 320 : 960
      return {
        width,
        height: Math.round((width * device.height) / device.width),
      }
    }

    return mode === 'grid'
      ? {
          width: Math.min(device.width, 280),
          height: Math.min(device.height, 280),
        }
      : {
          width: device.width,
          height: device.height,
        }
  }

  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_top_left,_#f8fafc_0%,_#f1f5f9_38%,_#e2e8f0_100%)] text-slate-900 p-6 sm:p-8 lg:p-10'>
      <div className='max-w-7xl mx-auto relative'>
        <div className='pointer-events-none absolute -top-10 left-12 h-44 w-44 rounded-full bg-white/65 blur-3xl' />
        <div className='pointer-events-none absolute top-28 right-0 h-56 w-56 rounded-full bg-slate-200/70 blur-3xl' />
        {/* Header */}
        <div className='mb-10 sm:mb-12 relative z-10 text-center'>
          <div className='flex justify-center'>
            <div className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-500 shadow-sm backdrop-blur'>
              Responsive preview studio
            </div>
          </div>
          <h1 className='mt-5 text-5xl sm:text-6xl font-semibold tracking-tight text-slate-950'>Responsinator</h1>
          <p className='mx-auto mt-3 max-w-2xl text-base sm:text-lg text-slate-600'>Preview live websites across six polished device frames with a clean, modern presentation.</p>
        </div>

        {/* Search Bar */}
        <div className='mb-10 relative z-10'>
          <form onSubmit={handleSearch} className='flex flex-col gap-3 rounded-2xl border border-white/70 bg-white/85 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:flex-row sm:items-center'>
            <input
              type='text'
              placeholder='Enter website URL (e.g., example.com or https://example.com)'
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className='flex-1 rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-400 focus:bg-white'
            />
            <button
              type='submit'
              className='rounded-xl bg-slate-950 px-6 py-3 font-medium text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800'
            >
              Search
            </button>
          </form>
          {previewUrl && (
            <p className='mt-3 text-sm text-slate-500'>
              Previewing: <span className='font-medium text-slate-900 break-all'>{previewUrl}</span>
            </p>
          )}
        </div>

        {/* Controls Bar */}
        {previewUrl && (
          <div className='relative z-10 mb-8 rounded-3xl border border-white/70 bg-white/75 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-6'>
            <div className='flex flex-wrap items-center gap-6 mb-6'>
              {/* View Mode Toggle */}
              <div className='flex items-center gap-2'>
                <span className='text-sm font-semibold text-slate-600 uppercase tracking-wide'>View</span>
                <button
                  onClick={() => setViewMode('single')}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${viewMode === 'single' ? 'bg-slate-950 text-white shadow-md shadow-slate-900/10' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}`}
                >
                  Single
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${viewMode === 'grid' ? 'bg-slate-950 text-white shadow-md shadow-slate-900/10' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}`}
                >
                  Grid
                </button>
              </div>

              {/* Zoom Controls */}
              <div className='flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm'>
                <button
                  onClick={() => setZoom(Math.max(50, zoom - 10))}
                  className='rounded-full bg-slate-50 px-3 py-2 text-slate-700 font-medium transition hover:bg-slate-100'
                >
                  −
                </button>
                <span className='w-12 text-center text-sm font-semibold text-slate-900'>{zoom}%</span>
                <button
                  onClick={() => setZoom(Math.min(150, zoom + 10))}
                  className='rounded-full bg-slate-50 px-3 py-2 text-slate-700 font-medium transition hover:bg-slate-100'
                >
                  +
                </button>
                <button
                  onClick={() => setZoom(100)}
                  className='rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50'
                >
                  Reset
                </button>
              </div>

              {/* Screenshot Button */}
              <button
                onClick={downloadScreenshot}
                className='ml-auto rounded-full bg-slate-950 px-5 py-2 font-medium text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800'
              >
                📸 Screenshot
              </button>
            </div>

            {/* Proxy Toggle */}
            <div className='border-t border-slate-200/80 pt-4 pb-4'>
              <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
                <label className='flex items-center gap-2 cursor-pointer rounded-full bg-slate-50 px-3 py-2'>
                  <input
                    type='checkbox'
                    checked={useProxy}
                    onChange={(e) => setUseProxy(e.target.checked)}
                    className='w-4 h-4 cursor-pointer'
                  />
                  <span className='text-sm font-medium text-slate-700'>Use proxy for live public sites</span>
                </label>
                <span className='text-xs text-slate-500 sm:ml-auto'>Useful when a site blocks iframe embedding</span>
              </div>
            </div>
            {/* Device Selector */}
            <div className='border-t border-slate-200 pt-4'>
              <p className='text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3'>Filter Devices</p>
              <div className='flex flex-wrap gap-2'>
                {Devices.map((device) => (
                  <button
                    key={device.name}
                    onClick={() => toggleDeviceSelection(device.name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedDevices.has(device.name)
                        ? `bg-slate-950 text-white shadow-md shadow-slate-900/10`
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    {device.icon} {device.name}
                  </button>
                ))}
                {selectedDevices.size > 0 && (
                  <button
                    onClick={() => setSelectedDevices(new Set())}
                    className='px-4 py-2 rounded-full font-medium bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 transition-all'
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Device Grid */}
        {previewUrl ? (
          viewMode === 'grid' ? (
            // Grid View
            <div 
              data-screenshot
              className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 rounded-3xl border border-white/70 bg-white/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-8'
            >
              {displayedDevices.map((device, index) => {
                const isTabletLandscape = device.name === 'Tablet Landscape'

                return (
                  <div key={index} className='flex flex-col items-center justify-center'>
                    {/* Device Info */}
                    <div className='mb-4 text-center'>
                      <div className='flex items-center justify-center gap-2 mb-2'>
                        <span className='text-3xl drop-shadow-sm'>{device.icon}</span>
                        <h3 className='text-lg font-semibold text-slate-900'>{device.name}</h3>
                      </div>
                      <p className='text-xs text-slate-500'>
                        {device.width}×{device.height}px
                      </p>
                    </div>

                    {/* Device Frame */}
                    <div className='relative group' style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
                      {/* Device Bezel */}
                      <div className={`relative bg-gradient-to-b ${device.gradient} ${isTabletLandscape ? 'rounded-[1.5rem] shadow-[0_14px_30px_rgba(15,23,42,0.2)] p-2.5 border border-slate-600' : 'rounded-[2rem] shadow-[0_18px_40px_rgba(15,23,42,0.24)] p-3 border border-slate-700'}`}>
                        {/* Speaker */}
                        {device.category === 'Mobile' && (
                          <div className='absolute -top-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-slate-900 rounded-full z-20'></div>
                        )}
                        {isTabletLandscape && (
                          <div className='absolute top-3 left-3 h-2 w-2 rounded-full bg-slate-900/50' />
                        )}

                        {/* Screen */}
                        <div
                          className={`bg-white overflow-hidden shadow-inner border border-slate-300 ${isTabletLandscape ? 'rounded-[1rem]' : 'rounded-[1.4rem]'}`}
                          style={getPreviewFrameSize(device, 'grid')}
                        >
                          <iframe
                            src={getIframeUrl(previewUrl)}
                            className='w-full h-full border-none'
                            title={device.name}
                          />
                        </div>

                        {/* Home Button */}
                        {device.category === 'Mobile' && device.name !== 'Mobile Landscape' && (
                          <div className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 border-2 border-slate-700 rounded-full bg-slate-800 z-20'></div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            // Single View (Stacked)
            <div className='space-y-16'>
              {displayedDevices.map((device, index) => {
                const isTabletLandscape = device.name === 'Tablet Landscape'

                return (
                <div key={index} className='flex flex-col items-center'>
                  {/* Device Info Header */}
                  <div className='mb-8 text-center w-full'>
                    <div className='flex items-center justify-center gap-3 mb-2'>
                      <span className='text-4xl drop-shadow-sm'>{device.icon}</span>
                      <h3 className='text-3xl font-semibold tracking-tight text-slate-950'>{device.name}</h3>
                    </div>
                    <p className='text-sm text-slate-500'>
                      {device.width}px × {device.height}px • Breakpoint: {device.minWidth}px - {device.maxWidth}px
                    </p>
                  </div>

                  {/* Device Preview Container */}
                  <div className='relative group' style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
                    {/* Device Bezel Frame */}
                    <div className={`relative bg-gradient-to-b ${device.gradient} ${isTabletLandscape ? 'rounded-[1.5rem] shadow-[0_18px_36px_rgba(15,23,42,0.2)] p-3 border-slate-600' : 'rounded-[2rem] shadow-[0_24px_50px_rgba(15,23,42,0.24)] p-4 border-slate-700'} border transition-all duration-300`}>
                      {/* Speaker Bar (for phones) */}
                      {device.category === 'Mobile' && (
                        <div className='absolute -top-1 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-slate-900 rounded-full z-20'></div>
                      )}
                      {isTabletLandscape && (
                        <div className='absolute top-3 left-3 h-2 w-2 rounded-full bg-slate-900/50' />
                      )}

                      {/* Device Screen */}
                      <div
                        className={`bg-white overflow-hidden shadow-inner border border-slate-300 relative ${isTabletLandscape ? 'rounded-[1rem]' : 'rounded-[1.4rem]'}`}
                        style={getPreviewFrameSize(device, 'single')}
                      >
                        <iframe
                          src={getIframeUrl(previewUrl)}
                          className='w-full h-full border-none'
                          title={device.name}
                        />
                      </div>

                      {/* Home Button (for phones) */}
                      {device.category === 'Mobile' && device.name !== 'Mobile Landscape' && (
                        <div className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-8 border-2 border-slate-700 rounded-full bg-slate-800 z-20'></div>
                      )}
                    </div>
                  </div>
                </div>
                )
              })}
            </div>
          )
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
            {Devices.map((device, index) => (
              <div key={index} className='group'>
                {/* Device Card */}
                <div className='relative overflow-hidden rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(15,23,42,0.1)]'>
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${device.gradient}`} />
                  
                  {/* Device Header */}
                  <div className='mb-6 relative z-10 min-h-[84px]'>
                    <div className='flex items-center justify-between mb-3'>
                      <div className='flex items-center gap-3'>
                        <span className='text-4xl drop-shadow-sm'>{device.icon}</span>
                        <div>
                          <h3 className='text-base sm:text-lg font-semibold text-slate-900 whitespace-nowrap'>{device.name}</h3>
                          <p className='text-xs text-slate-500'>{device.category}</p>
                        </div>
                      </div>
                      <div className='rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white shadow-sm'>
                        {device.category === 'Mobile' && 'SM'}
                        {device.category === 'Tablet' && 'MD'}
                        {device.category === 'Desktop' && 'LG'}
                      </div>
                    </div>
                    <p className='text-sm font-medium text-slate-700'>
                      {device.width}px × {device.height}px
                    </p>
                  </div>

                  {/* Specs Grid */}
                  <div className='grid grid-cols-2 gap-3 mb-5 relative z-10'>
                    <div className='rounded-xl border border-slate-200 bg-slate-50/90 p-3'>
                      <p className='text-xs text-slate-600 font-medium'>Width</p>
                      <p className='text-lg font-semibold text-slate-900'>{device.width}px</p>
                    </div>
                    <div className='rounded-xl border border-slate-200 bg-slate-50/90 p-3'>
                      <p className='text-xs text-slate-600 font-medium'>Height</p>
                      <p className='text-lg font-semibold text-slate-900'>{device.height}px</p>
                    </div>
                  </div>

                  {/* Breakpoint Info */}
                  <div className='relative z-10 mb-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 p-4 text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)]'>
                    <p className='text-xs font-medium opacity-90 mb-1'>Breakpoint Range</p>
                    <p className='text-sm font-medium'>{device.minWidth}px — {device.maxWidth}px</p>
                  </div>

                  {/* Preview Thumbnail */}
                  <div className='relative z-10 flex h-20 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white'>
                    <div
                      className='rounded border border-slate-300 bg-slate-100 transition-all'
                      style={{
                        width: Math.min(device.width / 3, 80),
                        height: Math.min(device.height / 3, 60),
                      }}
                    ></div>
                  </div>

                  {/* Search Prompt Text */}
                  <div className='relative z-10 mt-4 text-center text-xs text-slate-500'>
                    <p>Search a URL to see preview</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DevicePreview
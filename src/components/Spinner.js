import React from 'react'
import './Spinner.css'

const Spinner = () => {
  return (
    <div className='flex flex-col items-center spacey-2'>
        <div className='custom-loader'></div>
        <p className='text-bgDark text-lg font-semibold'>Loading...</p>
    </div>
  )
}

export default Spinner
import React from 'react'

function InfoMessage({ message } : { message: string }) {
  return (
    <div className='p-5 border border-gray-400 text-sm text-gray-600 bg-gray-100 rounded'>
        {message}
    </div>
  )
}

export default InfoMessage
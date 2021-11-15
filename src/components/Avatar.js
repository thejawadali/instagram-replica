import React from 'react'

function Avatar({letter}) {
  return (
    <div className="cursor-pointer w-9 h-9 bg-gray-50 ring-1 ring-black rounded-full text-xl flex justify-center items-center">
      {letter}
    </div>
  )
}

export default Avatar

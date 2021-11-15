import React from 'react'

function Avatar({letter, image}) {
  return (
    <div className="cursor-pointer overflow-hidden w-9 h-9 bg-gray-50 ring-1 ring-black rounded-full text-xl flex justify-center items-center">
      {image ?<img className="object-contain" src={image} alt="" /> 
    :  
      <span>{letter}</span>
    }
    </div>
  )
}

export default Avatar

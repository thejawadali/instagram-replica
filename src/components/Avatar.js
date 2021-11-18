import React from 'react'

function Avatar ( { letter, image, small = false } ) {
  return (
    <div className={`cursor-pointer overflow-hidden  bg-gray-50 ring-1 ring-black rounded-full text-xl flex justify-center items-center ${small ? "w-6 h-6 mx-2" : "w-9 h-9"}`}>
      {image ? <img className="object-cover h-full w-full" src={image} alt="" />
        :
        <span>{letter}</span>
      }
    </div>
  )
}

export default Avatar

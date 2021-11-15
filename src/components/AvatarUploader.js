import React, { useState } from 'react'
import { AiFillCamera } from "react-icons/ai"

function AvatarUploader ( { handleChange } ) {

  const [imageURL, setImageURL] = useState( "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" )

  function loadFile ( e ) {
    const img = e.target.files[0]
    handleChange( img )
    setImageURL( URL.createObjectURL( img ) )
  }

  return (
    <div
      className="
      my-4
      text-transparent
      flex
      justify-center
      items-center
      transition-all
      duration-1000
      ease
    "
    >
      <label
        className="
        cursor-pointer
        w-28
        h-28
        rounded-full
        flex
        justify-center
        items-center
        hover:bg-black
        opacity-70
        text-xs
        z-50
        hover:text-white
      "
        htmlFor="file"
      >
        <AiFillCamera />
        <span>Change Image</span>
      </label>
      <input accept=".jpg, .png" className="hidden" id="file" type="file" onChange={loadFile} />
      <img className="absolute object-cover w-28 h-28 shadow-lg rounded-full z-0" src={imageURL} alt="profilePic" />
    </div>
  )
}

export default AvatarUploader

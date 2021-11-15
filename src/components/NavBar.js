import React, { useState } from 'react'
import { createPortal } from "react-dom"
import { AiFillHome } from "react-icons/ai"
import { FiHeart, FiPlusSquare, FiSend } from "react-icons/fi"
import { getFirstLetterOfUserName } from "../utils"
import PostUploader from "./PostUploader";

function NavBar () {
  const [showModal, setShowModal] = useState( false )

  function addPost () {
    setShowModal( true )
  }


  return (
    <nav className="border-b border-gray-200 bg-white px-4 py-3 flex justify-center sticky top-0">
      <div className="w-full md:w-10/12 lg:w-1/2 flex justify-between items-center">
        {/* Logo */}
        <img className="w-28" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="logo" />
        {/* Icons */}
        <div className="cursor-pointer flex items-center">
          <AiFillHome className="cursor-pointer w-6 h-6 mx-2" />
          <FiSend className="cursor-pointer w-6 h-6  mx-2" />
          <FiPlusSquare onClick={addPost} className="cursor-pointer w-6 h-6  mx-2" />
          <FiHeart className="cursor-pointer w-6 h-6  mx-2" />
          <span className="cursor-pointer w-6 h-6  mx-2 border border-black flex items-center justify-center rounded-full">{getFirstLetterOfUserName(localStorage.getItem("userName"))}</span>
        </div>
        {createPortal( <PostUploader isActive={showModal} closeModal={() => { setShowModal( false ) }} />, document.getElementById( "modal-root" ) )}

      </div>
    </nav>
  )
}


export default NavBar

import React from 'react'
import { AiFillHome } from "react-icons/ai"
import { FiPlusSquare, FiSend, FiHeart } from "react-icons/fi"


function NavBar () {
  return (
    <nav className="border-b border-gray-200 bg-white px-4 py-3 flex justify-center sticky top-0">
      <div className="w-full md:w-10/12 lg:w-1/2 flex justify-between items-center">
        {/* Logo */}
        <img className="w-28" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="logo" />
        {/* Icons */}
        <div className="cursor-pointer flex items-center">
          <AiFillHome className="cursor-pointer w-6 h-6 mx-2" />
          <FiSend className="cursor-pointer w-6 h-6  mx-2" />
          <FiPlusSquare className="cursor-pointer w-6 h-6  mx-2" />
          <FiHeart className="cursor-pointer w-6 h-6  mx-2" />
          <span className="cursor-pointer w-6 h-6  mx-2 border border-black flex items-center justify-center rounded-full">A</span>
        </div>
      </div>
    </nav>
  )
}

export default NavBar

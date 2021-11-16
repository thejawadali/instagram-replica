import React, { useState } from 'react'
import { createPortal } from "react-dom"
import { AiFillHome } from "react-icons/ai"
import { FiHeart, FiPlusSquare, FiLogOut, FiSend } from "react-icons/fi"
import { getFirstLetterOfUserName } from "../utils"
import { useNavigate } from "react-router-dom";
import PostUploader from "./PostUploader"
import { getAuth, signOut } from "firebase/auth"
import Avatar from "./Avatar"

function NavBar () {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState( false )
  const [dialogOpened, setDialogOpened] = useState( false )

  function addPost () {
    setShowModal( true )
  }

  function logout () {
    const auth = getAuth()
    signOut( auth ).then( () => {
      setDialogOpened( false )
      navigate("/signin");
      localStorage.clear()
    } ).catch( ( error ) => {
      console.error( error.message )
    } )
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
          <div onClick={() => { setDialogOpened( dialogOpened ? false : true ) }}>
            <Avatar letter={getFirstLetterOfUserName( localStorage.getItem( "userName" ) )} image={localStorage.getItem( "profilePic" )} small />
            {dialogOpened &&
              <ul className="absolute top-8 right-10 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700">
                <li>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a onClick={logout} className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-800">
                    <FiLogOut className="mr-3 w-5 h-5" />
                    Logout
                  </a>
                </li>
              </ul>
            }
          </div>
          {/* <span className="cursor-pointer w-6 h-6  mx-2 border border-black flex items-center justify-center rounded-full">{}</span> */}
        </div>
        {createPortal( <PostUploader isActive={showModal} closeModal={() => { setShowModal( false ) }} />, document.getElementById( "modal-root" ) )}

      </div>
    </nav>
  )
}


export default NavBar

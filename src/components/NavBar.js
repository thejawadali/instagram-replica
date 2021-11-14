import React, { useState } from 'react'
import { createPortal } from "react-dom"
import { AiFillHome } from "react-icons/ai"
import { FiPlusSquare, FiSend, FiHeart } from "react-icons/fi"
import { BsFillImageFill } from "react-icons/bs"


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
          <span className="cursor-pointer w-6 h-6  mx-2 border border-black flex items-center justify-center rounded-full">A</span>
        </div>
        {createPortal( <Modal isActive={showModal} closeModal={() => { setShowModal( false ) }} />, document.getElementById( "modal-root" ) )}

      </div>
    </nav>
  )
}

function Modal ( { isActive, closeModal } ) {

  const [image, setImage] = useState( "" )

  function Upload () {
    setImage( "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2610&q=80" )
  }

  function AddPost ( e ) {
    e.preventDefault()
    console.log( "Create Post" )
  }



  return (
    <>
      {isActive ? (
        <>
          <div
            id="backdrop"
            onClick={( e ) => {
              if ( e.target.id === "backdrop" ) {
                closeModal()
              }
            }}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative my-6 mx-auto w-11/12 md:w-4/5 lg:w-1/2">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="text-center py-4 border-b border-solid border-gray-200 rounded-t">
                  <h3 className="text-xl  font-semibold">
                    Create New Post
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex justify-center h-96">
                  {/* upload image */}
                  {/* <BsFillImageFill className="w-20 h-20" /> */}
                  {
                    !image ? (
                      <div className="flex justify-center items-center flex-col">
                        <BsFillImageFill className="w-20 h-20" />
                        <h1 className="my-3 text-gray-600">Drop Photo Here</h1>
                        <label htmlFor="uploader" >
                          <span className="bg-blue-500 text-white px-3 rounded py-1 cursor-pointer">Select from computer</span>
                          <input type="file" id="uploader" className="hidden" />
                        </label>
                      </div>
                    ) : ( <div>
                      <img className="w-96 h-44 shadow-xl rounded object-cover" src={image} alt="photoSelected" />
                      <form onSubmit={AddPost} className="mt-8 text-right">
                        <textarea name="" id="" placeholder="Caption..." cols="30" rows="3" className="resize-none my-1 border w-full px-2 py-1 outline-none focus:ring-1 rounded"></textarea>
                        <button type="submit" className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600">Post</button>
                      </form>
                    </div> )
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default NavBar

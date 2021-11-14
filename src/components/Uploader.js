import { addDoc, collection, serverTimestamp} from "firebase/firestore"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import React, { useState } from 'react'
import { BsFillImageFill } from "react-icons/bs"
import db from "../firebase"


function Uploader ( { isActive, closeModal } ) {
  const storage = getStorage()

  const [uploadingStarts, setUploadingStarts] = useState( false )
  const [image, setImage] = useState( null )
  const [imageToUpload, setImageToUpload] = useState( null )
  const [caption, setCaption] = useState( "" )
  const [progress, setProgress] = useState( 0 )

  function Upload ( event ) {
    if ( event.target.files && event.target.files[0] ) {
      let img = event.target.files[0]
      setImageToUpload( img )
      setImage( URL.createObjectURL( img ) )
    }
  }

  function AddPost ( e ) {
    e.preventDefault()
    if ( !imageToUpload || uploadingStarts) {
      alert( "Upload Image first or uploading started already" )
      return
    }
    setUploadingStarts(true)
    const uploadTask = uploadBytesResumable( ref( storage, `images/${imageToUpload.name}` ), imageToUpload )
    uploadTask.on( 'state_changed',
      ( snapshot ) => {
        setProgress( ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100 )
      },
      ( error ) => {
        console.error( error.message )
      },
      () => {
        getDownloadURL( uploadTask.snapshot.ref ).then( ( url ) => {
          addDoc( collection( db, "insta-posts" ), {
            createdAt: serverTimestamp(),
            caption,
            image: url,
            userName: "Jawad Ali"
          } ).then( () => {
            setCaption( "" )
            setImage( "" )
            setImageToUpload( null )
            setProgress( 0 )
            closeModal()
            setUploadingStarts(false)
          } )
        } )
      }
    )
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
                {progress > 0 && <progress value={progress} max="100" className="w-full h-2" />}

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
                          <input accept=".gif, .jpg, .png," onChange={Upload} type="file" id="uploader" className="hidden" />
                        </label>
                      </div>
                    ) : ( <div>
                      <img className="w-96 h-44 shadow-xl rounded object-cover" src={image} alt="photoSelected" />
                      <form onSubmit={AddPost} className="mt-8 text-right">
                        <textarea value={caption} onChange={( e ) => { setCaption( e.target.value ) }} name="" id="" placeholder="Caption..." cols="30" rows="3" className="resize-none my-1 border w-full px-2 py-1 outline-none focus:ring-1 rounded"></textarea>
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

export default Uploader

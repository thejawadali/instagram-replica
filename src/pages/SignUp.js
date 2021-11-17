import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { validateEmail } from "../utils"
import AvatarUploader from "../components/AvatarUploader"
import { Link  } from "react-router-dom";
import imageCompression from 'browser-image-compression';

function SignUp () {
  const [name, setName] = useState( "" )
  const [email, setEmail] = useState( "" )
  const [password, setPassword] = useState( "" )
  const [validity, setValidity] = useState( false )
  const [profilePic, setProfilePic] = useState( "" )
  const [progress, setProgress] = useState( 0 )

  const storage = getStorage()

  async function signUp ( e ) {
    e.preventDefault()
    if ( !validity ) {
      console.warn( "Invalid form" )
      return
    }
    const auth = getAuth()
    if ( !profilePic ) {

      createUserWithEmailAndPassword( auth, email, password ).then( ( userCredential ) => {
        const user = userCredential.user
        updateProfile( auth.currentUser, {
          displayName: name
        } ).then( () => {
          setName( "" )
          setEmail( "" )
          setPassword( "" )
          localStorage.setItem( "userName", user.displayName )
          window.history.pushState( {}, undefined, "/" )
          window.location.reload()
        } )
      } )
        .catch( ( error ) => {
          alert( error.message )
        } )
    } else {
      // compress image size
      const fileToUpload = await imageCompression(profilePic, {
        maxSizeMB: 1
      })
      const uploadTask = uploadBytesResumable( ref( storage, `profiles/${profilePic.name}` ), fileToUpload )
      uploadTask.on( 'state_changed',
        ( snapshot ) => {
          setProgress( ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100 )
        },
        ( error ) => {
          console.error( error.message )
        },
        () => {
          getDownloadURL( uploadTask.snapshot.ref ).then( ( url ) => {
            createUserWithEmailAndPassword( auth, email, password ).then( ( userCredential ) => {
              const user = userCredential.user
              updateProfile( auth.currentUser, {
                displayName: name,
                photoURL: url
              } ).then( () => {
                setName( "" )
                setEmail( "" )
                setPassword( "" )
                setProfilePic( "" )
                localStorage.setItem( "userName", user.displayName )
                localStorage.setItem( "profilePic", url )
                window.history.pushState( {}, undefined, "/" )
                window.location.reload()
              } )
            } )
              .catch( ( error ) => {
                alert( error.message )
              } )
          } )
        }
      )
    }
  }


  function uploadProfilePic ( file ) {
    setProfilePic( file )
  }

  useEffect( () => {
    if ( validateEmail( email ) && password.length >= 8 && name ) {
      setValidity( true )
    } else {
      setValidity( false )
    }
  }, [email, password, validity, name] )

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {/* container */}
      <div className="bg-white border w-96 flex flex-col items-center pb-9">
        <progress value={progress} max="100" className={`w-full h-2 mb-9 ${progress > 0 ? "opacity-100" : "opacity-0"}`}/>
        {/* insta logo */}
        <img className="w-28" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="logo" />
        <form onSubmit={signUp} className="flex flex-col my-4 w-full px-12">
          <AvatarUploader handleChange={uploadProfilePic} />
          <input value={name} onChange={( e ) => { setName( e.target.value ) }} type="text" placeholder="Name" className="border px-2 py-1 text-sm outline-none bg-gray-50 active:bg-gray-100 my-2" />
          <input value={email} onChange={( e ) => { setEmail( e.target.value ) }} type="email" placeholder="Email" className="border px-2 py-1 text-sm outline-none bg-gray-50 active:bg-gray-100 my-2" />
          <input value={password} onChange={( e ) => { setPassword( e.target.value ) }} type="password" placeholder="password" className="border px-2 py-1 text-sm outline-none bg-gray-50 active:bg-gray-100 my-2" />
          <button type="submit" className={`bg-blue-500 text-white py-1 rounded-md my-2 ${validity ? 'opacity-100 cursor-pointer' : 'opacity-30 cursor-default'}`}>Sign Up</button>
        </form>
        <p className="text-sm">Already Register?<Link className="mx-1 text-blue-600 font-bold" to="/signin">Sign In</Link></p>
      </div>
    </div>
  )
}

export default SignUp

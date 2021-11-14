import React, { useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { validateEmail } from "../utils"

function SignIn () {
  const [name, setName] = useState( "" )
  const [email, setEmail] = useState( "" )
  const [password, setPassword] = useState( "" )
  const [validity, setValidity] = useState( false )

  function signIn ( e ) {
    e.preventDefault()
    if ( !validity ) {
      console.warn( "Invalid form" )
      return
    }
    const auth = getAuth()
    createUserWithEmailAndPassword( auth, email, password ).then( ( userCredential ) => {
      const user = userCredential.user
      updateProfile( auth.currentUser, {
        displayName: name
      } ).then( () => {
        setName( "" )
        setEmail( "" )
        setPassword( "" )
        
      } )
    } )
      .catch( ( error ) => {
        alert( error.message )
      } )
  }

  useEffect( () => {
    if ( validateEmail( email ) && password.length >= 8 && name ) {
      setValidity( true )
    } else {
      setValidity( false )
    }
  }, [email, password, validity, name] )

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {/* container */}
      <div className="bg-white border w-96 flex flex-col items-center py-9">
        <img className="w-28" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="logo" />
        <form onSubmit={signIn} className="flex flex-col my-4 w-full px-12">
          <input value={name} onChange={( e ) => { setName( e.target.value ) }} type="text" placeholder="Name" className="border px-2 py-1 text-sm outline-none bg-gray-50 active:bg-gray-100 my-2" />
          <input value={email} onChange={( e ) => { setEmail( e.target.value ) }} type="email" placeholder="Email" className="border px-2 py-1 text-sm outline-none bg-gray-50 active:bg-gray-100 my-2" />
          <input value={password} onChange={( e ) => { setPassword( e.target.value ) }} type="password" placeholder="password" className="border px-2 py-1 text-sm outline-none bg-gray-50 active:bg-gray-100 my-2" />
          <button type="submit" className={`bg-blue-500 text-white py-1 rounded-md my-2 ${validity ? 'opacity-100 cursor-pointer' : 'opacity-30 cursor-default'}`}>Log In</button>
        </form>
      </div>
    </div>
  )
}

export default SignIn

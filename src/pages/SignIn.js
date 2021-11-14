import React from 'react'
import { FcGoogle } from "react-icons/fc";

function SignIn() {

  function signIn(){
    console.log("User Sign Up");
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {/* container */}
      <div className="bg-white border w-96 flex flex-col items-center py-9">
      <img className="w-28" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="logo" />
      <button onClick={signIn} className="flex my-4 bg-gray-50 border border-gray-400 hover:bg-gray-100 items-center p-2 rounded-md"> <FcGoogle className="w-8 h-8 mx-1"/> Sign In With Google</button>
      </div>
    </div>
  )
}

export default SignIn

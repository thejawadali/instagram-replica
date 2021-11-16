import { useEffect, useState } from "react"
import {orderBy, collection, onSnapshot, query } from "firebase/firestore"
import Navbar from "./components/NavBar"
import Post from "./components/Post"
import { Routes, Route } from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import db from "./firebase"

function App () {

  const [posts, setPosts] = useState( [] )


  // fetch posts from db
  useEffect( () => {
    //load posts from firebase
    onSnapshot( query( collection( db, "insta-posts" ), orderBy("createdAt", "desc") ), snapshot => {
      setPosts( snapshot.docs.map( doc => ( {
        id: doc.id,
        post: doc.data()
      } ) ) )
      // const dummyPosts = []
      // snapshot.forEach( snap => {
      //   dummyPosts.push( {
      //     ...snap.data(),
      //     id: snap.id
      //   } )
      // } )
      // setPosts( dummyPosts )
    } )
  }, [] )

  return (
    <div className="bg-gray-100 w-full min-h-screen">
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

    </div>
  )
}

function Home ( { posts } ) {
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto py-5">
        {posts.map( post => <Post key={post.id} post={post.post} postId={post.id} /> )}
      </div>
    </div> )
}


export default App

import { useEffect, useState } from "react"
import { collection, onSnapshot, query } from "firebase/firestore"
import Navbar from "./components/NavBar"
import Post from "./components/Post"
import { Routes, Route} from "react-router-dom"
import SignIn from "./pages/SignIn"
import db from "./firebase"

function App () {
  
  const [posts, setPosts] = useState( [] )


  // fetch posts from db
  useEffect( () => {
    //load posts from firebase
    onSnapshot( query( collection( db, "insta-posts" ) ), snapshot => {
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
    <div className="bg-gray-100 w-full">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/test" element={<Home posts={posts} />} />
      </Routes>

    </div>
  )
}

function Home ( { posts } ) {
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto py-5">
        {posts.map( post => <Post key={post.id} post={post.post} /> )}
      </div>
    </div> )
}

export default App

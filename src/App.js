import Navbar from "./components/NavBar"
import Post from "./components/Post"

function App () {
  return (
    <div className="bg-gray-100 w-full">
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <Post />
      </div>
    </div>
  )
}

export default App

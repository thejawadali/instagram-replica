import { FaRegComment } from "react-icons/fa"
import { FiHeart, FiSend } from "react-icons/fi"
import { MdBookmarkBorder } from "react-icons/md"
import Avatar from "./Avatar"


function Post () {
  return (
    <div className="border bg-white">
      {/* Post Header */}
      <div className="flex items-center px-4 py-3">
        {/* Avatar */}
        <Avatar />
        <div className="flex flex-col mx-3 ">
          <h2 className="cursor-pointer text-lg text-bold">Jawad Ali</h2>
          <p className="text-xs cursor-pointer">Lahore</p>
        </div>
      </div>
      {/* image */}
      <img className="w-full border-t border-b object-contain" src="https://images.unsplash.com/photo-1582004531564-50f300aae039?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2342&q=80" alt="postImage" />
      {/* Actions */}
      <div className="flex px-2 py-4 justify-between">
        <div className="flex ">
          <FiHeart className="cursor-pointer w-6 h-6 font-thin mx-2" />
          <FaRegComment className="cursor-pointer w-6 h-6 font-thin mx-2" />
          <FiSend className="cursor-pointer w-6 h-6 font-thin mx-2" />
        </div>
          <MdBookmarkBorder className="cursor-pointer w-7 h-7 font-thin mx-2" />
      </div>
      {/* likes */}
      <p className="text-sm font-bold mx-4 mb-2">34,333 likes</p>
      {/* Caption */}
      <p className="text-sm ml-4"><strong className="mr-1">Jawad Ali</strong>Lorem ipsum dolor, sit amet consectetur adipisicing</p>

      {/* for now show only one comment */}
      <p className="text-xs my-2 text-gray-400 cursor-pointer ml-4">View all 344 comments</p>
      <p className="text-sm ml-4"><strong className="mr-1">Hammad Asif</strong>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias quae ullam magni saepe dolorem, esse hic, illum ipsam, dolore temporibus aspernatur cumque quas ducimus. Voluptas deserunt asperiores praesentium eos laudantium.</p>

      {/* Add Comment */}
      <form onSubmit={(e) => {e.preventDefault();}} className="w-full flex px-4 border-t mt-4">
        <input className="flex-1 outline-none py-4 bg-transparent" type="text" placeholder="Add a comment..." />
        <button type="submit" className="text-blue-600 font-semibold">Post</button>
      </form>
    </div>
  )
}

export default Post

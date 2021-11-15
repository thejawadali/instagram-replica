import { FaRegComment } from "react-icons/fa"
import { FiHeart, FiSend } from "react-icons/fi"
import { MdBookmarkBorder } from "react-icons/md"
import { getFirstLetterOfUserName } from "../utils"
import Avatar from "./Avatar"


function Post ({post}) {
  
  return (
    <div className="border bg-white my-10">
      {/* Post Header */}
      <div className="flex items-center px-4 py-3">
        {/* Avatar */}
        <Avatar letter={getFirstLetterOfUserName(post.userName)} image={post.profilePic} />
        <div className="flex flex-col mx-3 ">
          <h2 className="cursor-pointer text-lg text-bold">{post.userName}</h2>
          <p className="text-xs cursor-pointer">{post.city}</p>
        </div>
      </div>
      {/* image */}
      <img className="w-full border-t border-b object-contain" src={post.image} alt="postImage" />
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
      <p className="text-sm font-bold mx-4 mb-2">{post.likes || "0"} likes</p>
      {/* Caption */}
      <p className="text-sm ml-4"><strong className="mr-1">{post.userName}</strong>{post.caption}</p>

      {/* for now show only one comment */}
      <p className="text-xs my-2 text-gray-400 cursor-pointer ml-4">View all {post.comments} comments</p>
      <p className="text-sm ml-4"><strong className="mr-1">Hammad Asif</strong>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias quae ullam magni saepe dolorem, esse hic, illum ipsam, dolore temporibus aspernatur cumque quas ducimus. Voluptas deserunt asperiores praesentium eos laudantium.</p>

      {/* Add Comment */}
      <form onSubmit={(e) => {e.preventDefault();}} className="w-full flex px-4 border-t mt-4">
        <input className="flex-1 outline-none py-3 bg-transparent" type="text" placeholder="Add a comment..." />
        <button type="submit" className="text-blue-600 font-semibold">Post</button>
      </form>
    </div>
  )
}

export default Post

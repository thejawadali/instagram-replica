import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { FaRegComment } from "react-icons/fa"
import { FiHeart, FiSend } from "react-icons/fi"
import db from "../firebase"
import { getFirstLetterOfUserName, timeDifference } from "../utils"
import Avatar from "./Avatar"
import Comment from "./Comment"


function Post ( { post, postId } ) {

  const [isActive, setIsActive] = useState( false )
  const [caption, setCaption] = useState( "" )
  const [comments, setComments] = useState( [] )
  const [commentText, setCommentText] = useState( "" )

  function closeModal () {
    setIsActive( false )
    setCaption( "" )
  }
  function openModal () {
    if ( post.userName === localStorage.getItem( "userName" ) ) {
      alert( "Can not share" )
      return
    }
    setIsActive( true )
  }


  async function likePost () {
    const ref = doc( db, "insta-posts", postId )
    try {
      await updateDoc( ref, {
        likes: post.likes + 1
      } )
    } catch ( error ) {
      console.error( error.message )
    }
  }


  async function postComment ( e ) {
    e.preventDefault()
    if ( !commentText ) {
      alert( "Comment can not be empty" )
      return
    }
    try {
      setCommentText( "" )
      await addDoc( collection( db, `insta-posts/${postId}/comments` ), {
        text: commentText,
        createdAt: serverTimestamp(),
        userName: localStorage.getItem( "userName" )
      } )
    } catch ( error ) {
      console.error( error.message )
    }
  }

  // fetch comments of a post
  useEffect( () => {

    async function fetchComments () {
      try {
        onSnapshot( query( collection( db, `insta-posts/${postId}/comments` ), orderBy( "createdAt", "desc" ) ), snapShot => {
          setComments( snapShot.docs.map( doc => ( {
            id: doc.id,
            comment: doc.data()
          } ) ) )
        } )
      } catch ( error ) {
        console.error( error.message )
      }
    }
    fetchComments()
  }, [postId] )



  async function share ( e ) {
    e.preventDefault()
    try {
      await addDoc( collection( db, "insta-posts" ), {
        createdAt: serverTimestamp(),
        caption,
        image: post.image,
        userName: localStorage.getItem( "userName" ),
        profilePic: localStorage.getItem( "profilePic" )
      } )
      closeModal()
    } catch ( e ) {
      console.error( e.message )
    }
  }

  return (
    <div className="border bg-white my-10">
      {/* Post Header */}
      <div className="flex items-center px-4 py-3">
        {/* Avatar */}
        <Avatar letter={getFirstLetterOfUserName( post.userName )} image={post.profilePic} />
        <div className="flex flex-col mx-3 ">
          <h2 className="cursor-pointer text-lg text-bold">{post.userName}</h2>
          <p className="text-xs cursor-pointer">{post.city}</p>
        </div>
      </div>
      {/* image */}
      <img onDoubleClick={likePost} className="w-full border-t border-b object-contain" src={post.image} alt="postImage" />
      {/* Actions */}
      <div className="flex px-2 py-4 justify-between">
        <div className="flex ">
          <FiHeart onClick={likePost} className="cursor-pointer w-6 h-6 font-thin mx-2" />
          <label htmlFor="commentInput">

            <FaRegComment className="cursor-pointer w-6 h-6 font-thin mx-2" />
          </label>
          <FiSend onClick={openModal} className="cursor-pointer w-6 h-6 font-thin mx-2" />
        </div>
        {/* <MdBookmarkBorder className="cursor-pointer w-7 h-7 font-thin mx-2" /> */}
      </div>
      {/* likes */}
      <p className="text-sm font-bold mx-4 mb-2">{post.likes || "0"} likes</p>
      {/* Caption */}
      <p className="text-sm mx-4"><strong className="mr-1">{post.userName}</strong>{post.caption}</p>
      {/* Comments */}
      <p className="text-xs mt-2 text-gray-400 cursor-pointer ml-4">{comments.length} comments</p>
      {comments.map( comment => <Comment key={comment.id} userName={comment.comment.userName} text={comment.comment.text} /> )}


      {/* duration */}
      {
        post.createdAt &&
        <p className="text-xs mt-3 text-gray-400 cursor-pointer mx-4">{timeDifference( post.createdAt.toDate() )}</p>
      }
      {/* Add Comment */}
      <form onSubmit={postComment} className="w-full flex px-4 border-t mt-2">
        <input id="commentInput" value={commentText} onChange={( e ) => { setCommentText( e.target.value ) }} className="flex-1 outline-none py-3 bg-transparent" type="text" placeholder="Add a comment..." />
        <button type="submit" className={`font-semibold text-blue-600 ${commentText ? "opacity-100" : "opacity-30 cursor-default"}`}>Post</button>
      </form>

      {/* Modal to share post */}

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
                    Share Post
                  </h3>
                </div>

                {/*body*/}
                <div className="relative p-6 flex justify-center">
                  <form onSubmit={share} className="mt-8 text-right">
                    <textarea value={caption} onChange={( e ) => { setCaption( e.target.value ) }} name="" id="" placeholder="Change caption" cols="30" rows="3" className="resize-none my-1 border w-full px-2 py-1 outline-none focus:ring-1 rounded"></textarea>
                    <button type="submit" className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600">Share</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}















    </div>


  )
}

export default Post

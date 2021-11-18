import React from 'react'

function Comment ({userName, text}) {
  return (
    <p className="text-sm mx-4 mb-3"><strong className="mr-1">{userName}</strong>{text}</p>
  )
}

export default Comment

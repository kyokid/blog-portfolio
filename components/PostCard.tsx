import React from 'react'

const PostCard = ({ post }) => {
  return (
    <div>
      <h2 className='text-2xl font-bold'>{post.title}</h2>
      <p className='text-gray-600'>{post.excerpt}</p>
    </div>
  )
}

export default PostCard
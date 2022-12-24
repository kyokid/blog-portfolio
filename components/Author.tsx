import React from 'react'

const Author = ({ author }) => {
  return (
    <div className='absolute left-0 right-2 -top-14'>
      <img 
        alt={author.title}
        height='100px'
        width='100px'
        className='rounded-full align-middle mr-4'
        src={author.photo.url}
      />
      <h3 className='text-white my-4 text-xl font-bold'>{author.name}</h3>
    </div>
  )
}

export default Author
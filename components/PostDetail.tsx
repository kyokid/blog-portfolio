import React from 'react'
import moment from 'moment'

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>)
      }
      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>)
      }
      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>)
      }
    }
    
    switch (type) {
      case 'paragraph':
        return (<p key={index} className='mb-8'>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>)
      case 'heading-four':
        return (<h4 key={index} className='text-md mb-4 font-semibold'>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>)
      case 'heading-three':
        return (<h3 key={index} className='text-xl mb-4 font-semibold'>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>)
      case 'image':
        return (<img key={index} src={obj.src} alt={obj.title} height={obj.height} width={obj.width} className='w-full mb-8' />)
      default:
        return modifiedText

    }
  }

  console.log(post.content.raw)
  return (
    <div className='bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>
      <div className='relative overflow-hidden shadow-md mb-6'>
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className='object-top h-full w-full rounded-t-lg' />
      </div>
      <div className='px-4 lg:px-0'>
        <div className='flex items-center mb-8 w-full'>
          <div className='flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8'>
            {post.authors.map((author) => (
              <>
                <img
                  alt={author.name}
                  height='40'
                  width='40'
                  className='rounded-full align-middle mr-4'
                  src={author.photo.url}
                />
                <p className='inline align-middle text-gray-700 ml-2 text-lg'>{author.name}</p>
              </>
            ))}
          </div>
          <div className='font-medium text-gray-700'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>
              {moment(post.createdAt).format('MMM Do YYYY')}
            </span>
          </div>
        </div>
        <h1 className='mb-8 text-3xl font-semibold'>
          {post.title}
        </h1>
          {post.content.raw.children.map((content, index) => {
          const children = content.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item))
          return getContentFragment(index, children, content, content.type)  
          })}
      </div>
    </div>
  )
}

export default PostDetail
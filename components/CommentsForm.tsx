import React, { useRef, useState, useEffect } from 'react'
import { submitComment } from '../services'

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [formData, setFormData] = useState({ name: null, email: null, comment: null, storeData: false })

  useEffect(() => {
    setLocalStorage(window.localStorage)
    const initialFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeData: window.localStorage.getItem('name') || window.localStorage.getItem('email')
    }
    setFormData(initialFormData)
  }, [])

  const onInputChange = (e) => {
    const { target } = e
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({ ...prevState, [target.name]: target.checked }))
    } else {
      setFormData((prevState) => ({ ...prevState, [target.name]: target.value }))
    }
  }

  const handleCommentSubmission = () => {
    const { name, email, comment, storeData } = formData

    setError(false)

    if (!comment || !name || !email) {
      setError(true)
      return
    }

    const commentObj = {
      comment,
      name,
      email,
      slug
    }

    if (storeData) {
      localStorage.setItem('name', name)
      localStorage.setItem('email', email)
    } else {
      localStorage.removeItem('name')
      localStorage.removeItem('email')
    }

    submitComment(commentObj)
      .then(res => {
        if (res.createComment) {
          if (!storeData) {
            formData.name = ''
            formData.email = ''
          }
          formData.comment = ''
          setFormData((prevState) => ({ ...prevState, ...formData }))
          setShowSuccessMessage(true)
          setTimeout(() => {
            setShowSuccessMessage(false)
          }, 3000)
        }
      })

  }
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 p-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Leave a reply</h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea
          value={formData.comment}
          onChange={onInputChange}
          className='p-4 outline-none w-full rounded-lg focus:ring-2-gray-200 bg-gray-100 text-gray-700'
          placeholder='Your comment'
          name='comment'
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        <input
          type='text'
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2-gray-200 bg-gray-100 text-gray-700'
          placeholder='Your name'
          name='name'
          value={formData.name}
          onChange={onInputChange}
        />
        <input
          type='text'
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2-gray-200 bg-gray-100 text-gray-700'
          placeholder='Your email'
          name='email'
          value={formData.email}
          onChange={onInputChange}
        />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input
            type='checkbox'
            id='storeData'
            name='storeData'
            value='true'
            checked={formData.storeData}
          />
          <label className='text-gray-500 cursor-pointer ml-2' htmlFor='storeData'>Save my e-mail and name for the next time I comment.</label>
        </div>
      </div>
      {error && <p className='text-xs text-red-500'>All fields are required.</p>}
      <div className='mt-8'>
        <button
          type='button'
          onClick={handleCommentSubmission}
          className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-green-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer'>
          Post Comment
        </button>
        {showSuccessMessage && <span className='text-xl float-right font-semibold mt-3 text-green-600'>Comment submitted for review.</span>}
      </div>
    </div>
  )
}

export default CommentsForm
import React, { useState, useEffect } from 'react'
import moment from 'moment/moment'
import parse from 'html-react-parser'
import { getComments } from '../services'
import { comment } from 'postcss'

const Comment = ({ slug }) => {
  const [comments, setcomments] = useState([]);
  useEffect(() => {
    getComments(slug).then((comments) => setcomments(comments))
  }, [slug]);
  return (
    <>
      {comment.length > 0 && (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-6 mb-2 text-black'>
          <h2 className='text-xl mb-8 font-semibold border-b pb-2'>
            {comments.length}
            {' '}
            Comments
          </h2>
          {
            comments.map((comment) => {
              return(
                <div key={comment.createdAt} className= 'border-b border-gray-100 mb-4 pb-4 text-black'>
                  <p className='mb-4 text-black'>
                    <span className='font-semibold'> {comment.name} </span>
                    {' '}
                    on
                    {' '}
                    {moment(comment.createAt).format('MMMM DD, YYYY')}
                  </p>
                  <p>
                    {comment.comment}
                  </p>
                </div>
              )
            })
          }
        </div>
      )}
    </>
  )
}

export default Comment
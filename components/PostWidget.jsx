/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { getRecentPosts, getSimilarPosts } from '../services'
import Image from 'next/image'
import moment from 'moment/moment'
import Link from 'next/link'

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug]);


  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {slug ? "Related Post" : "Recent Post"}
      </h3>
      {
        relatedPosts.map(post => {
          return(
            <div key={post.title} className = 'flex items-center w-full mb-4' >
              <div className='w-16 flex-none'>
                  <Image 
                    src={post.featuredImage.url}
                    alt = 'author-image'
                    height={50}
                    width={50}
                    className = 'rounded-full'
                  />
              </div>
              <div className='flex-grow ml-4'>
                <p className='text-gray-500 font-xs'> {moment(post.createdAt).format('MMMM DD, YYYY')} </p>
                <Link href={`/post/${post.slug}`} key={post.title} className='text-md'>
                  {post.title}
                </Link>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default PostWidget
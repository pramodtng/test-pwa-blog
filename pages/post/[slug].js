import React from 'react'
import { PostWidget, Categories, Author, BlogDetails, Comment, CommentForm, Loader } from '../../components';
import { getPostDetails, getPosts } from './../../services/index';
import { useRouter } from 'next/router';



const Blogs = ({ post }) => {
  const router = useRouter()
  if(router.isFallback) {
    return <Loader />
  }
  return (
    <div className='container mx-auto px-10 pb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1 text-white'>
          <BlogDetails post={post} />
          <Author author={post.author} />
          <CommentForm slug={post.slug} />
          <Comment slug={post.slug} />
        </div>
        <div className='col-span-1 lg:col-span-4'>
          <div className='relative lg:sticky top-8'>
            <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}
export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug)
  return {
    props: {
      post: data
    }
  }
}

export async function getStaticPaths() {
  const posts = await getPosts()
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true
  }
}
export default Blogs
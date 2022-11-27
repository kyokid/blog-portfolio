import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { PostCard, PostWidget, Categories } from '../components'

const posts = [
  { title: 'React Testing', excerpt: 'This is a post about React Testing', slug: 'react-testing' },
  { title: 'Next.js', excerpt: 'This is a post about Next.js', slug: 'nextjs' },
];

const Home: NextPage = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </div>
      </div>

      <div className='lg:col-span-4 col-span-1'>
        <div className='lg:sticky relative top-8'>
          <PostWidget />
          <Categories />
        </div>
      </div>
    </div>
  )
}

export default Home

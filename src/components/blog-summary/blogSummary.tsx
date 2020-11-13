import React from 'react'
import { Link } from "gatsby"
import InViewMonitor from 'react-inview-monitor';
import { useNewest3Posts } from '../../hooks';

type Props = { post: Post };

const Component: React.FC<Props> = ({ post: { excerpt, frontmatter, slug } })  => {
  //console.log(frontmatter.title)
  return (
  <div className='px-4 sm:px-16 lg:px-0 pb-12 mx-auto w-full max-w-screen-xl px-2'>
    <Link to={`/posts/${slug}`}>
      <h2 className='inline-block pb-4 text-xl sm:text-2xl lg:text-3xl hover:opacity-50 font-extrabold'>
        {frontmatter?.title}
      </h2>
    </Link>
  </div>
)};

export const BlogSummary = () => {
  const posts = useNewest3Posts();

  return (
    <div className="flex items-top bg-pattern shadow-inner min-h-4/5">
      <div className="w-full py-6">
        <section className="mx-auto container z-50">
          <InViewMonitor
            classNameNotInView='inview-section-hidden'
            classNameInView='inview-section-active'
          >
            <h1 className="uppercase font-bold text-6xl text-black text-center">
              Blog
            </h1>
            <p className="text-black text-3xl mx-auto py-8 font-bold">
              最新の記事
            </p>
            <ul>
              {posts.map((post) => (
                <li className='border-b border-gray-300' key={`${post.slug} + ${post.frontmatter.date}`}>
                  <Component post={post} />
                </li>
              ))}
            </ul>
            <div className="mx-auto text-center">
              <Link to='/posts'>
                <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded mt-6">
                  記事一覧へ
                </button>
              </Link>
            </div>
          </InViewMonitor>
        </section>
      </div>
    </div>
  )
}
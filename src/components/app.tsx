import React from 'react'
import { Hero } from './hero/hero';
import { About } from './about/about';
import { Products } from './products/products';
import { BlogSummary } from './blog-summary/blogSummary';

export const App = () => {
  return (
    <div>
      <Hero />
      <About />
      <Products />
      <BlogSummary />
    </div>
  )
}
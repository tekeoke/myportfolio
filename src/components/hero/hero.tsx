import React from 'react'
import { Link } from "gatsby"
import { useAnyImage } from '../../hooks';

import BackgroundImage from 'gatsby-background-image'

export const Hero = () => {
  const backgroundImg = useAnyImage(`macbook.jpg`);

  return (
    <div className="items-center bg-pattern shadow-inner w-full min-h-9/10">
      {backgroundImg && <BackgroundImage fluid={backgroundImg} loading="eager" fadeIn={false}>
        <div className="flex bg-black bg-opacity-50 bg-pattern shadow-inner items-center w-full min-h-9/10">
          <div className="w-full py-6">
            <section className="mx-auto container w-3/5 z-50">
              <h1 className="uppercase font-bold text-lg text-red-400">
                Hi, my name is
              </h1>
              <h2 className="text-white font-bold text-6xl">tekeoke</h2>
              <p className="text-white text-2xl w-3/5">
                I’m a Software Engineer & Web Developer
              </p>
            </section>
          </div>
        </div>
      </BackgroundImage>}
    </div>
  )
}
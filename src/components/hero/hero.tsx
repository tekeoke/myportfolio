import React from 'react'
import { Link } from "gatsby"

export const Hero = () => {
  return (
    <div className="flex bg-hero-image items-center bg-pattern shadow-inner min-h-9/10">
      <div className="flex bg-black bg-opacity-50 bg-pattern shadow-inner items-center w-full min-h-9/10">
      <div className="w-full py-6 shadow-lg">
        <section className="mx-auto container w-3/5 z-50">
          <h1 className="uppercase font-bold text-lg text-red-400">
            Hi, my name is
          </h1>
          <h2 className="text-white font-bold text-6xl">tekeoke</h2>
          <p className="text-white text-2xl w-3/5">
            I’m a Software Engineer & Web Developer
          </p>

          {/*<Link to='/'>
            <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded mt-6">
              Name
            </button>
          </Link>*/}
        </section>
      </div>
      </div>
    </div>
  )
}
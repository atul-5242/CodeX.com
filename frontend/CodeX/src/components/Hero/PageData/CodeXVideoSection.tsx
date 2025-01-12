// import React from 'react'
import { motion } from "framer-motion"
import CodeXVideo from "../../../assets/Feature Section Video/Glitterdust Logo Reveal_free.mp4"
import Footer from '../../../common/CommonComponent/Footer'

const CodeXVideoSection = () => {
  return (
    <div className=''>
      <div className="bg-black w-full h-screen flex justify-center items-center relative overflow-hidden">
        {/* Background Video */}
        <div className='w-screen blur-3xl bg-black h-[20rem] rotate-120 translate-y-[22rem] -translate-x-[64rem] absolute z-[100]'></div>
        <motion.video 
          whileInView={{
            // Add your animation configurations here
          }}
          src={CodeXVideo}
          autoPlay={true}
          loop={true}
          muted={true}
          className="absolute w-full h-full object-cover rounded-3xl"
        ></motion.video>

        {/* Content Container */}
        <div className="relative z-10 text-center p-8 md:p-16 max-w-4xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight -translate-y-36">
            Code X: The New Generation of Chatting Platform
          </h1>
          <p className="text-lg md:text-xl font-light mb-1 opacity-80">
            Experience the future of communication with seamless, interactive,
            and intelligent chat capabilities. Stay connected, anytime, anywhere.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300">
            Get Started
          </button>
        </div>
        {/* Optional overlay */}
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
        <Footer/>
      </div>
    </div>
  )
}

export default CodeXVideoSection

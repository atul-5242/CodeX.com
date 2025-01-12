import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GoingtoC from '../SVG/GoingtoC';
import MainVideo from "../../../assets/Feature Section Video/snapvideo.io--Message Bubble Animation - After Effects Template.mp4";
import './HeroSection.module.css'; 

const HeroSection = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    
    const [showDot, setShowDot] = useState(false);
    useEffect(() => {
        setIsLoaded(true);
        setTimeout(() => setShowDot(true), 1500);
    }, []);

  return (
    <div>
          <div className="min-h-screen bg-black text-white">
        
        {/* <NavBar/> */}

        {/* Left */}
        <div className='absolute left-0 w-[35rem] z-[30] translate-x-10 '>
            {/* image of phone */}
            <motion.div className=' -translate-x-[1rem] z-[30]'
            initial={{opacity:0,translateX:'-1rem',translateY:'20rem'}}
            animate={{opacity:1,translateX:'-1rem',translateY:'8rem'}}
            transition={{duration:1.2}}>
              {showDot && (
                <div className='absolute z-[1] translate-x-[20rem] translate-y-[1rem] h-[10rem]'>
                  <motion.div 
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{duration:1.5}}
                    className="relative flex items-center justify-center w-36 h-24 top-10">
                    <div className='absolute translate-x-32 translate-y-20'>
                      <GoingtoC/>
                    </div>
                    {/* Outer glowing circles */}
                    <motion.div
                      className="absolute w-12 h-12 rounded-full bg-white opacity-10"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute w-8 h-8 rounded-full bg-white opacity-30"
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    {/* Main glowing dot */}
                    <motion.div
                      className="w-4 h-4 rounded-full bg-white"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </div>
              )}
              {/* The Line going from the phone to the screen to C of CodeX*/}
              <img src="https://www.apple.com/v/iphone-16-pro/d/images/overview/apple-intelligence/apple_intelligence_endframe__ksa4clua0duu_xlarge.jpg" alt="" className='bg-slate-600 w-[27rem] mx-auto shadow-2xl rounded-3xl' />
            </motion.div>

            {/* Shine Line */}
            <div className="rotate-180  absolute top-[36rem] translate-x-20 w-96 h-1 bg-gradient-to-r from-gray-800 via-slate-950 to-gray-800 rounded overflow-hidden">
              <div
                className="absolute  top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                style={{
                  animation: "shine 3s infinite ease",
                }}
              />
            </div>
          </div>

        {/* Hero Section Center*/}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black" />
          
          {/* Content */}
          <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto px-6">
            <h1 className={`font-bold transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className='flex justify-center items-center'>
                <div className='text-[4rem] tracking-wide'>
                  Code 
                </div>
                <div className={`${showDot ? "text-blue-700 md:text-[9rem]" : "text-green-300 "} text-7xl font-bold transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 translate-x-1'}`}>
                  X
                </div>
              </div>
            </h1>
            
            <p className={`text-lg md:text-xl text-gray-300 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Experience the next generation of smart technology
            </p>

            <div className='flex space-x-6 justify-center'>
              <button className=' border shadow-2xl shadow-slate-400 border-slate-800 px-16 py-4 rounded text-white hover:text-black hover:bg-white transition duration-300'>Welcome to Code X</button>
            </div>
          </div>

          {/* Device Visual */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1500 `}>
            {/* Interactive Interface Elements */}
            <div className="relative w-[300px] h-[600px] md:w-[400px] md:h-[800px]">
              {/* Glowing Orb */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48">
                <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl animate-pulse delay-700" />
              </div>

              {/* Floating UI Elements */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-white/10 backdrop-blur-md rounded-lg p-3 w-24 h-24 md:w-32 md:h-32"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${10 + (i % 3) * 30}%`,
                    transform: `translateY(${Math.sin(Date.now() / (1000 + i * 100)) * 10}px)`,
                    animation: `float ${3 + i}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className=''>
          <div>
            {/* Shine Line */}
            <div className=''>
              <div className="absolute top-[23rem]  bg-white  right-[22rem] w-72 h-1 bg-gradient-to-r from-gray-800 via-slate-950 to-gray-800 rounded overflow-hidden">
                <div
                  className="absolute left-0 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  style={{
                    animation: "shine 3s infinite ease",
                  }}
                />
              </div>
            </div>
          </div>
          <div className='absolute -top-10 right-0 w-[35rem]'>
            <motion.video
              initial={{ opacity: 0, translateY: "18rem", translateX: "4rem" }}
              animate={{
                opacity: 1,
                translateY: ["18rem", "17rem", "18rem"],
                translateX: "4rem"
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "loop",
                opacity: { duration: 1.2, delay: 0 }
              }}
              className="w-[28rem] rounded-3xl translate-x-16 shadow-2xl shadow-slate-200 absolute translate-y-72"
              src={MainVideo}
              autoPlay
              loop
              muted
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection;

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ImageOfPeople from "../../../assets/HomeSection/team-image.jpg";
import HeroButton from '../../../common/Buttons/HeroButton';
import Chat1 from "../../../assets/Chat Image/CodeX/Rectangle 1.png"
import Chat2 from "../../../assets/Chat Image/CodeX/Yes you are right..png"


import Chat21 from "../../../assets/Chat Image/CodeX/Rectangle 2.png"
import Chat22 from "../../../assets/Chat Image/CodeX/Yaa This is the right way.png"

import Chat31 from "../../../assets/Chat Image/CodeX/Rectangle 3.png"
import Chat32 from "../../../assets/Chat Image/CodeX/Really you both are amazing.png"

const PeopleTaking = () => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    
    // Main scroll progress for the entire section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });



    // Track when content enters view and stays sticky
    const { scrollYProgress: contentProgress } = useScroll({
        target: contentRef,
        offset: ["start end", "start start"]
    });

    // SVG path reveal progress - starts after 30% additional scroll
    const { scrollYProgress: pathProgress } = useScroll({
        target: containerRef,
        offset: ["10% start", "end end"]
    });

    // Transform scrollYProgress (0-1) into padding values (0-100px)
    const paddingHere = useTransform(scrollYProgress, [0, 0.1, 1], ["100px", "50px", "0px"]);

    // Transform for the SVG path length - now mapped to start after content is in view
    const pathLength = useTransform(pathProgress, [0, 0.7], [0, 1]);
    
    // Transform for the final image opacity
    const imageOpacity1 = useTransform(pathProgress, [0.2, 0.9], [0, 1]);

    const imageOpacity2 = useTransform(pathProgress, [0.6, 0.9], [0, 1]);

    const imageOpacity3 = useTransform(pathProgress, [0.8, 0.9], [0, 1]);

    // Scale the background image based on initial scroll
    const bgScale = useTransform(contentProgress, [0, 1], [1.1, 1]);

    return (
        <div ref={containerRef} className="relative h-[300vh]">
            {/* Sticky container */}
            <motion.div 
                ref={contentRef}
                className="sticky top-0 h-screen overflow-hidden bg-black"
            >
                {/* Background Image Section */}
                <motion.div className="absolute w-full h-full "
                style={{
                    padding: paddingHere
                }}>
                    <motion.img
                        src={ImageOfPeople}
                        alt="Team"
                        className="w-full h-full object-cover rounded-3xl "
                        initial={{ scale: 1.1 }}
                        style={{ scale: bgScale,
                         }}
                    />
                </motion.div>

                {/* Text Section */}
                <div className="absolute text-white top-20 left-14">
                    <div className="text-7xl font-bold tracking-wider space-y-4">
                        {["It never feels", "you're", "distant", "from your's.", "Love one"].map((text, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                            >
                                {text}
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-10">
                        <HeroButton />
                    </div>
                </div>

                {/* SVG Path Animation */}
                <motion.div 
                    className="absolute mt-[30rem] right-20"
                    style={{
                        opacity: useTransform(contentProgress, [0.5, 1], [0, 1])
                    }}
                >
                    <svg
                        width="930"
                        height="105"
                        viewBox="0 0 930 105"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <motion.path
                            d="M0.5 102C107.273 103.512 149.914 91.2901 259 102M259 102C205.538 75.0091 187.204 26.8187 138.5 21M259 102C495.767 104.937 509.162 103.886 532.5 102M532.5 102C615.817 93.201 532.5 37 645 21M532.5 102C532.5 102 843.482 102.227 896 102C948.518 101.773 903.342 48.8447 929.5 0.5"
                            stroke="white"
                            strokeWidth="6"
                            strokeLinecap="round"
                            style={{
                                pathLength,
                                transition: "none"
                            }}
                        />
                    </svg>
                </motion.div>

                {/* Final Image Component */}
            <div>
                <motion.div 
                    className="transform absolute"
                    style={{ opacity: imageOpacity1 }}
                >
                    <div className="w-52 h-64 rounded-lg object-cover relative mt-[28rem] left-[30rem]">
                    <img src={Chat1}  className='absolute'/>
                    <img src={Chat2}  className='absolute mx-auto mt-3 left-2'/>
                    </div>
                    
                </motion.div>
                <motion.div 
                    className="absolute "
                    style={{ opacity: imageOpacity2 }}
                >
                    <div className="w-52 h-64 rounded-lg object-cover relative mt-[28rem] ml-[65rem]">
                    <img src={Chat21}  className='absolute'/>
                    <img src={Chat22}  className='absolute w-[90%] mx-auto mt-3 left-2'/>
                    </div>
                </motion.div>
                <motion.div 
                    className="absolute bottom-20 left-1/2 transform translate-x-1/4"
                    style={{ opacity: imageOpacity3 }}
                >
                    <div className="w-60 h-64 rounded-lg object-cover relative mt-72 left-[27rem]">
                    <img src={Chat31}  className='absolute'/>
                    <img src={Chat32}  className='w-[90%] absolute mx-auto mt-3 left-2'/>
                    </div>
                </motion.div>
            </div>
                
            </motion.div>
        </div>
    );
};

export default PeopleTaking;

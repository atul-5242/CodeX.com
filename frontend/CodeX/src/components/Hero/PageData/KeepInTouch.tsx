import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import WorldWideConnection from "../../../assets/Feature Section Video/pexels-cottonbro-7494121.mp4";
import VideoCall from "../../../assets/Feature Section Video/Girl-On-Video-Call.mp4";
import Encryption from "../../../assets/Feature Section Video/snapvideo.io--How Encryption Works - and How It Can Be Bypassed.mp4";
import MessageText from "../../../assets/Feature Section Video/snapvideo.io--Message Bubble Animation - After Effects Template.mp4";
const percentToFraction = (percent) => percent / 100;
const SectionVideo = ({ range, videoSrc, scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, range, [0.8, 1, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, range, [0, 1, 1, 0]);
  const zIndex = useTransform(scrollYProgress, range, [1, 2, 2, 1]);

  return (
    <>

      <motion.div
        style={{ scale, opacity, zIndex, position: 'absolute', inset: 0 }}
        className="p-8"
      >
        <video
          className="w-full h-full rounded-3xl object-cover shadow-2xl"
          src={videoSrc}
          autoPlay
          loop
          muted
        />
      </motion.div>
    </>
  );
};
const Section = ({ range, title, subtitle, description, videoSrc, scrollYProgress }) => {
  const textOpacity = useTransform(scrollYProgress, range, [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, range, [50, 0, 0, -50]);
  const scale = useTransform(scrollYProgress, range, [0.8, 1, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, range, [0, 1, 1, 0]);
  const zIndex = useTransform(scrollYProgress, range, [1, 2, 2, 1]);

  return (
    <>
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="absolute top-1/4 left-16 w-2/3"
      >
        <div className="space-y-6">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h2>
          <h3 className="text-2xl font-semibold text-gray-700">{subtitle}</h3>
          <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
        </div>
      </motion.div>

      <motion.div
        style={{ scale, opacity, zIndex, position: 'absolute', inset: 0 }}
        className="p-8"
      >
        <video
          className="w-full h-full rounded-3xl object-cover shadow-2xl"
          src={videoSrc}
          autoPlay
          loop
          muted
        />
      </motion.div>
    </>
  );
};

const KeepInTouch = () => {
  const { scrollYProgress } = useScroll();
  const introOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);

  const sections = [
    {
      title: "High-Quality Video Conferencing",
      subtitle: "Crystal Clear Communication",
      description: "Experience premium video quality with our advanced compression technology. Support for up to 4K resolution ensures you never miss a detail. Adaptive streaming automatically adjusts to your connection speed.",
      videoSrc: WorldWideConnection,
      range: [percentToFraction(40), percentToFraction(41), percentToFraction(50), percentToFraction(51)]
    },
    {
      title: "Secure End-to-End Encryption",
      subtitle: "Your Privacy Matters",
      description: "Military-grade encryption protects every call and message. Zero-knowledge architecture means even we can't access your data. Regular security audits ensure your conversations stay private.",
      videoSrc: VideoCall,
      range: [percentToFraction(51), percentToFraction(52), percentToFraction(62), percentToFraction(63)]
    },
    {
      title: "Smart Security Features",
      subtitle: "Advanced Protection",
      description: "Two-factor authentication keeps your account secure. Automatic threat detection blocks suspicious activities. Regular security updates protect against the latest vulnerabilities.",
      videoSrc: Encryption,
      range: [percentToFraction(63), percentToFraction(64), percentToFraction(75), percentToFraction(76)]
    },
    {
      title: "Real-Time Messaging",
      subtitle: "Instant Connection",
      description: "Send messages that arrive in milliseconds. Rich media support for sharing photos, files, and links. Smart notifications keep you updated without being intrusive.",
      videoSrc: MessageText,
      range: [percentToFraction(76), percentToFraction(77), percentToFraction(89), percentToFraction(100)]
    }
  ];

  return (
    <div style={{ height: '600vh' }}>
      <div className="sticky top-0 flex flex-row gap-20 justify-center min-h-screen p-8">
        <div className="w-1/2 pl-16 relative top-32">
          
          <div className="relative">
            {sections.map((section, index) => (
              <Section key={index} {...section} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>

        <div className="relative w-1/2 h-[80vh]">
          {sections.map((section, index) => (
            <SectionVideo key={index} videoSrc={section.videoSrc} range={section.range} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeepInTouch;
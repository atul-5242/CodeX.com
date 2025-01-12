import { useEffect, useRef } from 'react';

const GoingtoC = () => {
  const pathRef = useRef(null);

  useEffect(() => {
    if (pathRef.current) {
      // @ts-ignore
      const pathLength = pathRef.current.getTotalLength();

      // Set initial state: hide the path
      // @ts-ignore
      pathRef.current.style.strokeDasharray = pathLength;
      // @ts-ignore
      pathRef.current.style.strokeDashoffset = pathLength;

      // Trigger the animation after a slight delay
      setTimeout(() => {
        // @ts-ignore	
        pathRef.current.style.transition = 'stroke-dashoffset 2s ease';
        // @ts-ignore
        pathRef.current.style.strokeDashoffset = 0; // Animate to show the path
      }, 100);
    }
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <svg
        width="152" // Doubled the width for a bigger size
        height="90" // Doubled the height for a bigger size
        viewBox="0 0 76 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        <path
          ref={pathRef}
          d="M1.99996 2C11.8333 0.333333 29 -0.4 19 10C6.49996 23 -14 47.5 19 44C45.4 41.2 67.3333 35.8333 75 33.5"
          stroke="white"
          strokeWidth="2" // Slightly thicker line for visibility
          fill="transparent"
        />
      </svg>
    </div>
  );
};

export default GoingtoC;

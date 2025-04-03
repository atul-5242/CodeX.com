import React from 'react';

interface GroupCardProps {
  pic: string;
  heading: string;
  description: string;
  onJoin: (groupInfo: { pic: string; heading: string; description: string }) => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ pic, heading, description, onJoin }) => {
  const handleJoin = () => {
    onJoin({ pic, heading, description });
  };

  return (
    <div className='relative w-full max-w-[25rem] h-[18rem] sm:h-[20rem] md:h-[22rem] rounded-2xl overflow-hidden group'>
      {/* Background Image */}
      <img
        src={pic}
        alt="Card Image"
        className='w-full h-full object-cover rounded-2xl transition-transform group-hover:scale-110 group-hover:opacity-80' 
      />
      
      {/* Overlay */}
      <div className='absolute top-0 left-0 w-full h-full bg-black opacity-20 group-hover:opacity-50 transition-opacity'></div>

      {/* Card Content */}
      <div className='absolute bottom-5 left-5 right-5 text-white z-20'>
        {/* Description */}
        <p className='text-sm font-medium mt-2 text-shadow-md group-hover:transform group-hover:translate-y-0 group-hover:opacity-100 opacity-0 transform translate-y-5 transition-all duration-500 ease-in-out'>
          {description}
        </p>
        {/* Heading */}
        <h2 className='text-2xl font-extrabold leading-tight text-shadow-md'>
          {heading}
        </h2>

        {/* Join Button */}
        <button 
          className="mt-5 py-2 px-6 bg-transparent border-2 border-white text-white font-semibold rounded-full transition-all duration-300 transform hover:bg-[#1D4ED8] hover:border-[#1D4ED8] hover:text-white hover:scale-110 hover:shadow-lg outline-none ring-2 ring-[#1D4ED8]"
          onClick={handleJoin}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default GroupCard;
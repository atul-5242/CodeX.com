import React, { useEffect, useState, useRef } from 'react';
import RadialEclipse from '../../assets/SVG_BG/Ellipse_radial.svg';
import RadialEclipse1 from '../../assets/SVG_BG/Ellipse 1.svg';
import CodeXLogo from '../../assets/SVG_BG/Code X.svg';
import { FiUser, FiBell, FiSettings, FiCompass, FiHome, FiBookmark, FiHelpCircle, FiMenu } from "react-icons/fi"; 
import GroupCard from './GroupCard';
import GroupChatDialog from './GroupChatDialogProps ';
import { cardData } from '../Chat/allCategoryData/CardData';
import { Link } from 'react-router-dom';

const ExploreCategory = () => {
  const [SelectedSection, setSelectedSection] = useState(1);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [transitioning, setTransitioning] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const contentRef = useRef(null);

  // Update isDesktop state on window resize
  const handleResize = () => {
    const width = window.innerWidth;
    setIsDesktop(width >= 1024);
    if (width < 768) {
      setSidebarExpanded(false);
    } else {
      setSidebarExpanded(true);
    }
  };

  // Add event listener on component mount and cleanup on unmount
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSectionChange = (section) => {
    setTransitioning(true);
    setTimeout(() => {
      setSelectedSection(section);
      setTransitioning(false);
    }, 150);
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleJoinGroup = (groupInfo) => {
    setSelectedGroup(groupInfo);
  };

  const handleBackFromChat = () => {
    setSelectedGroup(null);
  };

  const navItems = [
    { id: 1, name: 'Explore', icon: <FiCompass className="text-xl" /> },
    { id: 0, name: 'Your Space', icon: <FiHome className="text-xl" /> },
    { id: 2, name: 'Bookmarks', icon: <FiBookmark className="text-xl" /> },
    { id: 3, name: 'Help', icon: <FiHelpCircle className="text-xl" /> },
  ];

  // Moved notifications to top section
  const topItems = [
    { id: 'notifications', name: 'Notifications', icon: <FiBell className="text-xl" />, hasNotification: true },
  ];

  // Remaining profile items
  const profileItems = [
    { id: 'profile', name: 'Profile', icon: <FiUser className="text-xl" /> },
    { id: 'settings', name: 'Settings', icon: <FiSettings className="text-xl" /> },
  ];

  return (
    <div className='bg-[#100518] relative text-white w-full min-h-screen flex flex-col'>
      <img className='fixed z-[-20] top-0 right-0' src={RadialEclipse} alt="Background" />
      <img className='fixed z-[-20] left-0' src={RadialEclipse1} alt="Background" />

      {/* Main Content Area with Sidebar and Content */}
      <div className='flex flex-1 relative'>
        {/* Instagram-style fixed sidebar */}
        <div 
          className={`
            ${sidebarExpanded ? 'w-[240px]' : 'w-[70px]'}
            fixed left-0 top-0 bottom-0 h-screen z-50
            pt-20 pb-6 px-2
            bg-[#1A0D1F] border-r border-gray-800/30
            transition-all duration-300 ease-in-out
            flex flex-col
            ${!sidebarExpanded && !isDesktop ? '-left-[70px]' : ''}
          `}
        >
          {/* Toggle button for sidebar - hamburger style */}
          <button 
            className='absolute top-6 right-4 w-8 h-8 bg-[#2D1B2F] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#1D4ED8] transition-all duration-300'
            onClick={toggleSidebar}
          >
            <FiMenu className="text-lg" />
          </button>

          {/* Logo at top of sidebar */}
          <Link to={"/"} className={`${sidebarExpanded ? 'block' : 'hidden'} mb-8 flex justify-center`}>
            <img src={CodeXLogo} alt="Code X Logo" className='w-16' />
          </Link>
          
          {/* Notifications at top section */}
          <div className="mb-6">
            {topItems.map((item) => (
              <div 
                key={item.id}
                className={`
                  w-full py-3 flex items-center justify-${sidebarExpanded ? 'start' : 'center'} 
                  text-[#D1D5DB] cursor-pointer rounded-xl hover:bg-[#2D1B2F]
                  transition-all duration-300
                  group relative
                `}
              >
                <div className={`${sidebarExpanded ? 'ml-4' : 'mx-auto'} 
                  w-8 h-8 rounded-full bg-[#2D1B2F] flex justify-center items-center
                  hover:bg-[#1D4ED8] transition-all duration-300
                  relative
                `}>
                  {item.icon}
                  {item.hasNotification && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-[#1A0D1F]"></span>
                  )}
                </div>
                
                {sidebarExpanded && (
                  <span className="ml-3 font-medium">{item.name}</span>
                )}
                
                {!sidebarExpanded && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-[#2D1B2F] rounded-md text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className={`mb-4 w-full h-px bg-gradient-to-r from-transparent via-gray-600/30 to-transparent`}></div>

          {/* Main Navigation Section */}
          <div className="flex flex-col gap-3 flex-1">
            <p className={`${sidebarExpanded ? 'block' : 'hidden'} text-xs font-medium text-gray-400 px-4 mb-1`}>MAIN MENU</p>
            
            {navItems.map((item) => (
              <div 
                key={item.id}
                className={`
                  ${SelectedSection === item.id ? 'bg-[#1D4ED8] text-white' : 'text-[#D1D5DB] hover:bg-[#2D1B2F]'} 
                  w-full py-3 flex items-center justify-${sidebarExpanded ? 'start' : 'center'} 
                  cursor-pointer rounded-xl
                  transition-all duration-300
                  group relative
                `}
                onClick={() => handleSectionChange(item.id)}
              >
                <div className={`${sidebarExpanded ? 'ml-4' : 'mx-auto'} flex items-center justify-center`}>
                  {item.icon}
                </div>
                
                {sidebarExpanded && (
                  <span className="ml-3 font-medium">{item.name}</span>
                )}
                
                {!sidebarExpanded && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-[#2D1B2F] rounded-md text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
                
                {SelectedSection === item.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-full"></div>
                )}
              </div>
            ))}
          </div>

          {/* Profile Section at bottom */}
          <div className="mt-auto flex flex-col items-center gap-3">
            <div className={`my-4 w-full h-px bg-gradient-to-r from-transparent via-gray-600/30 to-transparent`}></div>
            
            <p className={`${sidebarExpanded ? 'block' : 'hidden'} text-xs font-medium text-gray-400 px-4 self-start mb-1`}>USER</p>
            
            {profileItems.map((item) => (
              <div 
                key={item.id}
                className={`
                  w-full py-3 flex items-center justify-${sidebarExpanded ? 'start' : 'center'} 
                  text-[#D1D5DB] cursor-pointer rounded-xl hover:bg-[#2D1B2F]
                  transition-all duration-300
                  group relative
                `}
              >
                <div className={`${sidebarExpanded ? 'ml-4' : 'mx-auto'} 
                  w-8 h-8 rounded-full bg-[#2D1B2F] flex justify-center items-center
                  hover:bg-[#1D4ED8] transition-all duration-300
                `}>
                  {item.icon}
                </div>
                
                {sidebarExpanded && (
                  <span className="ml-3 font-medium">{item.name}</span>
                )}
                
                {!sidebarExpanded && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-[#2D1B2F] rounded-md text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </div>
            ))}
            
            {/* User avatar and status - only shown when sidebar is expanded */}
            {sidebarExpanded && (
              <div className="mt-4 w-full px-3 py-3 flex items-center gap-3 rounded-xl bg-[#2D1B2F]/70">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex justify-center items-center">
                  <span className="font-bold">AK</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">Alex Kim</span>
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                    Online
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {sidebarExpanded && !isDesktop && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content with scrollable area */}
        <div 
          ref={contentRef}
          className={`
            flex-1 overflow-y-auto
            transition-all duration-300 ease-in-out
            ${sidebarExpanded ? 'ml-[240px]' : 'ml-[70px]'}
            ${!isDesktop && sidebarExpanded ? 'ml-0' : ''}
          `}
        >
          {/* Explore Section with 3 cards per row on desktop */}
          {SelectedSection === 1 && (
            <div className={`
              p-6 h-full
              ${transitioning ? 'opacity-0' : 'opacity-100'} 
              transition-opacity duration-300
            `}>
              {!selectedGroup ? (
                <>
                  {/* Main Section Text Heading */}
                  <div className='w-full mb-8'>
                    <h1 className='text-2xl sm:text-3xl md:text-4xl font-extrabold'>
                      <span><span className='text-[#1D4ED8]'>Your</span> Connection is</span>
                      <span className='block'>Wonderful with us.</span>
                    </h1>
                    <p className='font-light text-sm sm:text-base md:text-lg mt-2'>
                      <span>Be ready for a new generation — tech </span>
                      <span>chat that connects you through shared interests.</span>
                    </p>
                  </div>

                  {/* Cards - 3 per row on desktop */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {cardData.map((val) => (
                      <GroupCard 
                        key={val.id} 
                        pic={val.icon} 
                        heading={val.title} 
                        description={val.description}
                        onJoin={handleJoinGroup}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="h-full">
                  <GroupChatDialog 
                    groupInfo={selectedGroup}
                    onBack={handleBackFromChat}
                  />
                </div>
              )}
            </div>
          )}

          {/* Your Space Section */}
          {SelectedSection === 0 && (
            <div className={`p-6 ${transitioning ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
              <h2 className='text-3xl font-bold mb-4'>Your Space</h2>
              <p className='text-lg'>This is your personal space, where you can relax and explore your content.</p>
            </div>
          )}
          
          {/* Bookmarks Section */}
          {SelectedSection === 2 && (
            <div className={`p-6 ${transitioning ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
              <h2 className='text-3xl font-bold mb-4'>Bookmarks</h2>
              <p className='text-lg'>Your saved items appear here for quick access.</p>
            </div>
          )}
          
          {/* Help Section */}
          {SelectedSection === 3 && (
            <div className={`p-6 ${transitioning ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
              <h2 className='text-3xl font-bold mb-4'>Help Center</h2>
              <p className='text-lg'>Find assistance and resources to enhance your experience.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreCategory;
// Now the main Hero section is started here:
import React, { useState, useEffect } from 'react';

import PeopleTaking from './PageData/PeopleTaking';
import HeroSection from './PageData/HeroSection';
import KeepInTouch from './PageData/KeepInTouch';
import CodeXVideoSection from './PageData/CodeXVideoSection';
// import Footer from '../../common/CommonComponent/Footer';
import NavBar from '../../common/CommonComponent/NavBar';

// Main Code Of CodeX
const Home = () => {

  return (
    <div>


    {/* Nav Bar */}
    <div>
      <NavBar/>
    </div>

    {/* First Section Home page*/}

      <HeroSection/>

    {/* The Image based section Data of Connection of people talking*/}

    <div className='pb-3 bg-slate-100 rounded'>
      <div className='pb-3 bg-slate-200 rounded'>
        <div className='pb-3 bg-slate-300 rounded'>
          <div className='pb-3 bg-slate-400 rounded'>
            <div className='pb-3 bg-slate-500 rounded'>
              <div className='pb-3 bg-slate-600 rounded'>
                <div className='pb-3 bg-slate-700 rounded'>
                  <div className='pb-3 bg-slate-800 rounded'>
                    <div className='pb-3 bg-slate-900 rounded'>
                      <div className='pb-3 bg-black rounded'>
                        <PeopleTaking/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    

    {/*    */}
    <div>
      <KeepInTouch/>
    </div>

    {/* Code X video Section  */}
    <div>
    <CodeXVideoSection/>
    
    </div>
    </div>
  );
};

export default Home;



// import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// // import { getAllUserData } from '../../Services/Operations/UserSpecific/UserCall';
// const Home = () => {

//   const user=useSelector((state)=>state.auth.UserData);
//   const token=useSelector((state)=>state.auth.token);

//   const LogoutHandler=()=>{
//     localStorage.removeItem("token");
//     localStorage.removeItem("UserData");
//     window.location.reload();
//   }


//   // useEffect(()=>{
//   //   const ws=new WebSocket("ws://localhost:8082?token="+token);

//   //   ws.onmessage=(event)=>{
//   //     setMessage(m=>[...m,event.data]);
//   //   }


//   //   ws.onopen=()=>{
//   //     console.log("connected");
//   //     ws.send(JSON.stringify({
//   //       type:"direct",
//   //       user:"userId"
//   //     }));
//   //   }
//   //   return ()=>{
//   //     ws.close();
//   //   }
//   // },[user])

//   // useEffect(()=>{(async()=>{
//   //   const AlluserData=await getAllUserData({token})();
//   //   console.log("AllUserData",AlluserData);
//   // })()},[])

//   return (
//     <div>
//         <div className='bg-black w-screen h-screen'>
//             <div className='flex flex-col justify-center items-center h-full'>
//                 <div className='flex flex-col justify-center items-center'>
//                     <h1 className='text-white text-4xl font-bold mb-5'>CodeX</h1>  
//                     <p className='text-white text-xl mb-5'>A place for all your coding needs</p>
//                     {user && <p className='text-white text-xl mb-5'>Welcome {user.name}</p>}


//                     <div className='flex flex-row justify-center items-center gap-10'>

//                       {
//                         user?null:<Link to={"/signIn"}>
//                         <button className='bg-white text-black text-xl font-bold py-2 px-4 rounded-lg'>Sign Up</button>
//                   </Link>

//                       }

//                     {

//                       user?(<Link className='bg-white text-black text-xl font-bold py-2 px-4 rounded-lg' to={"/"}> <button onClick={LogoutHandler}>Logout</button></Link>):(<Link to={"/logIn"}>
//                       <button className='bg-white text-black text-xl font-bold py-2 px-4 rounded-lg'>Login In </button>
//                     </Link>)

//                     }


//                     {
//                       user?<Link to={"/chat"} className='bg-white text-black text-xl font-bold py-2 px-4 rounded-lg'>
//                         <button>Chat</button>
//                       </Link>:null
//                     }

//                     </div>
//                 </div>
//             </div>

//         </div>
//     </div>
//   )
// }

// export default Home













// The above is login based functionality take it as a reference for the future:


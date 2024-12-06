import React, { useEffect, useState } from 'react'
import { getAllUserData } from '../../Services/Operations/UserSpecific/UserCall';
import { useSelector } from 'react-redux';

const ChatPage = () => {

      const messages = [
          {
            id: 1,
            text: "Hey there! How's it going?",
            sender: "me"
        },
        {
            id: 2,
            text: "Not too bad! What about you?",
            sender: "other"
        },
        {
            id: 3,
            text: "Just relaxing, watching a movie.",
            sender: "me"
        },
        {
            id: 4,
            text: "Nice! Which movie are you watching?",
            sender: "other"
        },
        {
            id: 5,
            text: "Inception. It's a mind-bender!",
            sender: "me"
        },
        {
            id: 6,
            text: "Oh, I love that one! So intense.",
            sender: "other"
        },
        {
            id: 7,
            text: "Yeah, makes you think about reality.",
            sender: "me"
        },
        {
            id: 8,
            text: "True. Do you like sci-fi movies in general?",
            sender: "other"
        },
        {
            id: 9,
            text: "Absolutely! They're my favorite genre.",
            sender: "me"
        },
        {
            id: 10,
            text: "We should do a sci-fi movie marathon sometime.",
            sender: "other"
        },
    ];


    const [userTitle,setUserTitle]=useState("");
    const [current_Selected_User,set_current_Selected_User]=useState({});
    // const [userAvatar,setUserAvatar]=useState("");
    // const [userName,setUserName]=useState("");
    // const [userEmail,setUserEmail]=useState("");
    // const [userGroup,setUserGroup]=useState([]);
    
    const UserDataHandler=(id)=>{
        console.log("The user id is here >>>>>>>>>>>>>>>>>",id);
        setUserTitle(alluser.find(user=>user._id===id)?.name);
        const user=alluser.find(user=>user._id===id);
        if(!user){    
            return;
        }
        set_current_Selected_User(user);
    }
    
      
    const [alluser,setAllUser]=useState([]); 

    useEffect(()=>{

        const allUser=async()=>{
            try {
                const response=await getAllUserData()();
                console.log("response",response);
                setAllUser(response?.data?.userData);
            } catch (error) {
                console.log("Error",error);
            }
        }
        allUser();
    },[])

    const {token}=useSelector((state)=>state.auth);

    // WebSocket Connection
    useEffect(()=>{

        const ws=new WebSocket("ws://localhost:8082?token="+token);

        ws.onmessage=(event)=>{
            // setMessage(m=>[...m,event.data]);
            console.log("message",event.data);
        }

        ws.onopen=()=>{
            console.log("connected");
            ws.send(JSON.stringify({
            type:"direct",
            user:current_Selected_User._id
            }));
        }
        return ()=>{
            ws.close();
        };
        },[]);
  return (
    <div>

        <div className='flex items-center h-screen bg-gray-900 justify-center flex-row'>

                    {/* Left Side Chat Area */}
        <div className='bg-gray-50 h-[36rem] w-[23rem] rounded-tl-2xl rounded-bl-2xl'>
        <div className='mb-1 font-bold border-b-2 shadow-gray-300 shadow-xl py-4 text-4xl text-center text-black font-serif '>
        What's Up
      </div>
        <div className='flex flex-col gap-1 overflow-y-auto h-[30rem]'>
            {   //@ts-ignore
                alluser.map((item,index)=>{
                    return <button className=' bg-black text-white w-full p-3' key={item._id} onClick={()=>{
                        
                        UserDataHandler(item._id)
                        
                        }}>
                        <div className='flex  gap-5 items-center'> 
                            <div className='bg-white rounded-full w-10 h-10' style={{backgroundColor:item.avatarColor}}></div>
                            <div>{item.name}</div>
                        </div>
                    </button>
                })
            }
        </div>
        </div>

        {/* Right Chat Area */}
        <div className='bg-gradient-to-t py-10 w-[45rem] px-10 rounded-tr-2xl rounded-br-2xl' style={{ backgroundImage: "url('https://e0.pxfuel.com/wallpapers/540/950/desktop-wallpaper-pastel-pinterest-whatsapp-anime-quote-girly-cartoon.jpg')" }}>
        <div className='text-center justify-start px-5 shadow-2xl border shadow-white items-center flex w-full bg-green-950 font-bold rounded-2xl text-white h-[3rem]'>
        {
            userTitle?userTitle:"Hi i am Here"
        }
      </div>
      <div className='flex flex-col'>
        <div className='h-96 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-gray-300 p-4'>
            
           {
                messages.map((message,index)=>{
                    return <div className={`flex ${message.sender==="me"?"justify-end":"justify-start"}`} key={message.id}>
                    <div className={`mb-2 ${message.sender==="me"?"bg-green-400":"bg-white"} w-fit rounded-lg p-2`} key={index}>{message.text}</div>
                    </div>
                })
           }
            
            
            </div>
        <div className='flex flex-row mt-5 gap-2'>
            <input className='bg-white focus:border-green-500 focus:ring focus:ring-green-300 w-full p-2 rounded-xl' type='text' placeholder='Type a message' />
            <button className='bg-black rounded-lg text-white p-3'>Send</button>
        </div>

      </div>
        </div>
      
    </div>
    </div>
  )
}

export default ChatPage

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Home = () => {

  const user=useSelector((state)=>state.auth.UserData);
  const token=useSelector((state)=>state.auth.token);

  const LogoutHandler=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("UserData");
    window.location.reload();
  }

  function ChatHandler(){
    window.location.href="/p2pchat";
  }

  useEffect(()=>{
    const ws=new WebSocket("ws://localhost:8082?token="+token);

    ws.onmessage=(event)=>{
      setMessage(m=>[...m,event.data]);
    }


    ws.onopen=()=>{
      console.log("connected");
      ws.send(JSON.stringify({
        type:"direct",
        user:"userId"
      }));
    }
    return ()=>{
      ws.close();
    }
  },[user])

  return (
    <div>
        <div className='bg-black w-screen h-screen'>
            <div className='flex flex-col justify-center items-center h-full'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-white text-4xl font-bold mb-5'>CodeX</h1>  
                    <p className='text-white text-xl mb-5'>A place for all your coding needs</p>
                    {user && <p className='text-white text-xl mb-5'>Welcome {user.name}</p>}


                    <div className='flex flex-row justify-center items-center gap-10'>

                      {
                        user?null:<Link to={"/signIn"}>
                        <button className='bg-white text-black text-xl font-bold py-2 px-4 rounded-lg'>Sign Up</button>
                  </Link>

                      }

                    {

                      user?(<Link className='bg-white text-black text-xl font-bold py-2 px-4 rounded-lg' to={"/"}> <button onClick={LogoutHandler}>Logout</button></Link>):(<Link to={"/logIn"}>
                      <button className='bg-white text-black text-xl font-bold py-2 px-4 rounded-lg'>Login In </button>
                    </Link>)

                    }


                    {
                      user?<Link to={"/chat"} className='bg-white text-black text-xl font-bold py-2 px-4 rounded-lg'>
                        <button onClick={ChatHandler}>Chat</button>
                      </Link>:null
                    }

                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Home

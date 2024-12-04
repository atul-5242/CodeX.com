import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Home = () => {

  const user=useSelector((state)=>state.auth.UserData);
  const LogoutHandler=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("UserData");
    window.location.reload();
  }
  return (
    <div>
        <div className='bg-black w-screen h-screen'>
            <div className='flex flex-col justify-center items-center h-full'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-white text-4xl font-bold mb-5'>CodeX</h1>  
                    <p className='text-white text-xl mb-5'>A place for all your coding needs</p>
                    {user && <p className='text-white text-xl mb-5'>Welcome {user.name}</p>}
                    <div className='flex flex-row justify-center items-center gap-10'>
                      <Link to={"/signIn"}>
                          <button className='bg-white text-black text-xl font-bold py-2 px-4 rounded-lg'>Sign Up</button>
                    </Link>
                    {

                      user?(<Link className='bg-white text-black text-xl font-bold py-2 px-4 rounded-lg' to={"/"}> <button onClick={LogoutHandler}>Logout</button></Link>):(<Link to={"/logIn"}>
                      <button className='bg-white text-black text-xl font-bold py-2 px-4 rounded-lg'>Login In </button>
                    </Link>)

                    }


                    {
                      user?<Link to={"/chat"} className='bg-white text-black text-xl font-bold py-2 px-4 rounded-lg'>
                        <button>Chat</button>
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

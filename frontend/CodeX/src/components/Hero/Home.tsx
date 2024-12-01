import React from 'react'

const Home = () => {
  return (
    <div>
        <div className='bg-black w-screen h-screen'>
            <div className='flex flex-col justify-center items-center h-full'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-white text-4xl font-bold mb-5'>CodeX</h1>  
                    <p className='text-white text-xl mb-5'>A place for all your coding needs</p>
                    <div className='flex flex-row justify-center items-center gap-10'>
                    <button className='bg-white text-black text-xl font-bold py-2 px-4 rounded-lg'>Sign Up</button>
                    <button className='bg-white text-black text-xl font-bold py-2 px-4 rounded-lg'>Login In </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Home

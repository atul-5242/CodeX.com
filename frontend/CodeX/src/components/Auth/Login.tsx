import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../../Services/Operations/AuthCalls/authAPI';
import { useDispatch } from 'react-redux';


const Login = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [ fromSubmitted,setFromSubmitted]=useState(false);
  useEffect(()=>{
    if(fromSubmitted){

      const fromData={username,password};
      async function login(){
        const response=await loginAPI(fromData,navigate,dispatch)();
        console.log("Here is login",response);
      }
      login();  
    }
    
  },[navigate,fromSubmitted,username,password,dispatch])

  function handleSubmit(e) {
    e.preventDefault();
    setFromSubmitted(true);
    console.log("form of Login is Submitted.");
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Log in to continue your journey ✨
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>
          
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition duration-300"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link
            to={"/forgotPassword"}
            className="text-sm text-purple-500 hover:text-purple-700 transition duration-300"
          >
            Forgot your password?
          </Link>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to={"/signIn"}
              className="text-purple-500 font-semibold hover:text-purple-700 transition duration-300"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

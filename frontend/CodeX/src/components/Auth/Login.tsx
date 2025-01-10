import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight } from 'lucide-react';
import evaimage from "../../assets/eva image.webp"
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl flex rounded-3xl overflow-hidden shadow-2xl bg-gray-800"
      >
        {/* Left Side - Image Section */}
        <div className="hidden lg:block w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-900 opacity-40" />
          <img 
            src={evaimage}
            alt="Abstract Design"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold mb-6 text-center"
            >
              Welcome Back to
              <span className="block text-7xl bg-black opacity-60 bg-clip-text text-transparent"> 
                <div className=''>
                  Code X
                </div>
              </span>
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-200 text-center"
            >
              Login to continue your journey into your world of Chat
            </motion.p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-md mx-auto"
          >
            <h3 className="text-3xl font-bold text-white mb-8">Sign In</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500 focus:ring-2 focus:outline-none transition duration-200"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500 focus:ring-2 focus:outline-none transition duration-200"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200 flex items-center justify-center gap-2"
              >
                Sign In
                <ArrowRight className="h-5 w-5" />
              </motion.button>

              <div className="flex items-center justify-between mt-6">
                <Link 
                  to="/forgot-password"
                  className="text-sm text-violet-400 hover:text-violet-300 transition duration-200"
                >
                  Forgot Password?
                </Link>
                <Link 
                  to="/signup"
                  className="text-sm text-violet-400 hover:text-violet-300 transition duration-200"
                >
                  Create Account
                </Link>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-700">
              <p className="text-center text-sm text-gray-400">
                Or continue with
              </p>
              <div className="mt-4 flex gap-4 justify-center">
                {['Google', 'GitHub', 'LinkedIn'].map((provider) => (
                  <motion.button
                    key={provider}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-600 transition duration-200"
                  >
                    {provider}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
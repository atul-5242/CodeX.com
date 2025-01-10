import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { signInAPI } from './../../Services/Operations/AuthCalls/authAPI';
import eva from "../../assets/Snapinsta.app_326749930_697937898542890_3197869482094942976_n_1080.jpg"
const SignIn = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (formSubmitted) {
      const formData = { username, name, email, password, confirmPassword };

      if (password !== confirmPassword) {
        setError("Passwords don't match.");
        return;
      }

      const callSignInAPI = async () => {
        try {
          const response = await signInAPI(formData, navigate)();
          console.log("The SIGNIN_API Response in frontend:", response);
        } catch (error) {
          setError(error.message || 'An unknown error occurred');
        }
      };

      callSignInAPI();
      setFormSubmitted(false);
    }
  }, [formSubmitted, username, name, email, password, confirmPassword, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl flex rounded-3xl overflow-hidden shadow-2xl bg-gray-800"
      >
        {/* Left Side - Form Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-md mx-auto"
          >
            <h3 className="text-3xl font-bold text-white mb-8">Create Account</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="Choose a username"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Full Name</label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500 focus:ring-2 focus:outline-none transition duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500 focus:ring-2 focus:outline-none transition duration-200"
                    placeholder="Enter your email"
                    required
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
                    placeholder="Create a password"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500 focus:ring-2 focus:outline-none transition duration-200"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm p-3 rounded-lg bg-red-400 bg-opacity-10"
                >
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200 flex items-center justify-center gap-2"
              >
                Create Account
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-violet-400 hover:text-violet-300 font-medium transition duration-200"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Image Section */}
        <div className="hidden lg:block w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-900 opacity-50" />
          <img
            src={eva}
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
              Start Your Journey
              <span className="block mt-2 text-5xl bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
                Join Our Community
              </span>
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-200 text-center"
            >
              Create an account and unlock all our amazing features
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
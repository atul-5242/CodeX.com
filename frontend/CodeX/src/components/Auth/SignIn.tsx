import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { signInAPI } from './../../Services/Operations/AuthCalls/authAPI'; 

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false); // Tracking form submission state
  const navigate = useNavigate();

  useEffect(() => {
    if (formSubmitted) {
      const formData = { username, name, email, password ,confirmPassword};

      if (password !== confirmPassword) {
        setError("Passwords don't match.");
        return;
      }

      const callSignInAPI = async () => {
        try {
          const response=await signInAPI(formData, navigate)();
          console.log("The SIGNIN_API Response in frontend:",response);
        } catch (error) {
          setError(error.message || 'An unknown error occurred');
        }
      };

      callSignInAPI();
      setFormSubmitted(false); // Reseting the form submission state
    }
  }, [formSubmitted, username, name, email, password, confirmPassword, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Clearing any previous errors that has happended if happend
    setFormSubmitted(true); // API call is triggred using useffect();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md transform transition duration-500 ">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Join us for an amazing experience ✨
        </p>
        <form onSubmit={handleSubmit} className="space-y-2">
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input type="text" id="username" name="username"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input type="text" id="name" name="name"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" id="email" name="email"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input type="password" id="password" name="password"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input type="password" id="confirmPassword" name="confirmPassword" className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a
              href="#"
              className="text-purple-500 font-semibold hover:text-purple-700 transition duration-300"
            >
              Log in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

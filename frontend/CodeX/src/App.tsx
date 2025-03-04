import './App.css'
import Login from './components/Auth/Login'
import SignIn from './components/Auth/SignIn'
import ChatPage from './components/Chat/ChatPage'
import HeroOfFeature from './components/FeaturesOfCodeX/HeroOfFeature'
import Home from './components/Hero/Home'
import { Route,Routes } from 'react-router-dom'
function App() {
  return (
    <>
      <Routes> 
        <Route path='/logIn' element={<Login />}/>
        <Route path='/signIn' element={<SignIn />}/>
        <Route path='/chat' element={<ChatPage />}/>
        <Route path='/' element={<Home />}/>
        <Route path='/codefeatureSection' element={<HeroOfFeature />}/>
      </Routes>
    </>
  )
}

export default App

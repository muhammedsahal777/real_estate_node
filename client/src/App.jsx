import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Profile from './pages/Profile'
import About from './pages/About'
import Home from './pages/Home'
import SignIn from './pages/signIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/sign-in' element={<SignIn />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/sign-up' element={<SignUp />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

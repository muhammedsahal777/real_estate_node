import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Profile from './pages/Profile'
import About from './pages/About'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/sign-in' element={<SignIn />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/sign-up' element={<SignUp />}/>
          <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />   
        </Route>
        <Route path='/profile' element={<Profile />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

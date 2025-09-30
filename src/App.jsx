import { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import MyProfile from './components/MyProfile/MyProfile';
import UsersIndex from './components/UsersIndex/UsersIndex';
import SwapRequest from './components/SwapRequests/SwapRequests.jsx'

import * as skillService from "./services/skillService"

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user, setUser } = useContext(UserContext);

  const [userSkills, setUserSkills] = useState([])
  const [mySkills, setMySkills] = useState([])

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };  

  useEffect(() => {
    const fetchAllUserSkills = async () => {
      const UserSkillsData = await skillService.userIndex()
      setUserSkills(UserSkillsData)
    }
    if (user) fetchAllUserSkills()
  }, [user])

  useEffect(() => {
    const fetchMySkills = async () => {
      const MySkillsData = await skillService.myProfileIndex()
      setMySkills(MySkillsData)
    }
    if (user) fetchMySkills()
  }, [user])
  
  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
        {user ? (
          <>
          {/* Routes if there is user */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/skills" element={<UsersIndex userSkills={userSkills} />} />
            <Route path="/skills/my-skills" element={<MyProfile mySkills={mySkills} />} />

              <Route path="/profile" element={<MyProfile mySkills={mySkills} />} />
              <Route path="/swap-request/:id" element={<SwapRequest />} />
    </>
        ) : ( 
          <>
          {/* Routes if there is no user */}
            <Route path='/' element={<Landing />} />
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;

import { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import UsersIndex from './components/UsersIndex/UsersIndex';
import MyProfile from './components/MyProfile/MyProfile';


import * as skillService from "./services/skillService"

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);

  const [userSkills, setUserSkills] = useState([])
  const [mySkills, setMySkills] = useState([])

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
      <NavBar/>
      <Routes>
        {user ? (
          <>
          {/* Routes if there is user */}
            <Route path='/' element={<Dashboard />} />
            <Route path="/skills/my-skills" element={<MyProfile mySkills={mySkills} />} />
            <Route path="/skills" element={<UsersIndex userSkills={userSkills} />} />
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

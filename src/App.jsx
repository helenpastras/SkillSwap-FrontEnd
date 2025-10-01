import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { useParams } from 'react-router';


import NavBar from './components/NavBar/NavBar';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import MyProfile from './components/MyProfile/MyProfile';
import UsersIndex from './components/UsersIndex/UsersIndex';
import SwapRequest from './components/SwapRequests/SwapRequests.jsx'
import AddSkillForm from './components/MyProfile/AddSkillForm.jsx';

import * as skillService from "./services/skillService"

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate()

  const [userSkills, setUserSkills] = useState([])
  const [mySkills, setMySkills] = useState([])
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

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

  const handleAddSkill = async (skillFormData) => {
    // console.log("Skill Data:", skillFormData)
    const newSkill = await skillService.createSkill(skillFormData)
    setMySkills([newSkill, ...mySkills])
    navigate("/skills/my-skills")
  }
  
  const SwapRequestApp =() => {
    const { id } = useParams();
    const [recipientUser, setRecipientUser] = useState(null);

    useEffect(() => {
      const fetchRecipient = async () => {
       
          const res = await fetch(`${BASE_URL}/users/public/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          const data = await res.json();
          setRecipientUser({
            ...data.user,
            skillsOffered: data.skillsOffered,
            skillsWanted: data.skillsWanted
          });
     
      };
      fetchRecipient();
    }, [id]);
    console.log("Recipient user:", recipientUser);

    if (!recipientUser) return <p>Loading swap form...</p>;

    return (
      <SwapRequest
        currentUser={user}
        recipientUser={recipientUser}
        currentUserSkills={mySkills}
      />
    );
  };


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
              <Route path="/swap-request/:id" element={<SwapRequestApp />} />
              <Route path="/skills/new/:type" element={<AddSkillForm handleAddSkill={handleAddSkill} />} />
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

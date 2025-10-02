import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { useParams } from 'react-router';
import './App.css';

import NavBar from './components/NavBar/NavBar';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import MyProfile from './components/MyProfile/MyProfile';
import EditProfile from './components/MyProfile/EditProfileForm';
import SkillDetails from './components/MyProfile/SkillDetails';
import UsersIndex from './components/UsersIndex/UsersIndex';
import SwapRequest from './components/SwapRequests/SwapRequests'
import AddSkillForm from './components/MyProfile/AddSkillForm';
import SwapsInbox from './components/MyProfile/SwapsInbox';

import * as skillService from "./services/skillService"
import * as userService from "./services/userService"

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate()

  const [userSkills, setUserSkills] = useState([])
  const [mySkills, setMySkills] = useState([])
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  console.log(import.meta.env.VITE_BACKEND_URL);
  console.log(BASE_URL);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };  

  const handleUpdateProfile = async (userIndex, profileFormData) => {
    const updatedProfile = await userService.update(userIndex, profileFormData)
    console.log(updatedProfile)
    setUser(updatedProfile)
    // setProfile(updatedProfile)
    navigate("/profile")
  }

  /* ---------- HANDLING SKILlS ---------- */
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
    navigate("/profile")
  }

  const handleDeleteSkill = async (skillId) => {
    // console.log("deleted skill ID:", skillId)
    const deletedSkill = await skillService.deleteSkill(skillId)
    setMySkills(mySkills.filter((skill) => skill._id !== skillId))
    navigate("/profile")
  }

  const handleUpdateSkill = async (skillId, skillFormData) => {
    // console.log("skillId:", skillId, "skillFormData:", skillFormData)
    const updatedSkill = await skillService.updateSkill(skillId, skillFormData)
    setMySkills(mySkills.map((skill) => (skillId === skill._id ? updatedSkill : skill)))
    navigate(`/skills/${skillId}`)
  }

  
  /* ---------- HANDLING SWAPS ---------- */
  const SwapRequestApp =() => {
    const { id } = useParams();
    const [recipientUser, setRecipientUser] = useState(null);

    // useEffect(() => {
    //   const fetchRecipient = async () => {
       
    //       const res = await fetch(`${BASE_URL}/users/public/${id}`, {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem('token')}`
    //         }
    //       });
    //       const data = await res.json();
    //       setRecipientUser({
    //         ...data.user,
    //         skillsOffered: data.skillsOffered,
    //         skillsWanted: data.skillsWanted
    //       });
     
    //   };
    //   fetchRecipient();
    // }, [id]);
    // console.log("Recipient user:", recipientUser);

        useEffect(() => {
      const fetchRecipient = async () => {
       
          const res = await fetch(`${BASE_URL}/users/profile/${id}`, {
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

              <Route path="/profile" element={<MyProfile mySkills={mySkills} />} />
              <Route path="/profile/:userId" element={<EditProfile handleUpdateProfile={handleUpdateProfile} />} />
              <Route path="/profile/swap-requests" element={<SwapsInbox />} />
              <Route path="/skills/:skillId" element={<SkillDetails handleDeleteSkill={handleDeleteSkill} />} />
              <Route path="/swap-request/:id" element={<SwapRequestApp />} />
              <Route path="/skills/new/:type" element={<AddSkillForm handleAddSkill={handleAddSkill} />} />
              <Route path="/skills/edit/:skillId/:type" element={<AddSkillForm handleUpdateSkill={handleUpdateSkill} />} />
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

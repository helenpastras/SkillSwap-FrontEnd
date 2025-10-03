import { useEffect, useState, useContext } from 'react';

import { Link } from "react-router"

import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsers(fetchedUsers);
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchUsers();
  }, [user]);

  return (
    <main className="landing">
      <header className="landing-hero">
        <img
          src="https://imgur.com/Ri76Z2j.png"
          alt="SkillSwap-logo"
          className="landing-logo"
        />

        <h2>Swap Skills, Not Cash</h2>
        <p className="subtitle">
          Offer what you know, learn what you don’t. Start swapping today!
        </p>

        <div>
          <Link className="button" to="/skills">Browse Users</Link>
          <Link className="button" to="/profile">Your Skills</Link>
          <Link className="button" to="/profile/swap-requests">SwapRequests</Link>
        </div>
      </header>

      <section className="features">
        <div className="feature">
          <p className="feature-text">Offer your skills</p>
          <img src="https://imgur.com/OWiFnEm.png"/> 
          
        </div>

        <div className="feature">
          <p className="feature-text">Find your match</p>
          <img src="https://imgur.com/OcrnZaY.png"/> 
          
        </div>

        <div className="feature">
          <p className="feature-text">Swap & learn</p>
          <img src="https://imgur.com/UwVM5Yr.png"/> 
          
        </div>
      </section>    
    </main>
  );
};

export default Dashboard;


import { useState } from 'react';
import { Link } from 'react-router';

const NavBar = ({ user, handleSignOut }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleToggleProfileMenu = () => {
    setShowProfileMenu(prev => !prev);
  };


  return (
    <nav>
  {user ? (
    <ul className="main-nav">
      <li>Welcome, {user.username}</li>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/skills">Browse Users</Link></li>

      <li className="has-submenu">
        <button type="button" onClick={handleToggleProfileMenu}>
          Profile ▾
        </button>
        {showProfileMenu && (
          <ul className="submenu">
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/profile/swap-requests">My SwapRequests</Link></li>
          </ul>
        )}
      </li>

      <li>
        <button onClick={handleSignOut}>Sign Out</button>
      </li>
    </ul>
  ) : (
    <ul className="main-nav">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/sign-in">Sign In</Link></li>
      <li><Link to="/sign-up">Sign Up</Link></li>
    </ul>
  )}
</nav>
);
};

export default NavBar;

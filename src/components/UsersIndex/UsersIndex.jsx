import { useNavigate, Link } from 'react-router';
import { useState } from "react";
import { useContext } from "react"

import { UserContext } from "../../contexts/UserContext"

const UsersIndex = ({ userSkills }) => {
    const navigate = useNavigate();
    console.log({userSkills})

    const { user } = useContext(UserContext)
    const [searchTerm, setSearchTerm] = useState("");
    const filteredUserSkills = userSkills
      .filter(u => u._id !== user?._id)
      .filter(u => {
        const term = searchTerm.toLowerCase();
        const usernameMatch = u.username.toLowerCase().includes(term);
        const locationMatch = u.location?.toLowerCase().includes(term);

        const offeredMatch = u.skillsOffered.some(skill =>
          skill.skillName.toLowerCase().includes(term) ||
          skill.category.toLowerCase().includes(term)
        );

        const wantedMatch = u.skillsWanted.some(skill =>
          skill.skillName.toLowerCase().includes(term) ||
          skill.category.toLowerCase().includes(term)
        );

        return usernameMatch || locationMatch || offeredMatch || wantedMatch;
      });
        
 return (
    <>
      <h1>All Users – Browse Skills</h1>
      <main>
        <input
          type="text"
          placeholder="Search by skill, category, username, or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <div className="users-grid">
          {filteredUserSkills.map((user) => (
            <div key={user._id} className="card">
              <h2>{user.username}</h2>
              <h4>Skills Offered</h4>
              {user.skillsOffered.length ? (
                <ul>
                  {user.skillsOffered.map((skill) => (
                    <Link key={skill._id} to={`/skills/${skill._id}`}> 
                    <li>
                      <strong>{skill.skillName}</strong>
                      <div>
                        {skill.category}, {skill.skillLevel}, {skill.timeFrame}
                      </div>
                    </li>
                    </Link>
                  ))}
                </ul>
              ) : (
                <p>No skills offered yet!</p>
              )}

              <h4>Skills Wanted</h4>
              {user.skillsWanted.length ? (
                <ul>
                  {user.skillsWanted.map((skill) => (
                    <Link key={skill._id} to={`/skills/${skill._id}`}>
                    <li>
                      <strong>{skill.skillName}</strong>
                      <div>
                        {skill.category}, {skill.skillLevel}, {skill.timeFrame}
                      </div>
                    </li>
                    </Link>
                  ))}
                </ul>
              ) : (
                <p>No skills wanted yet!</p>
              )}

            {/* ✅ Button outside the Link */}
            <button onClick={() => navigate(`/swap-request/${user._id}`)}>
              Request SkillSwap
            </button>
          </div>
        ))}
        </div>
      </main>
    </>
  );
};
    

export default UsersIndex


import { useNavigate } from 'react-router';

import { useContext } from "react"

import { UserContext } from "../../contexts/UserContext"

const UsersIndex = ({ userSkills }) => {
    const navigate = useNavigate();
    console.log({userSkills})

    const { user } = useContext(UserContext)
    const filteredUserSkills = userSkills.filter(u => u._id !== user?._id);
    

 return (
    <>
      <h1>All Users – Browse Skills</h1>
      <main>
        {filteredUserSkills.map((user) => (
          <div key={user._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
              <h2>{user.username}</h2>
              <h4>Skills Offered</h4>
              {user.skillsOffered.length ? (
                <ul>
                  {user.skillsOffered.map((skill) => (
                    <li key={skill._id}>
                      <strong>{skill.skillName}</strong>
                      <div>
                        {skill.category}, {skill.skillLevel}, {skill.timeFrame}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No skills offered yet!</p>
              )}

              <h4>Skills Wanted</h4>
              {user.skillsWanted.length ? (
                <ul>
                  {user.skillsWanted.map((skill) => (
                    <li key={skill._id}>
                      <strong>{skill.skillName}</strong>
                      <div>
                        {skill.category}, {skill.skillLevel}, {skill.timeFrame}
                      </div>
                    </li>
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
      </main>
    </>
  );
};
    

export default UsersIndex


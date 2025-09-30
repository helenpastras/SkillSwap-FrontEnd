import { Link } from "react-router"
import { useNavigate } from 'react-router';


const UsersIndex = ({ userSkills }) => {
    const navigate = useNavigate();
    console.log({userSkills})
    
    // Need to separate based on skillsOffered and skillsWanted

 return (
    <>
      <h1>All Users – Browse Skills</h1>
      <main>
        {userSkills.map((user) => (
          <div key={user._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <Link to={`/users/${user._id}`}>
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
            </Link>

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


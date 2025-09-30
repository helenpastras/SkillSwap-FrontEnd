import { Link } from "react-router"

const UsersIndex = ({ userSkills }) => {

    return (
        <>
        <h1> All Users - Browse Skills </h1>
            <main>
                {userSkills.map((user) => (
                    <Link key={user._id} to={`/users/${user._id}`}>
                        <h3>{user.username}</h3>
                        {user.skillsOffered.length ? (
                        <ul>
                            {user.skillsOffered.map(skill => (
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
                    </Link>
                ))}
            </main>
        </>
    )
}

export default UsersIndex


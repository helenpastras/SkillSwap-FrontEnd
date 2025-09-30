
import { useContext } from "react"

import { UserContext } from "../../contexts/UserContext"


const MyProfile = ({ mySkills }) => {
    console.log({mySkills})
    
    const { user } = useContext(UserContext)
    console.log({user})

    const offered = mySkills.filter(skill => skill.type === "offered")
    const wanted = mySkills.filter(skill => skill.type === "wanted")
    
    return (
        <>
        <h1> My Profile </h1>
        <h2> {user.name}</h2>
        <h2> {user.username}</h2>
        <h2> {user.location} </h2>
            <section>
                <h2> Skills Offered</h2>
                {offered.length ? (
                    <ul>
                        {offered.map(skill => (
                            <li key={skill._id}>
                                <strong> Skill: {skill.skillName} </strong>
                                <div>
                                Category: {skill.category}, 
                                Time Requirement: {skill.timeFrame}, 
                                Level of Expertise: {skill.skillLevel},
                                Description;{skill.description}
                                </div>
                                <button>Add offered skill</button>
                            </li>
                        ))}
                    </ul>
                    
                ) : (
                    <p>No offered skills yet!</p>
                )}

                <h2> Skills Wanted </h2>
                {wanted.length ? (
                    <ul>
                        {wanted.map(skill => (
                            <li key={skill._id}>
                                <strong> Skill: {skill.skillName} </strong>
                                <div>
                                Category: {skill.category}, 
                                Time Requirement: {skill.timeFrame}, 
                                Level of Expertise: {skill.skillLevel}
                                </div>
                                <button>Add wanted skill</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No wanted skills yet!</p>
                )}

            
            </section>
        </>
        

    )
}

export default MyProfile
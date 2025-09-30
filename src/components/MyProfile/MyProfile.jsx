
import { useContext } from "react"

import { UserContext } from "../../contexts/UserContext"


const MyProfile = ({ mySkills }) => {
    console.log({mySkills})
    
    const { user } = useContext(UserContext)

    const offered = mySkills.filter(skill => skill.type === "offered")
    const wanted = mySkills.filter(skill => skill.type === "wanted")
    

    return (
        <>
        <h1> {user.username}'s Profile </h1>
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
                                Level of Expertise: {skill.skillLevel}
                                </div>
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
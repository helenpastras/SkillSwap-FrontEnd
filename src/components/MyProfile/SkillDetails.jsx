import { useParams, Link } from "react-router"
import { useState, useEffect, useContext } from "react"

import { UserContext } from "../../contexts/UserContext"

import * as skillService from "../../services/skillService"


const SkillDetails = ({ handleDeleteSkill }) => {

    const { skillId } = useParams()
    console.log("skillId:", skillId)

    const { user } = useContext(UserContext)
    console.log(user)

    const [skill, setSkill] = useState(null)
    console.log(skill)

    useEffect(() => {
        const fetchSkill = async () => {
            const skillData = await skillService.showSkill(skillId)
            setSkill(skillData)
        }
        fetchSkill()
    }, [skillId])

    console.log("skill state:", skill)

    if(!skill) return <main>Loading...</main> // account for issue if there is no skill 

    return (
        <>
            <h1> {skill.skillName} Details!</h1>
            <p className="addedOn">added on {new Date(skill.createdAt).toLocaleDateString()}</p>
            <ul>
                <li><strong>Category</strong>: {skill.category}</li>
                <li><strong>Level of Expertise:</strong> {skill.skillLevel}</li>
                {skill.type === "offered" && ( 
                <>
                <li><strong>Time Frame:</strong> {skill.timeFrame}</li>
                <li><strong>Description:</strong> {skill.description}</li>
                </>
                )}
            </ul>
            {skill.user._id === user._id ? (
                <>
                    <Link to={`/profile`} className="button">Back to My Skills</Link>
                    <Link to={`/skills/edit/${skillId}/${skill.type}`} className="button">Edit Skill</Link>
                    <button onClick={() => handleDeleteSkill(skillId)}>Delete Skill</button>

                </>
            ): (
                <>
                    <Link to={`/skills`} className="button">Back to Browse Skills</Link>
                </>
            )}
        </>
    )
}

export default SkillDetails
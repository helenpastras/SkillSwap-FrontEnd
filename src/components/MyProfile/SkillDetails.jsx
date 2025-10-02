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
            <p>added on {new Date(skill.createdAt).toLocaleDateString()}</p>
            <ul>
                <li>Category: {skill.category}</li>
                <li>Level of Expertise: {skill.skillLevel}</li>
                <li>Time Frame: {skill.timeFrame}</li>
                <li>Description: {skill.description}</li>
            </ul>
            {skill.user._id === user._id && (
                <>
                    <button><Link to={`/skills/edit/${skillId}/${skill.type}`}>Edit Skill</Link></button>
                    <button onClick={() => handleDeleteSkill(skillId)}>Delete Skill</button>
                </>
            )}
        </>
    )
}

export default SkillDetails
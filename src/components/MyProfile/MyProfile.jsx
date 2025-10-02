
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import { Link } from "react-router"

import '../../App.css';

const MyProfile = ({ mySkills }) => { // add profile here maybe?
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
        <p> {user.bio} </p>
            <section className="card">
                <h2> Skills Offered</h2>
                <button> <Link to={"/skills/new/offered"}> Add offered skill </Link></button>
                {offered.length ? (
                    <ul>
                        {offered.map(skill => (
                           <Link key={skill._id} to={`/skills/${skill._id}`}> 
                           <li>
                                <strong> {skill.skillName} </strong>
                                <div>
                                {skill.category}
                                </div>
                            </li>
                            </Link>
                        ))}
                    </ul>
                    
                ) : (
                    <p>No offered skills yet!</p>
                )}

                <h2> Skills Wanted </h2>
                <button> <Link to={"/skills/new/wanted"}> Add wanted skill </Link></button>
                {wanted.length ? (
                    <ul>
                        {wanted.map(skill => (
                            <Link key={skill._id} to={`/skills/${skill._id}`}> 
                            <li>
                                <strong> {skill.skillName} </strong>
                                <div>
                                {skill.category}
                                </div>
                            </li>
                            </Link>
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
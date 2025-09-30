
const UsersIndex = (props) => {

    return (
        <>
        <h1> All Users - Browse Skills </h1>
            <main>
                {props.skills.map((skill) => (
                    <p key={skill._id}>{skill.skillName}</p>
                ))}
            </main>
        </>
    )
}

export default UsersIndex


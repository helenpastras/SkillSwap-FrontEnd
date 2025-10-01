const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/skills`

const userIndex = async () => {
    try {
        const res = await fetch(`${BASE_URL}/browse-users`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        return res.json()
    } catch (err) {
        console.log(err)
    }
}

const myProfileIndex = async () => {
    try {
        const res = await fetch(`${BASE_URL}/my-skills`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        return res.json()
    } catch (err) {
        console.log(err)
    }
}

const createSkill = async (skillFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(skillFormData)
        })
        return res.json()
    } catch (err) {
        console.log(err)
    }

}

const showSkill = async (skillId) => {
    try {
        const res = await fetch(`${BASE_URL}/${skillId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return res.json()
    } catch (err) {
        console.log(err)
    }
}

const deleteSkill = async (skillId) => {
    try {
        const res = await fetch(`${BASE_URL}/${skillId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return res.json()
    } catch (err) {
        console.log(err)
    }
}


export {
    userIndex,
    myProfileIndex,
    createSkill,
    showSkill,
    deleteSkill,
}
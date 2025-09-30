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

export {
    userIndex,
}
import { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';

import * as userService from "../../services/userService"

import { UserContext } from '../../contexts/UserContext';

const EditProfile = ({ handleUpdateProfile }) => {

    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    console.log(user)
    const { userId } = useParams()
    console.log(userId)

    const initialState = {
        name: "",
        location: "",
        bio: "",
    }

    const [formData, setFormData] = useState(initialState)
    const { name, location, bio } = formData

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value})
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        console.log(formData)
        handleUpdateProfile(userId, formData)
    }

    return (
    <main>
      <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name:</label>
            <input
                type='text'
                id='name'
                value={name}
                name='name'
                onChange={handleChange}
                required
            />
            <label htmlFor='location'>Location:</label>
            <input
                type='text'
                id='location'
                value={location}
                name='location'
                onChange={handleChange}
                required
            />
            <label htmlFor='bio'>Bio:</label>
            <input
                type='textarea'
                id='bio'
                value={bio}
                name='bio'
                onChange={handleChange}
            />
            <div>
            <button type="submit">Update Profile</button>
            </div>
        </form>
    </main>
  );

}

export default EditProfile
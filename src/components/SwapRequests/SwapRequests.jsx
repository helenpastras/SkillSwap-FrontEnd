
import { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

const SwapRequest = (props) => {
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    // const { id } = useParams();
    const initialState = {
        requester: '',
        skillProvider: '',
        skillRequested: '',
        skillOffered: '',
        comments: '',
        status: 'pending',
        requestMessage:'',
        responseMessage:''
    }

    const [formData, setFormData] = useState(
        props.selected ? props.selected : initialState
    )

      useEffect(() => {
    if (!props.selected && props.currentUser && props.recipientUser) {
      setFormData(prev => ({
        ...prev,
        requester: props.currentUser._id,
        skillProvider: props.recipientUser._id
      }));
    }
  }, [props.selected, props.currentUser, props.recipientUser]);
    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value})
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
    
        const payload = {
            skillRequestedId: formData.skillRequested,
            skillOfferedId: formData.skillOffered,
            comments: formData.comments,
            requestMessage: formData.requestMessage
        };

        try {
            const res = await fetch(`${BASE_URL}/swap-requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(payload)
            });

            const data = await res.json();
            console.log("Swap request sent:", data);
            // Optional: redirect, show success banner, clear form
        } catch (err) {
            console.error("Error sending swap request:", err.message);
        }
    }
return (
    <div>
        <form onSubmit={handleSubmit}>
            <p><strong>From:</strong> {props.currentUser?.username}</p>
            <p><strong>To:</strong> {props.recipientUser?.username}</p>

            <input type="hidden" name="requester" value={formData.requester} />
            <input type="hidden" name="skillProvider" value={formData.skillProvider} />

            <label htmlFor="skillRequested">Skill You’re Requesting</label>
                <select
                    id="skillRequested"
                    name="skillRequested"
                    value={formData.skillRequested || ''}
                    onChange={handleChange}
                    required
                >
                <option value="">-- Select a skill --</option>
                {(props.recipientUser?.skillsOffered || []).filter(skill => skill.type === 'offered')
                    .map(skill => (
                    <option key={skill._id} value={skill._id}>
                        {skill.skillName}
                    </option>
                    ))}
                </select>

            <label htmlFor="skillOffered">Skill You’re Offering</label>
                <select
                    id="skillOffered"
                    name="skillOffered"
                    value={formData.skillOffered || ''}
                    onChange={handleChange}
                    required
                >
                <option value="">-- Select a skill --</option>
                {(props.currentUserSkills || [])
                    .filter(skill => skill.type === 'offered')
                    .map(skill => (
                        <option key={skill._id} value={skill._id}>
                        {skill.skillName}
                        </option>
                    ))}
                </select>
                
            <label htmlFor="comments"> Comments </label>
                <textarea
                    id="comments"
                    name="comments"
                    value={formData.comments || ''}
                    onChange={handleChange} 
                    rows={4}
                    placeholder="Add any additional info about yourrequest and offering, for your Swap's recipient"
                />
        </form>
            <div style={{ marginTop: '1rem' }}>
                <button type="submit">Send Request</button>
                <button type="button" onClick={() => navigate('/skills')}>
                    Cancel
                </button>
            </div>
    </div>
        
)};
    console.log("this is where all swap requests structure and form will live");
   

export default SwapRequest;
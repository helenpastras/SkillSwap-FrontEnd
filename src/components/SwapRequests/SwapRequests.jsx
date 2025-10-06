
import { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import { useLocation } from 'react-router';


import {createSwapRequest, updateSwapRequest} from '../../services/swapRequestsService';;

const SwapRequest = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const selected = location.state?.selected;
    const { token } = useContext(UserContext);
    const { recipientUser } = props;

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
    
    const [successMessage, setSuccessMessage] = useState('');
    

    const [formData, setFormData] = useState(selected || initialState);
        useEffect(() => {
            if (selected) {
                const normalized = {
                ...selected,
                skillRequested: selected.skillRequested?._id || '',
                skillOffered: selected.skillOffered?._id || '',
                };
                setFormData(normalized);
            } else if (props.currentUser && props.recipientUser) {
                setFormData(prev => ({
                ...prev,
                requester: props.currentUser._id,
                skillProvider: props.recipientUser._id
                }));
            }
            }, [selected, props.currentUser, props.recipientUser]);
            console.log("Normalized formData:", formData);


    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value})
    };

    const isEditing = !!selected;
const handleSubmit = async (evt) => {
  evt.preventDefault();

  const payload = {
    skillRequestedId: formData.skillRequested,
    skillOfferedId: formData.skillOffered,
    comments: formData.comments,
    requestMessage: formData.requestMessage
  };
    console.log("skillRequested:", formData.skillRequested);
    console.log("skillOffered:", formData.skillOffered);

  try {
    if (isEditing) {
      await updateSwapRequest(selected._id, payload, token);
      setSuccessMessage('✅ Your request was updated!');
    } else {
      await createSwapRequest(payload, token);
      setSuccessMessage('✅ Your request was sent!');
    }

    setTimeout(() => {
      navigate("/profile/swap-requests");
    }, 1500);
  } catch (err) {
    console.error("Error:", err.message);
    setSuccessMessage('❌ Something went wrong. Please try again.');
  }
};
return (
    <div>
        {successMessage && (
  <div className="success-banner" style={{ marginBottom: '1rem', color: 'green' }}>
    {successMessage}
  </div>
)}
    
        {selected && (
        <div style={{ marginBottom: '1rem', color: '#555' }}>
            ✏️ <strong>Editing your request</strong> — you can update the skills, message, or comments.
            <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.5rem' }}>
            Previously requested: <strong>{selected.skillRequested?.skillName || '—'}</strong> ↔️ Offered: <strong>{selected.skillOffered?.skillName || '—'}</strong>
            </p>
        </div>
        )}
    <form onSubmit={handleSubmit}>
            <p className="swapForm"><strong>From:</strong> {props.currentUser?.username}</p>
            <p className="swapForm"><strong>To:</strong> {recipientUser?.username}</p>

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
            <div style={{ marginTop: '1rem' }}>
                <button type="submit">{isEditing ? 'Update Request' : 'Send Request'}</button>
                <button type="button" onClick={() => navigate('/skills')}>
                    Cancel
                </button>
            </div>
        </form>
    </div>
        
)};
    console.log("this is where all swap requests structure and form will live");
   

export default SwapRequest;
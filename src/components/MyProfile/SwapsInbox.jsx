
import { useState} from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';


import { UserContext } from '../../contexts/UserContext';
import {
  getReceivedRequests,
  getSentRequests,
  acceptRequest,
  declineRequest, 
  updateSwapStatus
} from '../../services/swapRequestsService';

const SwapsInbox = () => {
  const { token, currentUser } = useContext(UserContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [responseMessages, setResponseMessages] = useState({});

  useEffect(() => {
    const fetchRequests = async () => {
  try {
    const [receivedRes, sentRes] = await Promise.all([
      getReceivedRequests(token),
      getSentRequests(token)
    ]);
    const combined = [...receivedRes.data, ...sentRes.data];
    setRequests(combined);
  } catch (err) {
    console.error('Error fetching swap requests:', err.message);
  } finally {
    setLoading(false);
  }
      };
      fetchRequests();
    }, [token]);

  const handleResponseChange = (id, value) => {
    setResponseMessages(prev => ({ ...prev, [id]: value }));
  };

  const handleAccept = async (id) => {
    try {
      const res = await acceptRequest(id, responseMessages[id] || '', token);
      setRequests(prev => prev.map(r => (r._id === id ? res.data : r)));
    } catch (err) {
      console.error('Error accepting request:', err.message);
    }
  };

  const handleDecline = async (id) => {
    try {
      const res = await declineRequest(id, responseMessages[id] || '', token);
      setRequests(prev => prev.map(r => (r._id === id ? res.data : r)));
    } catch (err) {
      console.error('Error declining request:', err.message);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
  try {
    const res = await updateSwapStatus(id, newStatus, token);
    setRequests(prev => prev.map(r => (r._id === id ? res.data : r)));
  } catch (err) {
    console.error(`Error updating status to ${newStatus}:`, err.message);
  }
};


  const renderRequestCard = (request) => (
    <div className='card' key={request._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <p><strong>From:</strong> {request.requester?.username}</p>
      <p><strong>Requested Skill:</strong> {request.skillRequested?.skillName}</p>
      <p><strong>Offered Skill:</strong> {request.skillOffered?.skillName}</p>
      <p><strong>Message:</strong> {request.requestMessage}</p>
      <p><strong>Comments:</strong> {request.comments}</p>
      <p><strong>Status:</strong> {request.status}</p>
        {request.status === 'pending' && <span style={{ color: '#999' }}>🕓 Pending</span>}
        {request.status === 'accepted' && <span style={{ color: '#2a9d8f' }}>✅ Accepted</span>}
        {request.status === 'in-progress' && <span style={{ color: '#f4a261' }}>🟡 In Progress</span>}
        {request.status === 'completed' && <span style={{ color: '#264653' }}>🏁 Completed</span>}
        {request.status === 'declined' && <span style={{ color: '#e76f51' }}>❌ Declined</span>}

      
    {request.status === 'pending' && request.requester?._id !== currentUser?._id && (
      <>
        <textarea
          placeholder="You can add a response message (optional)."
          value={responseMessages[request._id] || ''}
          onChange={e => handleResponseChange(request._id, e.target.value)}
          rows={2}
          style={{ width: '100%', marginBottom: '0.5rem' }}
        />
        <button onClick={() => handleAccept(request._id)}>Accept</button>
        <button onClick={() => handleDecline(request._id)}>Decline</button>
      </>
    )}

    {request.status === 'pending' && request.requester?._id === currentUser?._id && (
      <p><em>Waiting for response from {request.skillProvider?.username}</em></p>
    )}

    {['accepted', 'in-progress'].includes(request.status) && (
      <div style={{ marginTop: '1rem' }}>
        <p><strong>Update Status:</strong></p>
        {request.status !== 'in-progress' && (
          <button onClick={() => handleStatusUpdate(request._id, 'in-progress')}>Mark In-Progress</button>
        )}
        <button onClick={() => handleStatusUpdate(request._id, 'completed')}>Mark Completed</button>
      </div>
    )}
  </div>
  );


  if (loading) return <p>Loading your inbox...</p>;
  if (!requests.length) return <p>No swap requests yet!</p>;

  const newRequests = requests.filter(r => r.status === 'pending');
  const pastRequests = requests.filter(r => r.status !== 'pending');

  return (
    <div>
      <h2>🆕 New Requests</h2>
      {newRequests.length ? newRequests.map(renderRequestCard) : <p>No new requests.</p>}

      <h2 style={{ marginTop: '2rem' }}>📁 Past Requests</h2>
      {pastRequests.length ? pastRequests.map(renderRequestCard) : <p>No past requests yet.</p>}
    </div>
  );
};

export default SwapsInbox;
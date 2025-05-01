import React, { useEffect, useState } from 'react';
import axios from 'axios';


const SecureXSS = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/secure-comments');
      setComments(res.data);
    } catch (err) {
      console.error('Error fetching secure comments:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/secure-comment', { comment });
      setComment('');
      fetchComments();
    } catch (err) {
      console.error('Error submitting comment:', err);
    }
  };

  const handleClear = () => {
    // Clear only the frontend state (does not affect database)
    setComments([]);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="secure-container">
      <h2>Secure Comment Box</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a safe comment..."
          required
        />
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleClear} style={{ backgroundColor: '#ff4d4f' }}>
            Clear
          </button>
        </div>
      </form>
      <div className="secure-comments">
        {comments.length > 0 ? (
          comments.map((c) => <div key={c.id}>{c.text}</div>)
        ) : (
          <p>No comments displayed.</p>
        )}
      </div>
    </div>
  );
};

export default SecureXSS;

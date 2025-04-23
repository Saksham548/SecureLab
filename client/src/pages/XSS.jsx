import React, { useState, useEffect } from 'react';
import axios from 'axios';

const XSS = () => {
  const [comment, setComment] = useState('');
  const [latestComment, setLatestComment] = useState('');

  const fetchLatestComment = async () => {
    try {
      const res = await axios.get('http://localhost:5000/latest-comment');
      setLatestComment(res.data.text);
    } catch (err) {
      setLatestComment('Error fetching comment');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/comment', { comment });
      fetchLatestComment();
    } catch (err) {
      setLatestComment('Error saving comment');
    }
  };

  useEffect(() => {
    fetchLatestComment();
  }, []);

  return (
    <div className="container">
      <h2>XSS Demonstration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Try: <script>alert('XSS!')</script>"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h3>Latest Comment:</h3>
<div dangerouslySetInnerHTML={{ __html: latestComment }} />

    </div>
  );
};

export default XSS;

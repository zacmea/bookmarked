import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditBookmark = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/bookmarks/${id}`)
      .then((res) => res.json())
      .then((bookmark) => {
        setName(bookmark.name);
        setUrl(bookmark.url);
      });
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.value.startsWith('http://') || e.target.value.startsWith('https://')
      ? e.target.value
      : `http://${e.target.value}`;
    setUrl(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3001/bookmarks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ name, url }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update bookmark.');
        }
        navigate('/'); // Navigate to home page after successful update
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Edit Bookmark</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          name='name'
          id='name'
          placeholder='Enter bookmark name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='url'>URL:</label>
        <input
          type='text'
          name='url'
          id='url'
          placeholder='Enter bookmark URL'
          value={url}
          onChange={handleChange}
        />
        <input type='submit' value='Update Bookmark' />
      </form>
    </div>
  );
};

export default EditBookmark
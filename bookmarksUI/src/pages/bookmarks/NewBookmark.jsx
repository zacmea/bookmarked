import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewBookmark = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value.startsWith('http://') || e.target.value.startsWith('https://')
      ? e.target.value
      : `http://${e.target.value}`;
    setUrl(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3001/bookmarks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, url }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to create bookmark.');
        }
      })
      .then(() => {
        navigate('/'); // Navigate to home page after successful POST
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Create New Bookmark</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          name='title'
          id='title'
          placeholder='Enter a title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor='url'>URL:</label>
        <input
          type='text'
          name='url'
          id='url'
          placeholder='Enter a URL'
          value={url}
          onChange={handleChange}
        />
        <input type='submit' value='Create Bookmark' />
      </form>
      <a href='/bookmarks'>Go back</a>
    </div>
  );
};

export default NewBookmark
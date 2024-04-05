import React, { useState } from 'react';

const AddBookmark = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'url') {
      const formattedValue = value.startsWith('http://')
        ? value
        : `http://${value}`;
      setUrl(formattedValue);
    } else if (name === 'title') {
      setTitle(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBookmark = { title, url };
    fetch('http://localhost:3001/bookmarks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBookmark),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add new bookmark.');
        }
        return response.json();
      })
      .then((data) => {
        onAdd(data);
        setTitle('');
        setUrl('');
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-between">
      <input
        type="text"
        name="title"
        placeholder="Website"
        value={title}
        onChange={handleChange}
        className="shadow border rounded px-2 text-gray-700 mr-3 w-1/2"
      />
      <input
        type="text"
        name="url"
        placeholder="http://"
        value={url}
        onChange={handleChange}
        className="shadow border rounded px-2 text-gray-700 w-1/2"
      />
      <button type="submit" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-3 ">
        Add!
      </button>
    </form>
  );
};

export default AddBookmark
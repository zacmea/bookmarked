import React from 'react';

const EditBookmark = ({ bookmark, onUpdate, onCancel }) => {
  const [title, setTitle] = React.useState(bookmark.title);
  const [url, setUrl] = React.useState(bookmark.url);

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

  const handleUpdate = () => {
    const updatedBookmark = { title, url };
    fetch(`http://localhost:3001/bookmarks/${bookmark._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBookmark),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update bookmark.');
        }
        return response.json();
      })
      .then(() => {
        onUpdate(updatedBookmark);
        onCancel(); // Close the edit form
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="flex justify-between items-center">
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        className="shadow border rounded py-2 px-2 text-gray-700 mr-3 w-1/2"
      />
      <input
        type="text"
        name="url"
        value={url}
        onChange={handleChange}
        className="shadow border rounded py-2 px-2 text-gray-700 mr-3 w-1/2"
      />
      <a href="#" onClick={handleUpdate} className="text-blue-500 hover:text-blue-700 mr-3 text-xl" style={{ fontFamily: 'Permanent Marker' }}>
        Save
      </a>
      <a href="#" onClick={onCancel} className="text-gray-500 hover:text-gray-700 text-xl" style={{ fontFamily: 'Permanent Marker' }}>
        Cancel
      </a>
    </div>
  );
};

export default EditBookmark
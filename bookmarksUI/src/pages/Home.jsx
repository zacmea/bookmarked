import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/bookmarks')
      .then((res) => res.json())
      .then((data) => {
        setBookmarks(data.sort((a, b) => a.title.localeCompare(b.title)));
      });
  }, []);

  const deleteBookmark = (id) => {
    fetch(`http://localhost:3001/bookmarks/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setBookmarks(bookmarks.filter((bookmark) => bookmark._id !== id));
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/new">Add New Bookmark</Link>
      <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark._id}>
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
              {bookmark.title}
            </a>
            <button onClick={() => deleteBookmark(bookmark._id)}>Delete</button>
            <Link to={`/bookmarks/${bookmark._id}`}>View/Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

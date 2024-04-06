import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AddBookmark from '../components/AddBookmark';
import EditBookmark from '../components/EditBookmark';

const Home = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/bookmarks')
      .then((response) => {
        return response.json()})
      .then((data) => setBookmarks(data)); //set the bookmarks state to the data from the response
  }, []);

  const deleteBookmark = (id) => {
    fetch(`http://localhost:3000/bookmarks/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setBookmarks(bookmarks.filter((bookmark) => bookmark._id !== id));
    });
  };

  const addBookmark = (newBookmark) => {
    fetch('http://localhost:3000/bookmarks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBookmark),
    })
      .then((response) => {
        return response.json()})
      .then((data) => {
        setBookmarks([...bookmarks, data]);
      })
      .then(() => {
        navigate('/')
        });
  };

  const updateBookmark = (id, updatedBookmark) => {
    fetch(`http://localhost:3000/bookmarks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBookmark),
    })
      .then((response) => response.json())
      .then(() => {
        setBookmarks(bookmarks.map((bookmark) => (bookmark._id === id ? updatedBookmark : bookmark)));
        setEditIndex(null);
      });
  };

  const cancelEdit = () => {
    setEditIndex(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-500"> {/* Dark background */}
      <div className="container mx-auto px-4 max-w-lg bg-gray-200 shadow-lg rounded-lg p-6"> {/* Framed appearance */}
        <h1 className="text-4xl text-center font-bold my-6 bg-red-600 text-white py-2 px-4 rounded">
          Bookmarks
        </h1>
        <h2 className="text-2xl text-center my-4">
          Add a new Bookmark
        </h2>
        <div className="flex justify-center mb-4">
          <AddBookmark onAdd={addBookmark} />
        </div>
        <ul className="list-none p-0">
          {bookmarks.map((bookmark, index) => (
            <li key={bookmark._id} className="bg-red-100 flex items-center justify-between mb-2 p-4 rounded shadow">
              {editIndex === index ? (
                <EditBookmark
                  index={index}
                  bookmark={bookmark}
                  onUpdate={(updatedBookmark) => updateBookmark(bookmark._id, updatedBookmark)}
                  onCancel={cancelEdit}
                />
              ) : (
                <div className="flex items-center justify-between w-full">
                  <Link to={bookmark.url} target="_blank" rel="noopener noreferrer" className="flex-1 mr-4">
                    {bookmark.title}
                  </Link>
                  <Link to="#" onClick={(e) => { e.preventDefault(); setEditIndex(index); }} className="text-blue-500 hover:text-blue-700 mr-2">Edit</Link>
                  <Link to="#" onClick={(e) => { e.preventDefault(); deleteBookmark(bookmark._id); }} className="text-red-500 hover:text-red-700 font-bold"> {/* Delete as X */}
                    &#10005;
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home

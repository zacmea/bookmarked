import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ShowBookmark = () => {
  const { id } = useParams();
  const [bookmark, setBookmark] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/bookmarks/${id}`)
      .then((res) => res.json())
      .then((jsonRes) => setBookmark(jsonRes));
  }, [id]);

  return (
    <div>
      <h1>Bookmark Details</h1>
      {bookmark && (
        <div>
          <p>Title: {bookmark.title}</p>
          <p>URL: <a href={bookmark.url} target="_blank" rel="noopener noreferrer">{bookmark.url}</a></p>
          <div>
            <Link to={`/bookmarks/${bookmark._id}/edit`}>Edit this Bookmark</Link>
            <Link to="/">Home</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBookmark
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => { //useEffect is a hook that runs after the first render of the component
    fetch("http://localhost:3000/bookmarks") //fetching the bookmarks route
      .then((res) => {
        if (res.ok) {   //if the response is okay
          return res.json();    //return the response as JSON
        }
      })
      .then((jsonRes) => setBookmarks(jsonRes));    //then set the bookmarks state to the JSON response
  }, []);

  

//Why was this in the fruits MERN app here in the Home view??
  //   const handleDelete = (id) => {
//     fetch(`http://localhost:3000/bookmarks/${id}`, {  //fetching bookmarks route w/ id of the bookmark to delete
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json(); //if the response is okay, return the response as JSON
//         } else {
//           throw new Error("Failed to delete bookmark.");
//         }
//       })
//       .then(() => {
//         navigate("/"); //then navigate back to the home page
//       });
//   };


  return (
    <div>
      <h1>All bookmarks</h1>
        <Nav />
      <ul className="flex flex-col">
        {bookmarks &&  //if bookmarks exist
          bookmarks.map((bookmark, index) => { //map through the bookmarks to return 
            return (
              <li className="flex">
                <Link className="mx-5" to={`/bookmarks/${bookmark._id}`}>
                  {item.name}
                </Link>
                <form onSubmit={() => handleDelete(bookmark._id)}>
                  <input type="submit" value="X" />
                </form>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Home;

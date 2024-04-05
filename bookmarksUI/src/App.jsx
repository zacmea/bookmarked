import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import EditBookmark from "./pages/bookmarks/EditBookmark";
import ShowBookmark from "./pages/bookmarks/ShowBookmark";
import NewBookmark from "./pages/bookmarks/NewBookmark";

import Auth from "./components/Auth";

function App() {
  const [user, setUser] = useState(null)

  return (
    <div>
      <Navbar />
      {
        user ?
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookmarks/new" element={<NewBookmark />} />
          <Route path="/bookmarks/:id" element={<ShowBookmark />} />
          <Route path="/bookmarks/:id/edit" element={<EditBookmark />} />
        </Routes> :
        <Auth user={user} setUser={setUser}/>
      }
      <Footer />
    </div>
  );
}

export default App
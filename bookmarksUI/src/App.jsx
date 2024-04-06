import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auth from "./components/Auth";

function App() {
  const [user, setUser] = useState(null)

  return (
    <div>
      {
        user ?
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes> :
        <Auth user={user} setUser={setUser}/>
      }
      <Footer />
    </div>
  );
}

export default App
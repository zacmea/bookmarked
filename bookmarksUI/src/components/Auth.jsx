import { useState } from "react";

export default function Auth(props) {
    const [showLogin, setShowLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            props.setUser(data.user)
            localStorage.setItem('token', data.token)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSignUp = async () => {
        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            props.setUser(data.newUser)
            localStorage.setItem('token', data.token)
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-500">
          <div className="container mx-auto px-4 max-w-lg bg-gray-200 shadow-lg rounded-lg p-6">
            <section>
              <h2 className="text-4xl text-center font-bold my-6 bg-red-700 text-white py-2 px-4 rounded">
                {showLogin ? "Login" : "SignUp"}
              </h2>
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="text-blue-500 hover:text-blue-700 mb-4"
              >
                {showLogin ? "Switch to SignUp" : "Switch to Login"}
              </button>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  showLogin ? handleLogin() : handleSignUp();
                }}
                className="flex flex-col items-center space-y-3"
              >
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="shadow border rounded py-2 px-4 text-gray-700 w-full"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="shadow border rounded py-2 px-4 text-gray-700 w-full"
                />
                <button
                  type="submit"
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                  {showLogin ? "Log Me In" : "Sign Me Up"}
                </button>
              </form>
            </section>
          </div>
        </div>
      );
}
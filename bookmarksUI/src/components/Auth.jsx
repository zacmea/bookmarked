import { useState } from "react";

export default function Auth({ setUser }) {
    const [showLogin, setShowLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            setUser(data.user);
            localStorage.setItem("token", data.token);
        } catch (error) {
            console.error(error);
            // Handle the error (e.g., show an error message to the user)
        }
    };

    const handleSignUp = async () => {
        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            const data = await response.json();
            setUser(data.newUser);
            localStorage.setItem("token", data.token);
        } catch (error) {
            console.error(error);
            // Handle the error (e.g., show an error message to the user)
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <section>
                <h2>{showLogin ? "Login" : "SignUp"}</h2>
                <button onClick={() => setShowLogin(!showLogin)}>
                    {showLogin ? "Switch to SignUp" : "Switch to Login"}
                </button>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        showLogin ? handleLogin() : handleSignUp();
                    }}
                >
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <br />
                    <button type="submit">{showLogin ? "Log Me In" : "Sign Me Up"}</button>
                </form>
            </section>
        </div>
    );
}
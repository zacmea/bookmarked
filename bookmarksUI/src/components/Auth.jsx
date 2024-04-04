import { useState } from "react";

export default function Auth(props) {
    const [showLogin, setShowLogin] = useState(true); //setting up two states for showing login and login form data
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleLogin = async () => {
        //creating a function to handle logging in
        try {
            const response = await fetch("https://localhost:3000/users/login", {  // waiting to fetch login route
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), //turning the form data into a JSON string
            });
            const data = await response.json(); //waiting to turn the response into JSON
            props.setUser(data.user); //setting the user props in state
            localStorage.setItem("token", data.token);  //storing the login token in local storage
        } catch (error) {
            console.error(error);
        }
    };  // end of handleLogin function


    const handleSignUp = async () => {
        //creating a function to handle signing up
        try {
            const response = await fetch("http://localhost:3000/users", { // waiting to fetch the users route
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();  //waiting to turn the response into JSON
            props.setUser(data.newUser);
            localStorage.setItem("token", data.token);
        } catch (error) {
            console.error(error);
        }
    };  // end of handleSignUp function


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value }); //the ... copies existing data and updates the target value
    };

    return (  //this is what we'll actually see on the page
        <div>
            {showLogin ? ( //if showLogin is true, show the login form, else show the signup form
                <section>
                    <button onClick={() => setShowLogin(!showLogin)}>Toggle login/sign-up</button>
                    <form onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
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
                        <input type="submit" value="Log Me In" />
                    </form>
                </section>
            ) : (
                <section>
                    <h2 onClick={() => setShowLogin(!showLogin)}>  
                        SignUp <small>click to switch to login</small>
                    </h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSignUp();
                        }}
                    >
                        <input
                            type="text"
                            name="username"
                            placeholder="choose username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="password"
                            name="password"
                            placeholder="choose password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <br />
                        <input type="submit" value="Sign Me Up" />
                    </form>
                </section>
            )}
        </div>
    );
}
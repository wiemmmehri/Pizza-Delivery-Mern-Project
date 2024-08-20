import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './user/Navbar';

  // Adjust the import path as needed

  function Login() {
    const [user, setUser] = useState("");
    let navigate = useNavigate();
    const [err, setErr] = useState("");
    const [logUser, setLogUser] = useState({
        username: "",
        password: ""
    });

    function handleChange(e) {
        setErr("");
        setLogUser((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }

    function handleClick() {
        if (logUser.username === "" || logUser.password === "") {
            setErr("Please recheck credentials.");
            return;
        }

        fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(logUser),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                setUser(data.user);
                setErr("User logged in successfully.");
            } else {
                setErr(data.message);
            }
        })
        .catch((error) => {
            console.error("There was an error logging in!", error);
            setErr("There was an error logging in!");
        });
    }

    useEffect(() => {
        if (err === "User logged in successfully.") {
            localStorage.setItem("username", user.username);
            navigate("../", { replace: true });
        } else if (err === "admin") {
            localStorage.setItem("username", user.username);
            navigate("/admin", { replace: true });
        }
    }, [err, user, navigate]);

    return (
        
        <div>
         <Navbar />

            <div className='login'>
                <img src="images/background-Login.jpg" alt="Login background" />
                <div className="logincomponent">
                    <h2>Login</h2>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input onChange={handleChange} name="username" value={logUser.username} type="text" id="username" placeholder='Username' />
                    </div>
                    <div>
                        <label htmlFor="Password">Password:</label>
                        <input onChange={handleChange} name="password" value={logUser.password} type="password" id="Password" placeholder='Password' />
                    </div>
                    <button onClick={handleClick} className='btn btn-primary'>Submit</button>
                    <div>{err}</div>
                    <small>Don't have an account? <Link to="/register">Register</Link></small>
                </div>
            </div>
        </div>
    );
}

export default Login;

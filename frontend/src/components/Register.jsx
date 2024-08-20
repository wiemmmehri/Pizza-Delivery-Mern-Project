import React, { useEffect, useState } from 'react';
import Navbar from './user/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    let navigate = useNavigate();
    const [userID, setUserID] = useState('');
    const [takeToLogin, setTakeToLogin] = useState(null);
    const [otp, setOtp] = useState('');
    const [err, setErr] = useState('');
    const [takeHome, setTakeHome] = useState('');
    const [checkOTP, setCheckOTP] = useState(false);
    const [registerUser, setRegisterUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setErr('');
        setRegisterUser((prevVals) => ({
            ...prevVals,
            [name]: value
        }));
    }

    async function handleClick() {
        if (registerUser.username === '') {
            setErr('Please, set valid username.');
            return;
        }
        const email = registerUser.email;
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            setErr('Invalid Email.');
            return;
        }
        if (registerUser.email === '') {
            setErr('Please, set valid Email.');
            return;
        }
        if (registerUser.password === '') {
            setErr('Please, set valid Password.');
            return;
        }
        if (registerUser.password !== registerUser.confirmPassword) {
            setErr('Password do not match confirm password.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerUser),
            });

            const data = await response.json();
            console.log(data);
            setErr(data.message);
            setUserID(data._id);
            setTakeHome(data.success);
        } catch (error) {
            console.error('Error during registration:', error);
            setErr('Failed to register. Please try again.');
        }
    }

    useEffect(() => {
        if (takeHome === true) {
            setCheckOTP(true);
        }
    }, [takeHome]);

    function noteChange(e) {
        setOtp(e.target.value);
    }

    async function handleSubmit() {
        try {
            const response = await fetch('http://localhost:4000/checkotp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp }),
            });

            const data = await response.json();
            setTakeToLogin(data.success);
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setErr('Failed to verify OTP. Please try again.');
        }
    }

    useEffect(() => {
        if (takeToLogin === true) {
            navigate('../login', { replace: true });
        } else if (takeToLogin === false) {
            fetch('http://localhost:4000/removeuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setErr(data.message);
            })
            .catch(error => {
                console.error('Error removing user:', error);
                setErr('Failed to remove user. Please try again.');
            });
        }
    }, [takeToLogin, navigate, userID]);

    return (
        <div>
            <Navbar />
            <div className="login">
            <img src="images/background-Login.jpg" alt="Login background" />

                <div className="registercomponent logincomponent">
                    <h2>Register</h2>
                    {checkOTP ? (
                        <div className="checkotp">
                            <h4 className="fillotp">Please fill OTP from mail</h4>
                            <input
                                type="text"
                                onChange={noteChange}
                                value={otp}
                                name="otp"
                                placeholder="Enter OTP"
                            />
                            <button onClick={handleSubmit} className="sub btn btn-primary">Submit</button>
                        </div>
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); handleClick(); }}>
                            <div>
                                <label htmlFor="username">Username:</label>
                                <input
                                    onChange={handleChange}
                                    name="username"
                                    value={registerUser.username}
                                    type="text"
                                    id="username"
                                    placeholder="Username"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input
                                    onChange={handleChange}
                                    value={registerUser.email}
                                    name="email"
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password:</label>
                                <input
                                    onChange={handleChange}
                                    value={registerUser.password}
                                    name="password"
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm Password:</label>
                                <input
                                    onChange={handleChange}
                                    value={registerUser.confirmPassword}
                                    name="confirmPassword"
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    autoComplete="current-password"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    )}
                    <small className="Registererr">
                        {err === 'Your account successflully created.' ? '' : err}
                    </small>
                    <small>already have an account? <Link to="/login">Login</Link></small>
                </div>
            </div>
        </div>
    );
}

export default Register;

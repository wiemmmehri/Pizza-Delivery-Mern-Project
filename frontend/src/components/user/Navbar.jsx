import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar(props) {
    const user = localStorage.getItem("username");
    const [input, setInput] = useState("");

    function handleLogout() {
        fetch("http://localhost:4000/logout", {
            method: "GET",
            credentials: "include", // Ensure credentials (cookies) are sent with the request
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to log out");
            }
            return res.text(); // Use .text() if the server returns plain text
        })
        .then((data) => {
            console.log(data); // Logs "Successfully Logout"
            localStorage.clear(); // Clear local storage upon successful logout
            window.location.href = "/login"; // Optionally redirect to login page after logout
        })
        .catch((error) => console.error("Error logging out:", error));
    }
    
    function handleChange(e) {
        setInput(e.target.value);
    }

    function handleClick() {
        props.inputt(input);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'rgb(68 68 68)', position: 'sticky', top: '0', zIndex: '1000', transition: 'all 0.3s ease' }}>
            <div className="container-fluid">
                <Link to="/">
                    <img className='applogo' src="images/siteIcon.png" alt="Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                </Link>
                <Link className="navbar-brand" to="/" style={{ color: '#FFF5E1', fontSize: '1.5rem', fontWeight: 'bold' }}>Pizza Delivery</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" style={{ color: '#FFF' }}></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <form className="d-flex mx-auto">
                        <input 
                            onChange={handleChange} 
                            value={input} 
                            className="form-control me-2" 
                            type="text" 
                            placeholder="Search" 
                            style={{ borderRadius: '20px', borderColor: '#FFAB91', padding: '10px' }}
                        />
                        <button 
                            onClick={handleClick} 
                            className="btn" 
                            type="button" 
                            style={{ backgroundColor: '#FB8C00', color: '#FFF', borderRadius: '20px', padding: '10px 20px' }}
                        >
                            Search
                        </button>
                    </form>
                    <ul className="navbar-nav ms-auto">
                        {user && (
                            <li className="nav-item">
                                <NavLink 
                                    className="nav-link" 
                                    to="/cart" 
                                    style={{ color: '#FFF5E1', fontSize: '1rem', marginRight: '15px' }}
                                    onMouseEnter={(e) => e.target.style.color = '#FFF'} 
                                    onMouseLeave={(e) => e.target.style.color = '#FFF5E1'}
                                >
                                    <i className="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;Cart
                                </NavLink>
                            </li>
                        )}
                        <li className="nav-item">
                            <NavLink 
                                className="nav-link" 
                                to="/orders" 
                                style={{ color: '#FFF5E1', fontSize: '1rem', marginRight: '15px' }}
                                onMouseEnter={(e) => e.target.style.color = '#FFF'} 
                                onMouseLeave={(e) => e.target.style.color = '#FFF5E1'}
                            >
                                <i className="fa-solid fa-bell-concierge"></i>&nbsp;&nbsp;Orders
                            </NavLink>
                        </li>
                        {!user ? (
                            <li className="nav-item">
                                <NavLink 
                                    className="nav-link" 
                                    to="/login" 
                                    style={{ color: '#FFF5E1', fontSize: '1rem' }}
                                    onMouseEnter={(e) => e.target.style.color = '#FFF'} 
                                    onMouseLeave={(e) => e.target.style.color = '#FFF5E1'}
                                >
                                    <i className="fa-solid fa-user"></i>&nbsp;&nbsp;Sign in
                                </NavLink>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link 
                                    onClick={handleLogout} 
                                    className="nav-link" 
                                    to="/" 
                                    style={{ color: '#FFF5E1', fontSize: '1rem' }}
                                    onMouseEnter={(e) => e.target.style.color = '#FFF'} 
                                    onMouseLeave={(e) => e.target.style.color = '#FFF5E1'}
                                >
                                    <i className="fa-solid fa-user"></i>&nbsp;&nbsp;Sign out
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

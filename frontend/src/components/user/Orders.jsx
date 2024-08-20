import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import UserOrder from './UserOrder';

function Orders() {
    const username = localStorage.getItem("username");

    const [orderArr, setOrderArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (username) {
            fetch("http://localhost:4000/getorders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username }),
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch orders");
                }
                return res.json();
            })
            .then((data) => {
                setOrderArr(data.reverse());
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
        } else {
            setLoading(false);
            setError("No username found. Please log in.");
        }
    }, [username]);

    function spreadArr(order) {
        return <UserOrder key={order._id} order={order} />;
    }

    return (
        <div style={{ backgroundColor: 'rgb(255, 255, 255)' }}>
            <Navbar />
            <div className='CartPage'>
                <h1 className='carth1'>Orders</h1>
                {loading ? (
                    <p>Loading your orders...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : orderArr.length > 0 ? (
                    orderArr.map(spreadArr)
                ) : (
                    <p>You have no orders.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Orders;

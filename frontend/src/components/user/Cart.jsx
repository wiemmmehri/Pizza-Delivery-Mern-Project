import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const username = localStorage.getItem("username");
    const [cartArr, setCartArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // Initialize navigate

    useEffect(() => {
        if (username) {
            fetch("http://localhost:4000/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username }),
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch cart data.");
                }
                return res.json();
            })
            .then((data) => {
                setCartArr(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
        }
    }, [username]);

    const handleRemoveFromCart = (_id) => {
        fetch("http://localhost:4000/removefromcartt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id, username }),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to remove item from cart.");
            }
            setCartArr(cartArr.filter(item => item._id !== _id));
        })
        .catch((err) => {
            setError(err.message);
        });
    };
    


    const handleConfirmOrder = (_id) => {
        fetch("http://localhost:4000/addtoorders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id, username }),
        })
        .then((res) => {
            
            setCartArr(cartArr.filter(item => item._id !== _id));
        })
        .catch((err) => {
            setError(err.message);
        });
    };

    const handleProceedToPayment = (oneCart) => {
        handleConfirmOrder(oneCart._id);

        // Pass the selected item details to the payment page
        navigate('/payment', { state: { _id: oneCart._id, totalPrice: oneCart.totalPrice } });
    };

    function spreadCart(oneCart) {
        return (
            <div className="card cart" key={oneCart._id}>
                <button type='button' onClick={() => handleRemoveFromCart(oneCart._id)} className='removefromcart'>×</button>
                <h5>{oneCart.pizza}</h5>
                <div className="cartbody">
                    <div className="bigdiv">
                        <div className="div1">
                            <p>Username: {oneCart.username}</p>
                            <p>Quantity: {oneCart.quantity}</p>
                            <p>Total Price: DT{oneCart.totalPrice}</p>
                        </div>
                        <div className="div2">
                            {oneCart.base && <p>Base: {oneCart.base}</p>}
                            {oneCart.sauce && <p>Sauce: {oneCart.sauce}</p>}
                            {oneCart.cheese && <p>Cheese: {oneCart.cheese}</p>}
                            {oneCart.veggies && <p>Veggies: {oneCart.veggies}</p>}
                        </div>
                    </div>
                    <button type='button' onClick={() => handleProceedToPayment(oneCart)} className='btn btn-primary'>Proceed to Payment</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: 'rgb(255, 255, 255)' }}>
            <Navbar />
            <div className="CartPage container">
                <h1 className='carth1'>Cart</h1>
                {loading ? (
                    <p>Loading your cart...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : cartArr.length > 0 ? (
                    cartArr.map(spreadCart)
                ) : (
                    <p>Your cart is empty</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Cart;

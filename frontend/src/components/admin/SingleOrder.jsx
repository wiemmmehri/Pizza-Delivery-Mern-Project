import React, { useEffect, useState } from 'react';

function SingleOrder(props) {
    const [status, setStatus] = useState("");

    function handleClk(event) {
        const newStatus = event.target.className;
        setStatus(newStatus);
        const _id = props.order._id;

        fetch("http://localhost:4000/changestatus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus, _id }),
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to update status");
            }
            return res.json();
        })
        .catch(error => console.error("Error updating status:", error));
    }

    useEffect(() => {
        setStatus(props.order.status);
    }, [props.order.status]);

    return (
        <div>
            <div className="card order">
                <h4>{props.order.pizza}</h4>
                <div className="cartbody">
                    <div className="bigdiv">
                        <div className="div1">
                            <p>Username: {props.order.username}</p>
                            <h5 className='statuss'>
                                Set status: 
                                <div className="dropdown">
                                    <button className="dropbtn">{status} ↓ </button>
                                    <div className="dropdown-content">
                                    <a onClick={handleClk} className="Order Received">Order Received</a>
                                    <a onClick={handleClk} className="In the kitchen">In the kitchen</a>
                                        <a onClick={handleClk} className="Sent To Delivery">Sent To Delivery</a>
                                        <a onClick={handleClk} className="Delivered">Delivered</a>
                                    </div>
                                </div>
                            </h5>
                            <p>Quantity: {props.order.quantity}</p>
                            <p>Total price: {props.order.totalPrice}</p>
                        </div>
                        <div className="div2">
                            <p>{props.order.base && `Base: ${props.order.base}`}</p>
                            <p>{props.order.sauce && `Sauce: ${props.order.sauce}`}</p>
                            <p>{props.order.cheese && `Cheese: ${props.order.cheese}`}</p>
                            <p>{props.order.veggies && `Veggies: ${props.order.veggies}`}</p>
                        </div>
                    </div>
                    <p className='orderid'>OrderId: {props.order._id}</p>
                </div>
            </div>
        </div>
    );
}

export default SingleOrder;

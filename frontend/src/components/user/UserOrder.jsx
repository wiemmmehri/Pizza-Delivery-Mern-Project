import React, { useEffect, useState } from 'react';

function UserOrder(props) {
    const [status, setStatus] = useState("Order sent");

    useEffect(() => {
        if (props.order && props.order.status) {
            setStatus(props.order.status);
        }
    }, [props.order]);

    // Safeguard against undefined or null props.order
    if (!props.order) {
        return <div>Order details not available.</div>;
    }

    return (
        <div>
            <div className="container">
                <div className="card cart orderss">
                    {status === "Delivered" && (
                        <span className='rightcorner'>
                            <i className="fa-regular fa-circle-check"></i>
                        </span>
                    )}
                    <h5><strong>{props.order.pizza}</strong></h5>
<div className="cartbody">
    <div className="bigdiv">
        <div className="div1">
            <p><strong>Username:</strong> {props.order.username}</p>
            <h6><strong>Status:</strong> {status}</h6>
            <p><strong>Quantity:</strong> {props.order.quantity}</p>
            <p><strong>Total price:</strong> DT{props.order.totalPrice}</p>
        </div>
        <div className="div2">
            {props.order.base && <p><strong>Base:</strong> {props.order.base}</p>}
            {props.order.sauce && <p><strong>Sauce:</strong> {props.order.sauce}</p>}
            {props.order.cheese && <p><strong>Cheese:</strong> {props.order.cheese}</p>}
            {props.order.veggies && <p><strong>Veggies:</strong> {props.order.veggies}</p>}
        </div>
    </div>
    <p className="orderid"><strong>OrderId:</strong> {props.order._id}</p>
</div>

                </div>
            </div>
        </div>
    );
}

export default UserOrder;

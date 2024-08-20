import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Payment() {
    const navigate = useNavigate();

    const handlePayPalButtonClick = (_id) => {
        fetch("http://localhost:4000/addtoorders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id }),
        })
        
    };


    const initialOptions = {
        "client-id": "AeJ_Aq2-d73CmmJy_2RapLqEY1nlic_sDUbcuVkvtz8lPTUmk6wfD36XjrmuH3W-0H4pdaj14DfgEvNC",
        currency: "USD",
        intent: "capture",
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <div>
                <h2>Complete Your Payment</h2>
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                        // This will prevent any order from being created.
                        return new Promise(() => {});
                    }}
                    onClick={() => {
                        handlePayPalButtonClick();  
                    }}
                />
            </div>
        </PayPalScriptProvider>
    );
}

export default Payment;

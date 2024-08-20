import React, { useState, useEffect } from 'react';

function Pizzacard(props) {
    const [pizzaCount, setPizzaCount] = useState(1);
    const [price, setPrice] = useState(Number(props.price));
    const [operation, setOperation] = useState("");

    const username = localStorage.getItem("username");

    function handleClick(e) {
        const action = e.target.className;

        if (action.includes("plus") && pizzaCount < 9) {
            setPizzaCount(prev => prev + 1);
            setOperation("+");
        } else if (action.includes("minus") && pizzaCount > 1) {
            setPizzaCount(prev => prev - 1);
            setOperation("-");
        }
    }

    useEffect(() => {
        if (operation === "+") {
            setPrice(prev => prev + Number(props.price));
        } else if (operation === "-") {
            setPrice(prev => prev - Number(props.price));
        }
    }, [pizzaCount, operation, props.price]);

    function handleAddToCart() {
        const order = { username, pizza: props.name, quantity: pizzaCount, totalPrice: price };
        alert("Added to Cart.");
        
        fetch("http://localhost:4000/userorder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to add to cart");
            }
            return res.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error("Error adding to cart:", error));
    }

    function alertUser() {
        alert("Please, first Login.");
    }

    return (
        <div className="pizzacard" style={{ maxWidth: "335px", margin: "auto", padding: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "15px", backgroundColor: "#fff" }}>
            <div className="card" style={{ border: "none" }}>
                <img className="pizzaimg card-img-top" src={props.img} alt={props.name} style={{ borderRadius: "15px 15px 0 0", maxHeight: "200px", objectFit: "cover" }} />
                <div className="card-body" style={{ padding: "20px" }}>
                    <p className="card-text" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                        <span style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#333" }}>{props.name}</span>
                    </p>
                    <small className="card-subtitle mb-2 text-muted" style={{ display: "block", marginBottom: "15px", color: "#757575" }}>{props.detail}</small>
                    <div className="price" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div className="pricenum" style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#FF7043" }}>DT  {price}</div>
                        <div className="buttons" style={{display: "flex",alignitems:" center",marginright: "20px"}}>
                            <div className="plusminus" style={{ display: "flex", alignItems: "center", backgroundColor: "#FFEBEE", borderRadius: "25px", padding: "5px 10px" }}>
                                <span onClick={handleClick} className="minus" style={{ fontSize: "1.5rem", cursor: "pointer", padding: "0 10px", color: "#FF7043" }}>—</span>
                                <span style={{ fontSize: "1.2rem", padding: "0 10px", color: "#333" }}>{pizzaCount}</span>
                                <span onClick={handleClick} className="plus" style={{ fontSize: "1.5rem", cursor: "pointer", padding: "0 10px", color: "#FF7043" }}>+</span>
                            </div>
                        </div>
                        <button 
                            onClick={username === null ? alertUser : handleAddToCart} 
                            className="add" 
                            style={{ backgroundColor: username === null ? "grey" : "#FF7043", color: "#fff", border: "none", borderRadius: "25px", padding: "10px 20px", fontSize: "1rem", cursor: username === null ? "not-allowed" : "pointer" }}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pizzacard;

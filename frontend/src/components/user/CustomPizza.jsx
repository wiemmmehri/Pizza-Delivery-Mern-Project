import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import './Base.css';  // Separate CSS for better maintainability and custom styling

function Base() {
    const navigate = useNavigate();
    const [val, setVal] = useState({});
    const [activeStep, setActiveStep] = useState(0);
    const [base, setBase] = useState("");
    const [sauce, setSauce] = useState("");
    const [cheese, setCheese] = useState("");
    const [veggies, setVeggies] = useState("");
    const [price, setPrice] = useState(0);
    const [showRoot, setShowRoot] = useState(false);
    const username = localStorage.getItem("username");

    useEffect(() => {
        if (!username) {
            navigate("/", { replace: true });
        } else {
            fetch("http://localhost:4000/getcount")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch count data");
                }
                return res.text();  // Use text to catch any non-JSON response
            })
            .then((text) => {
                if (text) {
                    const data = JSON.parse(text);
                    setVal(data);
                } else {
                    console.warn("Received empty response");
                    setVal({});
                }
            })
            .catch((err) => console.error("Error:", err.message));
        
        }
    }, [username, navigate]);

    const steps = [
        {
            label: "Choose Base & Sauce",
            baseOptions: [
                { name: "CheeseBurst", img: "cheeseburstbase.jpg", key: "base1", price: 10 },
                { name: "Dough", img: "doughbase.jpg", key: "base2", price: 8 },
                { name: "MiniPizza", img: "minipizzabase.jpg", key: "base3", price: 5 },
                { name: "Plane", img: "planebase.jpg", key: "base4", price: 8 },
                { name: "ThinCrust", img: "thincrustbase.jpg", key: "base5", price: 9 },
            ],
            sauceOptions: [
                { name: "Buffalo", img: "buffalosauce.jpg", key: "sauce1", price: 2 },
                { name: "GarlicRanche", img: "GarlicRanchesauce.jpg", key: "sauce2", price: 2 },
                { name: "Hummus", img: "hummussauce.jpg", key: "sauce3", price: 2 },
                { name: "Marinara", img: "marinarasauce.jpg", key: "sauce4", price: 2 },
                { name: "Pesto", img: "Pestosauce.jpg", key: "sauce5", price: 2},
            ],
            baseSetter: setBase,
            baseState: base,
            sauceSetter: setSauce,
            sauceState: sauce,
        },
        {
            label: "Choose Cheese & Veggies",
            cheeseOptions: [
                { name: "Mozzarella", img: "mozzarellacheese.jpg", key: "cheese1", price: 3 },
                { name: "Cheddar", img: "cheddarcheese.jpg", key: "cheese2", price: 4 },
            ],
            veggieOptions: [
                { name: "BellPeppers", img: "bellpeppers.jpg", key: "veggies1", price: 1 },
                { name: "EggPlant", img: "eggplant.jpg", key: "veggies2", price: 2 },
                { name: "YellowSquash", img: "yellowsquash.jpg", key: "veggies3", price: 2 },
            ],
            cheeseSetter: setCheese,
            cheeseState: cheese,
            veggieSetter: setVeggies,
            veggieState: veggies,
        },
        {
            label: "Review & Confirm",
        }
    ];

    const handleSelect = (option, priceKey, setter, state) => {
        setter(option);
        setShowRoot(false); // Reset if user goes back to reselect
        fetch("http://localhost:4000/minuscustom", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ val: priceKey }),
        }).catch((err) => console.error("Failed to update stock:", err));
    };

    const calcPrice = () => {
        const newPrice = base ? steps[0].baseOptions.find(opt => opt.name === base)?.price : 0;
        const cheesePrice = cheese ? steps[1].cheeseOptions.find(opt => opt.name === cheese)?.price : 0;
        setPrice(newPrice + cheesePrice);
        setShowRoot(true);
    };

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1);
        } else {
            calcPrice();
        }
    };
    


    const handleAddToCart = async () => {
        const customPizza = {
            pizza: "Enjoy your Custom Pizza",
            username,
            base,
            sauce,
            cheese,
            veggies,
            totalPrice: price,
            quantity: 1,
        };
        alert("Added to Cart.");
        try {
            const response = await fetch("http://localhost:4000/custompizzacart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(customPizza),
            });
         
            

        } catch (err) {
            console.error("Failed to add custom pizza to cart:", err);
            // Optionally, you could navigate to an error page or show a user-friendly message
        }
    };
    

    return (
        
        <div className="base">
          
            
            <div className="base">
                <Navbar />
                <div className="cart-page">
                    <div className="timeline">
                        {steps.map((step, index) => (
                            <div
                                key={step.label}
                                className={`timeline-step ${index <= activeStep ? 'active' : ''}`}
                            >
                                <div className="step-circle">
                                    {index + 1}
                                </div>
                                <span className="step-label">{step.label}</span>
                            </div>
                        ))}
                    </div>
                    <hr className="timeline-bar" />
                </div>
           

                <div className="step-container">
                    {activeStep === 0 && (
                        <div className="option-grid container">
                            <h3 className="section-title">Choose Your Base</h3>
                            <div className="row">
                                {steps[0].baseOptions.map((option) => (
                                    <div
                                        key={option.name}
                                        onClick={() => handleSelect(option.name, option.key, steps[0].baseSetter, steps[0].baseState)}
                                        className={`col-lg-2 col-md-4 option ${steps[0].baseState === option.name ? 'selected' : ''}`}
                                    >
                                        <img
                                            className={`base-img ${steps[0].baseState === option.name ? 'selected' : ''}`}
                                            src={`images/${option.img}`}
                                            alt={option.name}
                                        />
                                        <h5>{option.name} - {option.price} DT</h5>
                                        {val[option.key] === 1 && <small className="out-of-stock">Out of Stock</small>}
                                    </div>
                                ))}
                            </div>

                            <h3 className="section-title">Choose Your Sauce</h3>
                            <div className="row">
                                {steps[0].sauceOptions.map((option) => (
                                    <div
                                        key={option.name}
                                        onClick={() => handleSelect(option.name, option.key, steps[0].sauceSetter, steps[0].sauceState)}
                                        className={`col-lg-2 col-md-4 option ${steps[0].sauceState === option.name ? 'selected' : ''}`}
                                    >
                                        <img
                                            className={`base-img ${steps[0].sauceState === option.name ? 'selected' : ''}`}
                                            src={`images/${option.img}`}
                                            alt={option.name}
                                        />
                                        <h5>{option.name} - {option.price} DT</h5>
                                        {val[option.key] === 1 && <small className="out-of-stock">Out of Stock</small>}
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={!steps[0].baseState || !steps[0].sauceState}
                                className="next-btn btn btn-primary"
                            >
                                Next
                            </button>
                        </div>
                    )}

                    {activeStep === 1 && (
                        <div className="option-grid container">
                            <h3 className="section-title">Choose Your Cheese</h3>
                            <div className="row">
                                {steps[1].cheeseOptions.map((option) => (
                                    <div
                                        key={option.name}
                                        onClick={() => handleSelect(option.name, option.key, steps[1].cheeseSetter, steps[1].cheeseState)}
                                        className={`col-lg-2 col-md-4 option ${steps[1].cheeseState === option.name ? 'selected' : ''}`}
                                    >
                                        <img
                                            className={`base-img ${steps[1].cheeseState === option.name ? 'selected' : ''}`}
                                            src={`images/${option.img}`}
                                            alt={option.name}
                                        />
                                        <h5>{option.name} - {option.price} DT</h5>
                                        {val[option.key] === 1 && <small className="out-of-stock">Out of Stock</small>}
                                    </div>
                                ))}
                            </div>

                            <h3 className="section-title">Choose Your Veggies</h3>
                            <div className="row">
                                {steps[1].veggieOptions.map((option) => (
                                    <div
                                        key={option.name}
                                        onClick={() => handleSelect(option.name, option.key, steps[1].veggieSetter, steps[1].veggieState)}
                                        className={`col-lg-2 col-md-4 option ${steps[1].veggieState === option.name ? 'selected' : ''}`}
                                    >
                                        <img
                                            className={`base-img ${steps[1].veggieState === option.name ? 'selected' : ''}`}
                                            src={`images/${option.img}`}
                                            alt={option.name}
                                        />
                                        <h5>{option.name} - {option.price} DT</h5>
                                        {val[option.key] === 1 && <small className="out-of-stock">Out of Stock</small>}
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={!steps[1].cheeseState || !steps[1].veggieState}
                                className="next-btn btn btn-primary"
                            >
                                Next
                            </button>
                        </div>
                    )}

                  {activeStep === 2 && (
                 <div className="confirmation container">
                <div className="order-review-card">
            <div className="order-details">
                <h3 className="section-title">Review Your Order</h3>
                <p><strong>Base:</strong> {base}</p>
                <p><strong>Sauce:</strong> {sauce}</p>
                <p><strong>Cheese:</strong> {cheese}</p>
                <p><strong>Veggies:</strong> {veggies}</p>
                {showRoot && <h4 className="custom-price">Total Price: {price} DT</h4>}

                {showRoot ? (
                    <div className="buttons">
                        <button
                            onClick={handleAddToCart}
        
                            className="btn btn-primary"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={() => setActiveStep(0)}
                            className="btn btn-danger"
                        >
                            Start Over
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={calcPrice}
                        className="btn btn-primary"
                    >
                        Calculate Price
                    </button>
                )}
            </div>
            <div className="order-image">
                <img className="baseimg" src={`images/1234.png`} alt="Delivery Image" />
            </div>
        </div>
       </div>
)}
</div>
</div>
<Footer />
</div>

    );
}

export default Base;

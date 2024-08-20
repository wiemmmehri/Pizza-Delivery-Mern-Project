import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import Pizzacard from './Pizzacard';
import Pizzas from './Pizzas';

function Homepage() {
    const user = localStorage.getItem("username");
    const [err, setErr] = useState(false);
    const [input, setInput] = useState("");

    let navigate = useNavigate();

    function handleClick() {
        if (user === null) {
            setErr(true);
            return;
        }
        navigate("../base", { replace: true });
    }

    function mapArr(obj) {
        return (
            <Pizzacard 
                key={obj.name} 
                name={obj.name} 
                detail={obj.detail} 
                price={obj.price} 
                img={obj.img} 
            />
        );
    }

    function inputt(input) {
        setInput(input);
    }

    return (
        <div className='homepage' style={{ backgroundColor: '#f3f4f6', fontFamily: 'Roboto, sans-serif', color: '#333' }}>
            <Navbar inputt={inputt} />
            <div className="hero-section" style={{ background: 'linear-gradient(90deg, rgb(251 140 0), rgb(255, 87, 34))', padding: '40px 20px', textAlign: 'center',  marginBottom: '30px' }}>
                <h1 style={{ color: '#FFF', fontSize: '2.5rem', marginBottom: '20px' }}>Hello {user || 'Guest'}</h1>
                <h2 style={{ color: '#FFF', fontSize: '2rem', marginBottom: '10px' }}>Customize Your Pizza</h2>
                <p style={{ color: '#FFE0B2', fontSize: '1.2rem' }}>Choose your ingredients, toppings, and more to create your perfect pizza!</p>
                <button type="button" onClick={handleClick} className="btn btn-primary" style={{ backgroundColor: '#FF8A65', borderColor: '#FF8A65', padding: '10px 20px', fontSize: '1rem', marginTop: '20px' }}>
                    Start Customizing
                </button>
                {err && <p className='needtolog' style={{ color: '#f44336', marginTop: '10px' }}>You need to login first.</p>}
            </div>

            <div className="container">
                <h1 className='selecthere' style={{ color: '#333', fontSize: '2.2rem', margin: '20px 0', textAlign: 'center' }}>Available Pizzas</h1>
                <div className='pizza-grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '0 20px' }}>
                    {Pizzas.filter((obj) => {
                        if (input === "") {
                            return obj;
                        } else if (obj.name.toLowerCase().includes(input.toLowerCase())) {
                            return obj;
                        }
                        return null;
                    }).map(mapArr)}
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default Homepage;

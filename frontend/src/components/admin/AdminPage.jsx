import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SingleOrder from './SingleOrder';

function AdminPage() {
    let navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const user = localStorage.getItem("username");

    useEffect(() => {
        if (user !== "wiem.mehri@etudiant-fst.utm.tn") {
            navigate("../login", { replace: true });
        } else {
            fetch("http://localhost:4000/getallorders")
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Failed to fetch orders");
                    }
                    return res.json();
                })
                .then((data) => {
                    setOrders(data.reverse());
                })
                .catch((err) => {
                    console.error("Error fetching orders:", err);
                });
        }
    }, [user, navigate]);

    function handleLogout() {
        localStorage.clear();
        navigate("../login");
    }

    function mapArr(order) {
        return (<SingleOrder order={order} key={order._id} />);
    }

    const styles = {
        page: {
            padding: '20px',
            maxWidth: '1200px',
            margin: 'auto',
            fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
            backgroundColor: '#f9f5ee',
            color: '#333'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#ff7f50',
            color: 'white',
            padding: '20px',
            borderRadius: '8px',
        },
        title: {
            fontSize: '2rem',
            fontWeight: 600
        },
        button: {
            backgroundColor: '#fff3e0',
            color: '#ff7f50',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#ffe0b2'
        },
        main: {
            marginTop: '20px',
        },
        section: {
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginBottom: '20px'
        },
        sectionTitle: {
            fontSize: '1.5rem',
            color: '#ff7f50',
            marginBottom: '20px'
        },
        ingredientOptions: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
        },
        ingredientCard: {
            textAlign: 'center',
            padding: '15px',
            border: '1px solid #f0f0f0',
            borderRadius: '8px',
            backgroundColor: '#fff3e0',
            transition: 'transform 0.3s, boxShadow 0.3s',
            cursor: 'pointer',
        },
        ingredientCardHover: {
            transform: 'translateY(-5px)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        },
        ingredientImage: {
            width: '100%',
            borderRadius: '8px'
        },
        ingredientLabel: {
            marginTop: '10px',
            fontWeight: 'bold',
            color: '#ff7f50',
        },
        divider: {
            margin: '40px 0',
            borderTop: '2px solid #ffe0b2',
        },
        ordersList: {
            maxHeight: '400px',
            overflowY: 'auto',
        }
    };

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <h1 style={styles.title}>Admin Dashboard</h1>
                <button
                    onClick={handleLogout}
                    style={styles.button}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                    <i className="fa-solid fa-user"></i>&nbsp; Logout
                </button>
            </header>
            <main style={styles.main}>
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Manage Custom Ingredients</h2>
                    <div style={styles.ingredientOptions}>
                        <Link to="/adminbases" style={styles.ingredientCard}>
                            <img src="images/cheeseburstbase.jpg" alt="Bases" style={styles.ingredientImage} />
                            <p style={styles.ingredientLabel}>Bases</p>
                        </Link>
                        <Link to="/adminsauce" style={styles.ingredientCard}>
                            <img src="images/buffalosauce.jpg" alt="Sauce" style={styles.ingredientImage} />
                            <p style={styles.ingredientLabel}>Sauces</p>
                        </Link>
                        <Link to="/admincheese" style={styles.ingredientCard}>
                            <img src="images/mozzarellacheese.jpg" alt="Cheese" style={styles.ingredientImage} />
                            <p style={styles.ingredientLabel}>Cheese</p>
                        </Link>
                        <Link to="/adminveggies" style={styles.ingredientCard}>
                            <img src="images/bellpeppers.jpg" alt="Veggies" style={styles.ingredientImage} />
                            <p style={styles.ingredientLabel}>Veggies</p>
                        </Link>
                    </div>
                </section>
                <hr style={styles.divider} />
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Manage Customer Orders</h2>
                    <div style={styles.ordersList}>
                        {orders.map(mapArr)}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default AdminPage;

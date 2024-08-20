import React, { useEffect, useState } from 'react';
import AddSubBtn from './AddSubBtn';
import { useNavigate } from 'react-router-dom';

function AdminCheese() {
    const [val, setVal] = useState({});
    const user = localStorage.getItem("username");
    let navigate = useNavigate();

    useEffect(() => {
        if (user !== "wiem.mehri@etudiant-fst.utm.tn") {
            navigate("../login", { replace: true });
        } else {
            fetch("http://localhost:4000/getcount")
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Failed to fetch cheese counts");
                    }
                    return res.json();
                })
                .then((data) => {
                    setVal(data);
                })
                .catch((err) => {
                    console.error("Error fetching cheese counts:", err);
                });
        }
    }, [user, navigate]);

    return (
        <div className='basses container'>
            <h1>Set Cheese Count</h1>
            <div className="AdminBases">
                <div className="base1">
                    <AddSubBtn custom="cheese1" val={val.cheese1} />
                    <h6>Mozzarella cheese</h6>
                </div>
                <div className="base2">
                    <AddSubBtn custom="cheese2" val={val.cheese2} />
                    <h6>Cheddar cheese</h6>
                </div>
            </div>
        </div>
    );
}

export default AdminCheese;

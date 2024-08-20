import React, { useEffect, useState } from 'react';
import AddSubBtn from './AddSubBtn';
import { useNavigate } from 'react-router-dom';

function AdminVeggies() {
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
                        throw new Error("Failed to fetch veggie counts");
                    }
                    return res.json();
                })
                .then((data) => {
                    setVal(data);
                })
                .catch((err) => {
                    console.error("Error fetching veggie counts:", err);
                });
        }
    }, [user, navigate]);

    return (
        <div className='basses container'>
            <h1>Set Veggies Count</h1>
            <div className="AdminBases">
                <div className="base1">
                    <AddSubBtn custom="veggies1" val={val.veggies1} />
                    <h6>Bell peppers</h6>
                </div>
                <div className="base2">
                    <AddSubBtn custom="veggies2" val={val.veggies2} />
                    <h6>Egg plant</h6>
                </div>
                <div className="base3">
                    <AddSubBtn custom="veggies3" val={val.veggies3} />
                    <h6>Yellow squash</h6>
                </div>
            </div>
        </div>
    );
}

export default AdminVeggies;

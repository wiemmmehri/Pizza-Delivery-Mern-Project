import React, { useEffect, useState } from 'react';

function AddSubBtn(props) {
    const [pizzaCount, setPizzaCount] = useState(0);

    useEffect(() => {
        if (props.val !== "undefined") {
            setPizzaCount(props.val);
        }
    }, [props.val]);

    function handleClick(e) {
        let newPizzaCount = pizzaCount;

        if (e.target.className === "adminplus") {
            newPizzaCount = pizzaCount + 1;
            setPizzaCount(newPizzaCount);
            const obj = { pizzaCount: newPizzaCount, custom: props.custom };
            fetch("http://localhost:4000/changecustomitems", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            })
            .catch(error => console.error("Error updating custom items:", error));
        } else if (e.target.className === "adminminus") {
            if (pizzaCount === 1) return;
            newPizzaCount = pizzaCount - 1;
            setPizzaCount(newPizzaCount);
            const obj = { pizzaCount: newPizzaCount, custom: props.custom };
            fetch("http://localhost:4000/changecustomitems", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            })
            .catch(error => console.error("Error updating custom items:", error));
        }
    }

    return (
        <div>
            <div className="card btns">
                <div className="adminplusminus ">
                    <span onClick={handleClick} name="minus" className="adminminus">
                        —
                    </span>
                    {pizzaCount === 0 ? props.val : pizzaCount}
                    <span onClick={handleClick} name='plus' className="adminplus">
                        +
                    </span>
                </div>
            </div>
        </div>
    );
}

export default AddSubBtn;

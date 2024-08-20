import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Register';
import Homepage from './user/Homepage';
import Base from './user/CustomPizza';
import Cart from './user/Cart';
import Payment from './user/payment';
import Login from './Login';
import Orders from './user/Orders';
import AdminVeggies from './admin/AdminVeggies';
import AdminPage from './admin/AdminPage';
import AdminCheese from './admin/AdminCheese';
import AdminBases from './admin/AdminBases';
import AdminSauce from './admin/AdminSauce';


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Homepage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/base" element={<Base />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/adminbases" element={<AdminBases />} />
                    <Route path="/adminsauce" element={<AdminSauce />} />
                    <Route path="/admincheese" element={<AdminCheese />} />
                    <Route path="/adminveggies" element={<AdminVeggies />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

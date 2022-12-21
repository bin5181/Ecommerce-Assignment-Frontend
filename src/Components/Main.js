import React, { useContext, useEffect } from 'react'
import { useLocation, Routes, Route } from 'react-router-dom';
import Alert from '../Components/Alert';
import Login from '../Components/Login';
import Home from '../Components/Home';
import Navbar from '../Components/ Navbar';
import AuthContext from '../Context/Auth/AuthContext';
import Register from './Register';
import Cart from './Cart';
import Orders from './Orders';
import NotFound from './NotFound';

const Main = () => {
    const location = useLocation();
    const { currentUser, getUser } = useContext(AuthContext);
    const whitelist = ["/login", "/signup"]

    useEffect(() => {
        if (!currentUser && whitelist.indexOf(location.pathname) === -1) {
            getUser();
        }
    }, [location.pathname, currentUser])

    return <>
        <Navbar />
        <Alert />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/orders" element={<Orders />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Register />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </>
}

export default Main
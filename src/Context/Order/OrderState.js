import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "../../Hooks/Request";
import OrderContext from "./OrderContext";

const OrderState = (props) => {
    const HOST = process.env.REACT_APP_BACKEND_URL + "/order";

    const [orders, setOrders] = useState([]);
    const [currentOrder, setCurrentOrder] = useState(null);
    const checkRequest = useRequest();
    const history = useNavigate();

    // Get Orders
    const getOrders = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (!token) {
            history("/login");
            return;
        }
        const response = await fetch(HOST, {
            method: "GET",
            headers: {
                "auth-token": token
            }
        });
        const json = await response.json();
        checkRequest(
            response.status,
            json.error,
            null,
            async () => {
                setOrders(json);
            }
        );
        return json;
    }

    const getbyID = async (id) => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (!token) {
            history("/login");
            return;
        }
        let fetchedOrders = await getOrders();
        let cOrder = fetchedOrders.filter(el => el._id === id);
        if (cOrder.length > 0) setCurrentOrder(cOrder[0]);
        else setCurrentOrder(null);
    }

    // Checkout
    const checkout = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (!token) {
            history("/login");
            return;
        }
        const response = await fetch(HOST, {
            method: "POST",
            headers: {
                "auth-token": token,
            },
        });
        const json = await response.json();
        checkRequest(
            response.status,
            json.error,
            "Cart checked out successfully",
            async () => {
                history("/orders");
            }
        );
    }

    return (
        <OrderContext.Provider value={{
            getOrders, getbyID, checkout,
            orders, currentOrder
        }}>
            {props.children}
        </OrderContext.Provider>
    );
};

export default OrderState;
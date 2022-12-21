import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "../../Hooks/Request";
import CartContext from "./CartContext";

const CartState = (props) => {
    const HOST = process.env.REACT_APP_BACKEND_URL + "/cart";

    const [currentCart, setCurrentCart] = useState(null);
    const checkRequest = useRequest();
    const history = useNavigate();

    // Get Items
    const getItems = async () => {
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
                setCurrentCart(json);
            }
        );
    }

    // Add to Cart
    const addToCart = async ({ itemId }) => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (!token) {
            history("/login");
            return;
        }
        const response = await fetch(HOST, {
            method: "POST",
            headers: {
                "auth-token": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ itemId })
        });
        const json = await response.json();
        checkRequest(
            response.status,
            json.error,
            "Added to cart successfully",
            async () => {
                history("/cart");
            }
        );
    }

    return (
        <CartContext.Provider value={{
            getItems, addToCart, currentCart
        }}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartState;
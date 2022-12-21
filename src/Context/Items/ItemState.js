import React, { useState } from "react";
import useRequest from "../../Hooks/Request";
import ItemContext from "./ItemContext";

const ItemState = (props) => {
    const HOST = process.env.REACT_APP_BACKEND_URL + "/items";

    const [items, setItems] = useState([]);
    const checkRequest = useRequest();

    // Get Items
    const getItems = async () => {
        const response = await fetch(HOST, {
            method: "GET",
        });
        const json = await response.json();
        checkRequest(
            response.status,
            json.error,
            null,
            async () => {
                setItems(json);
            }
        );
    }

    return (
        <ItemContext.Provider value={{
            getItems, items
        }}>
            {props.children}
        </ItemContext.Provider>
    );
};

export default ItemState;
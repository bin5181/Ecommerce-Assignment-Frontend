import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../Context/Cart/CartContext'
import CartPage from './CartPage';
import Spinner from './Spinner';

const Cart = () => {
    const { currentCart, getItems } = useContext(CartContext);
    const [isSpinner, setIsSpinner] = useState(true);

    const fetchItems = async () => {
        setIsSpinner(true);
        await getItems();
        setIsSpinner(false);
    }

    useEffect(() => {
        fetchItems();
    }, [])

    return isSpinner ? <Spinner /> : currentCart && (
        currentCart.items.length === 0
            ? <div className="text-center">No Item Found</div>
            : <CartPage currentCart={currentCart} />
    )
}

export default Cart
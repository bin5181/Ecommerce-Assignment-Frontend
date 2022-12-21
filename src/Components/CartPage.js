import React, { useContext } from 'react'
import OrderContext from '../Context/Order/OrderContext';

const CartPage = ({ currentCart, isCart = true }) => {
    const { checkout } = useContext(OrderContext);

    return <div className="container">
        {isCart && <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <span className="fw-bold">Net Quantity</span>
                <span>{currentCart.totalItems}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <span className="fw-bold">Net Price</span>
                <span>${currentCart.totalPrice}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <span></span>
                <button onClick={checkout} className='btn btn-success'>CheckOut</button>
            </li>
        </ul>}
        <div className="d-flex flex-wrap">
            {currentCart.items.map((el, i) => <div className="card m-3" style={{ width: "18rem" }} key={i}>
                <img src={el.img} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title fw-bold">{el.title}</h5>
                    <p className="card-text">
                        {el.description}
                    </p>
                    <ul>
                        <li>Price: ${el.price}</li>
                        <li>Quantity: {el.quantity}</li>
                        <li>Net Price: ${el.quantity * el.price}</li>
                    </ul>
                </div>
                <div className="card-footer text-muted d-flex justify-content-between align-items-center">
                    <span>{el.createdAt.slice(0, 10)}</span>
                </div>
            </div>)}
        </div>
    </div>
}

export default CartPage
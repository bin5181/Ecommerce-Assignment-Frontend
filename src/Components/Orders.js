import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import OrderContext from '../Context/Order/OrderContext';
import CartPage from './CartPage';
import Spinner from './Spinner';

const Orders = () => {
    const { orders, getOrders } = useContext(OrderContext);
    const [isSpinner, setIsSpinner] = useState(true);
    const history = useNavigate();

    const fetchOrders = async () => {
        setIsSpinner(true);
        await getOrders();
        setIsSpinner(false);
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    return isSpinner ? <Spinner /> : orders && (
        orders.length === 0
            ? <div className="text-center">No order Found</div>
            : <div className="container">
                {orders.map((el, i) => <ul className="list-group mb-4" key={i}>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="fw-bold">Order :#{i + 1}</span>
                        <button className='btn btn-success' data-bs-toggle="collapse"
                            data-bs-target={"#collapse" + i}
                            aria-expanded="false"
                            aria-controls={"collapse" + i}>Show</button>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="fw-bold">Order ID</span>
                        <span>{el._id}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="fw-bold">Net Quantity</span>
                        <span>{el.totalItems}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="fw-bold">Net Price</span>
                        <span>${el.totalPrice}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="fw-bold">Ordered At</span>
                        <span>{el.createdAt.slice(0, 10)}</span>
                    </li>
                    <div className="accordion" id="orderAccordion">
                        <div className="accordion-item">
                            <div
                                id={"collapse" + i}
                                className="accordion-collapse collapse"
                                aria-labelledby="headingOne"
                                data-bs-parent="#orderAccordion"
                            >
                                <div className="accordion-body">
                                    <CartPage currentCart={el} isCart={false} />
                                </div>
                            </div></div></div>
                </ul >)}
            </div >
    )
}

export default Orders
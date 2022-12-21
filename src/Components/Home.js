import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../Context/Cart/CartContext';
import ItemContext from '../Context/Items/ItemContext';
import Spinner from './Spinner';

const Home = () => {
    const { items, getItems } = useContext(ItemContext);
    const { addToCart } = useContext(CartContext);
    const [isSpinner, setIsSpinner] = useState(true);

    const fetchItems = async () => {
        setIsSpinner(true);
        await getItems();
        setIsSpinner(false);
    }

    useEffect(() => {
        fetchItems();
    }, [])

    return isSpinner ? <Spinner /> : items.length === 0 ? <div className="text-center">No Item Found</div> : (
        <div className="container d-flex flex-wrap">
            {items.map((el, i) => <div className="card m-3" style={{ width: "18rem" }} key={i}>
                <img src={el.img} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title fw-bold">{el.title}</h5>
                    <p className="card-text">
                        {el.description}
                    </p>
                    <p className="card-text">Price: ${el.price}</p>
                </div>
                <div className="card-footer text-muted d-flex justify-content-between align-items-center">
                    <span>{el.createdAt.slice(0, 10)}</span>
                    <span onClick={() => addToCart({ itemId: el._id })} className="btn btn-sm btn-outline-success">
                        Add to Cart
                    </span>
                </div>
            </div>)}
        </div>
    )
}

export default Home
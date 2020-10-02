import React, { useEffect, useState } from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData/index';
import ReviewItem from '../ReviewItem/ReviewItem';
import { removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import Cart from '../cart/Cart';
import placeOrderImg from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const getSavedItem = getDatabaseCart(); // get from database/ LocalStorage
        const productKeys = Object.keys(getSavedItem); // get the all key

        fetch('http://localhost:5000/getProductsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(result => setCart(result));
    }, [])

    const removeProduct = (productKey) => {
        const remainingProduct = cart.filter(item => item.key !== productKey);
        setCart(remainingProduct);
        removeFromDatabaseCart(productKey); // Remove from database / localStorage
    }

    const handlePlaceOrder = () => {
        // setCart([]);
        // processOrder();
        // setOrderPlace(true);
        history.push('/shipment');
    }

    let placeOrderStatus;
    if (orderPlace) {
        placeOrderStatus = <img src={placeOrderImg} alt="Order Place Done :) " />
    }

    return (
        <div>
            <div className="product-container">
                <div className="item-container">
                    {
                        cart.map(item => <ReviewItem key={item.key + Math.random()} product={item} removeProduct={removeProduct} />)
                    }
                    {
                        placeOrderStatus
                    }
                </div>
                <div>
                    <Cart cart={cart}>
                        <button onClick={handlePlaceOrder}>Proceed Checkout</button>
                    </Cart>
                </div>
            </div>

        </div>
    );
};

export default Review;
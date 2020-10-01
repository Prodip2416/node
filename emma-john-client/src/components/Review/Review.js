import React, { useState, useEffect } from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData/index';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../cart/Cart';
import { removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import placeOrderImg from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false);

    useEffect(() => {
        const getSavedItem = getDatabaseCart();
        const productKeys = Object.keys(getSavedItem);

        const totalProduct = productKeys.map(key => {
            const product = fakeData.find(item => item.key === key);
            product.quantity = getSavedItem[key];
            return product;
        })
        setCart(totalProduct);
    }, [])

    const removeProduct = (productKey) => {
        const product = cart.filter(item=> item.key !== productKey)
        setCart(product);
        removeFromDatabaseCart(productKey);
    }

    const orderPlaceHandle = () =>{
        setCart([]);
        processOrder();
        setOrderPlace(true);
    }
    let placeOrderStatus;
    if (orderPlace) {
        placeOrderStatus = <img src={placeOrderImg} alt="Order Place Done :) " />
    }
    return (
        <div>
            <div className="item-container">
                <div className="product-container">
                    {
                        cart.map(item => <ReviewItem key={item.key} product={item} removeProduct={removeProduct}></ReviewItem>)
                    }
                    {
                        placeOrderStatus
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <button className="cart-btn" onClick={orderPlaceHandle}>Place Order</button>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Review;
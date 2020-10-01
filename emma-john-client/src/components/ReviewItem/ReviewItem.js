import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    const { name, img, seller, price, stock, key, quantity } = props.product;
    console.log(props.product);

    return (
        <div className="product">
            <div style={{ marginRight: '5px' }}>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name"> {name}</h4>
                <p><small>by: {seller}</small></p>
                <p>Quantity : {quantity}</p>
                <p>${price}</p>
                <button className="cart-btn" onClick={() => props.removeProduct(key)}>Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;
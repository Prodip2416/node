import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// npm command for Font Awesome
// npm i--save @fortawesome/fontawesome-svg-core \
// @fortawesome/free-solid-svg-icons \
// @fortawesome/react-fontawesome

const Product = (props) => {
    const { name, img, seller, price, stock, key } = props.product;
    return (
        <div className="product">
            <div style={{ marginRight: '5px' }}>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name"> <Link to={"/product/" + key}>{name}</Link> </h4>
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>only {stock} left in stock - order soon</small></p>
                {
                     props.showAddToCart &&
                    <button className="cart-btn" onClick={() => { props.handleCartProduct(props.product) }}>
                        <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
                }
            </div>
        </div>
    );
};

export default Product;
import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom';


const Product = (props) => {
    const { name, price, shipping, stock, seller, img, key, quantity } = props.product;

    return (
        <div className="product-container mb-5">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="ml-3 mr-1">
                <Link to={"/product/" + key}>
                    <p className="mt-4 text-info">{name}</p>
                </Link>
                <p>By : <small>{seller}</small> </p>
                {
                    props.showQuantity && <p>Quantity : {quantity}</p>
                }
                <h2 className="">${price}</h2>
                <p>only {stock} left in stock - order soon</p>
                {
                    props.children
                }
            </div>
        </div>
    );
};

export default Product;
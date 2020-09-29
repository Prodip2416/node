import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData/index';
import Product from '../Product/Product';
import './Shop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {
    const data = fakeData.slice(0, 15);
    const [cart, setCart] = useState([]);

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

    const addToCart = (product) => {
        const sameProduct = cart.find(item => item.key === product.key);
        let count = 1;
        let totalAddedProduct = [];
        if (sameProduct) {
            count = sameProduct.quantity + 1
            sameProduct.quantity = count;
            const othersProduct = cart.filter(item => item.key !== product.key);
            totalAddedProduct = [...othersProduct, sameProduct];
        } else {
            product.quantity = 1;
            totalAddedProduct = [...cart, product];
        }

        setCart(totalAddedProduct);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="shop-container">
            <div className="product">
                {
                    data.map(item =>
                        <Product key={item.key} product={item}>
                            <button className="cart-btn" onClick={() => addToCart(item)}>
                                <FontAwesomeIcon icon={faCartPlus} />  add to cart
                            </button>
                        </Product>)
                }
            </div>
            <div className="cart">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="cart-btn">Order Review</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
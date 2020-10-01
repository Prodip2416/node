import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData/index';
import './Shop.css';
import Product from '../product/Product';
import Cart from '../cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const getSavedItem = getDatabaseCart();
        const productKeys = Object.keys(getSavedItem);

        const totalProduct = productKeys.map(key => { // map all the key
            const product = fakeData.find(item => item.key === key); // get the product from key 
            product.quantity = getSavedItem[key];
            return product;
        });

        setCart(totalProduct);
    }, [])

    const handleCartProduct = (product) => {
        const productKey = product.key;
        const sameProduct = cart.find(item => item.key === productKey);
        let count = 1;
        let totalCartProduct = [];

        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const othersProduct = cart.filter(item => item.key !== productKey);
            totalCartProduct = [...othersProduct, sameProduct];
        } else {
            product.quantity = 1;
            totalCartProduct = [...cart, product];
        }

        setCart(totalCartProduct);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="item-container">
            <div className="product-container">
                {
                    products.map(item => <Product key={item.key + Math.random()} product={item} handleCartProduct={handleCartProduct} showAddToCart={true} />)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} >
                    <Link to="/review">
                        <button className="cart-btn" >Order Review</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
import React, { useState, useEffect } from 'react';
import './Shop.css';
import Product from '../product/Product';
import Cart from '../cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';
import { getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {
    const [itemCollection, setItemCollection] = useState([]);
    const [cartItem, setCartItem] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/products?search=' + search, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => setItemCollection(result))
    }, [search])

    useEffect(() => { // get previous cart item from local storage
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
            .then(result => setCartItem(result));
    }, [])

    const handleCart = (product) => {
        const addProductKey = product.key;
        const sameProduct = cartItem.find(item => item.key === addProductKey);
        let count = 1;
        let totalCartItem = [];

        if (sameProduct) { // if before add to this cart
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const othersProduct = cartItem.filter(item => item.key !== addProductKey)
            totalCartItem = [...othersProduct, sameProduct];
        } else { // if before not added to cart
            product.quantity = count;
            totalCartItem = [...cartItem, product];
        }

        setCartItem(totalCartItem); // added to cart
        addToDatabaseCart(product.key, count); // added to localStorage
    }
    const handleBlur = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div className="product-container">
            <div className="item-container">
                <div className="text-center"><input type="text" onBlur={handleBlur} placeholder="search product..." className="m-2 p-2" /></div>
                {
                    itemCollection.length === 0 && <div className="text-center"><img src="https://i.ibb.co/7WWY588/spinner-icon-gif-25.gif" alt="" />
                        <img src="https://i.ibb.co/89JnSSp/1-9-EBHIOzh-E1-Xf-MYo-Kz1-Jcs-Q.gif" alt="" /></div>
                }
                {
                    itemCollection.map(item => <Product key={item.key} item={item} handleCart={handleCart} showAddToCart={true} />)
                }
            </div>
            <div>
                <Cart cart={cartItem}>
                    <Link to="/review">
                        <button>Review Your Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
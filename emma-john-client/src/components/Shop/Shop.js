import React, { useState, useEffect } from 'react';
import './Shop.css';
import Product from '../product/Product';
import Cart from '../cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';
import { getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {
    //const totalShowingItem = fakeData.slice(0, 10);
    const [itemCollection, setItemCollection] = useState([]);
    const [cartItem, setCartItem] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(result => setItemCollection(result))
    }, [])

    useEffect(() => { // get previous cart item from local storage
        const getSavedItem = getDatabaseCart(); // get from database/ LocalStorage
        const productKeys = Object.keys(getSavedItem); // get the all key

        if (itemCollection.length > 0){
            const totalProduct = productKeys.map(key => { // map all the key
                const product = itemCollection.find(item => item.key === key); // get the product from key 
                product.quantity = getSavedItem[key];
                return product;
            })
            setCartItem(totalProduct); // set to cart
        }     
    }, [itemCollection])

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

    return (
        <div className="product-container">
            <div className="item-container">
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
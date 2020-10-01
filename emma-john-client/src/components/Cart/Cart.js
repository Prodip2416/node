import React from 'react';
import './Cart.css';


const Cart = (props) => {
    const cart = props.cart;
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    let shipping = 0;
    if (totalPrice > 35) {
        shipping = 0
    } else if (totalPrice > 15) {
        shipping = 4.99;
    }
    const grandTotal = shipping + totalPrice;

    const convertToFixed = (num) => {
        return num.toFixed(2);
    }
    return (
        <div>
            <h3>Order Summery : {cart.length}</h3>
            <p>Shipping : {convertToFixed(shipping)}</p>
            <h4>Total Item Price : {convertToFixed(totalPrice)}</h4>
            <h3 className="order-Total">Order Total : {convertToFixed(grandTotal)}</h3>
           {
               props.children
           }
            
        </div>
    );
};

export default Cart;
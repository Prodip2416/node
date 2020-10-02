import React from 'react';
import './Cart.css';


const Cart = (props) => {
    const totalCartItem = props.cart;
    const totalPrice = (totalCartItem.reduce((total, item) => total + item.price * item.quantity || 1, 0));
    const totalShipping = (totalCartItem.reduce((total, item) => total + item.shipping, 0));
    const beforeTax = totalPrice + totalShipping;
    const tax = (totalPrice * 5) / 100;
    const grandTotal = beforeTax + tax;

    const convertToFixed = (num) => {
        return num.toFixed(2);
    }

    return (
        <div>
            <div className="cart-header">
                <h2>Order Summary</h2>
                <h3>Items ordered: {totalCartItem.length}</h3>
            </div>
            <div className="cart-footer">
                <p>Item Price: ${convertToFixed(totalPrice)}</p>
                <p>Shipping & Handling: ${convertToFixed(totalShipping)}</p>
                <p>Total before tax: ${convertToFixed(beforeTax)}</p>
                <p>Estimated Tax: ${convertToFixed(tax)}</p>
                <p className="order-lbl">Order Total:	${convertToFixed(grandTotal)}</p>
                {
                    props.children
                }

            </div>
        </div>
    );
};

export default Cart;
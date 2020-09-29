import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    const price = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = cart.reduce((total, item) => total + item.shipping, 0);
    const taxVat = (price + shipping) * 5 / 100;
    const total = price + shipping + taxVat;
    const convertToFixed = (num) => {
        return num.toFixed(2);
    }

    return (
        <div className="mt-1">
            <h3 className="text-info">Order Summary</h3>
            <p>Total Item : {cart.length}</p>
            <p>Price : ${convertToFixed(price)}</p>
            <p>Shipping Cost: ${convertToFixed(shipping)}</p>
            <p>Tax + Vat : ${convertToFixed(taxVat)}</p>
            <h4>Total : ${convertToFixed(total)}</h4>
           {
               props.children
           }
        </div>
    );
};

export default Cart;
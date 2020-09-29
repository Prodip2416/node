import React from 'react';
import Product from '../Product/Product';

const ReviewDetail = (props) => {

    return (
        <div>
            <Product product={props.product} showQuantity={true}>
                <button onClick={() => props.removeProductHandle(props.product.key)} className="cart-btn">Remove</button>
            </Product>
        </div>
    );
};

export default ReviewDetail;
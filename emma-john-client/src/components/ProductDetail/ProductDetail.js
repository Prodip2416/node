import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './ProductDetail.css';

const ProductDetail = () => {
    const {id} = useParams();
    const product = fakeData.find(item=> item.key === id);
    return (
        <div className="product-detail">
            <h1 className="text-center text-warning mt-3 mb-3">Product Details</h1>
            <Product product={product}/>
        </div>
    );
};

export default ProductDetail;
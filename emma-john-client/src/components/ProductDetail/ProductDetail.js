import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Product from '../product/Product';

const ProductDetail = () => {
    const [product, setProduct] = useState({});
    const { productKey } = useParams();

    useEffect(() => {
        fetch('http://localhost:5000/products/' + productKey)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [productKey])

    return (
        <div>
            <h1 className="">Product Detail :</h1>
            <Product item={product} showAddToCart={false} />
        </div>
    );
};

export default ProductDetail;
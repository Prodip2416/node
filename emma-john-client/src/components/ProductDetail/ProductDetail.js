import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Product from '../product/Product';

const ProductDetail = () => {
    const [product, setProduct] = useState({});
    const { productKey } = useParams();
    const [loading, setLoading] = useState(false);
    document.title = 'Product Details';
    
    useEffect(() => {
        fetch('http://localhost:5000/products/' + productKey)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(true);
            });
    }, [productKey])

    return (
        <div>
            {
                !loading && <div className="text-center">
                    <img src="https://i.ibb.co/89JnSSp/1-9-EBHIOzh-E1-Xf-MYo-Kz1-Jcs-Q.gif" alt=""/>
                </div>
            }
            <h1 className="">Product Detail :</h1>
            <Product item={product} showAddToCart={false} />
        </div>
    );
};

export default ProductDetail;
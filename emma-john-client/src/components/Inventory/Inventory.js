import React from 'react';
import fakeData from '../../fakeData/index.js';

const Inventory = () => {
    const handleAddProduct = () => {
        fetch('http://localhost:5000/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fakeData)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
            })
    }

    return (
        <div>
            <h1>Add all Product</h1>
            <button className="btn btn-warning" onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default Inventory;
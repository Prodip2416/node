import React from 'react';
import fakeData from '../../fakeData/index';

const Inventory = () => {
    const handleAdd = () => {
        fetch('http://localhost:5000/addProduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fakeData)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
            })
    }
    return (
        <div>
            <h1>This is Inventory</h1>
            <button onClick={handleAdd}>Add All Product</button>
        </div>
    );
};

export default Inventory;
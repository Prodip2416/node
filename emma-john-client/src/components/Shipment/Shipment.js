import React from 'react';
import { useForm } from "react-hook-form";
import { useContext } from 'react';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => {
        const order = { ...loggedInUser, product: getDatabaseCart(), shipment: data, orderTime: new Date().toLocaleDateString() };

        fetch('http://localhost:5000/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    processOrder();
                    alert('Order placed successfully');
                }
            })
    };

    return (
        < form onSubmit={handleSubmit(onSubmit)} >
            < input name="name" defaultValue={loggedInUser.displayName} ref={register} /><br/>
            < input name="email" defaultValue={loggedInUser.email} /><br />
            < input name="address" ref={register({ required: true })} /><br />
            {errors.address && <span>This field is required</span>}
            < input name="phone" ref={register({ required: true })} /><br />
            {errors.phone && <span>This field is required</span>}
            <input type="submit" />
        </form >
    );
};

export default Shipment;
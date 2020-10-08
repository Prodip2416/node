import React from 'react';
import { useForm } from "react-hook-form";
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import PaymentProcess from '../PaymentProcess/PaymentProcess';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [shipmentData, setShipmentData] = useState(null);

    const onSubmit = data => {
        setShipmentData(data);
    };

    const handlePaymentSuccess = (paymentID) => {
        const order = {
            ...loggedInUser,
            product: getDatabaseCart(),
            shipment: shipmentData,
            paymentInfo: paymentID,
            orderTime: new Date().toLocaleDateString()
        };

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
    }
    return (
        <div className="container">
            <div className="row mt-5">
                <div style={{ display: shipmentData ? 'none' : 'block' }} className="col-md-6">
                    < form onSubmit={handleSubmit(onSubmit)} >
                        < input name="name" defaultValue={loggedInUser.name} ref={register} /><br />
                        < input name="email" defaultValue={loggedInUser.email} /><br />
                        < input name="address" ref={register({ required: true })} /><br />
                        {errors.address && <span>This field is required</span>}
                        < input name="phone" ref={register({ required: true })} /><br />
                        {errors.phone && <span>This field is required</span>}
                        <input type="submit" />
                    </form >
                </div>
                <div style={{ display: shipmentData ? 'block' : 'none' }} className="col-md-6">
                    <PaymentProcess handlePaymentSuccess={handlePaymentSuccess}/>
                </div>
            </div>
        </div>

    );
};

export default Shipment;
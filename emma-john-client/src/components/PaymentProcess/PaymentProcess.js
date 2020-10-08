import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCard from './SimpleCard';
import SplitForm from './SplitForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51HZft0KnAm2T6t959HgVosZhO96LaQa6yQSbNfHI8qBjocXC5ET0yL6Hzar7wRbMdknJKOR6XngOpBxUtZFHCbmV00kgTH2CGU');

const PaymentProcess = ({ handlePaymentSuccess}) => {
    return (
        <Elements stripe={stripePromise}>
            {/* <SimpleCard/> */}
            <SplitForm handlePaymentSuccess={handlePaymentSuccess}/>
        </Elements>
    );
};

export default PaymentProcess;
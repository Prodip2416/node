import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const ShowBooking = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [booking, setBooking] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/getBookingInfo?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization:`Bearer ${sessionStorage.getItem('token')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                setBooking(data);
            })
    }, [])
    return (
        <div>
            <h3>Your total booking {booking.length}</h3>
            {
                booking.map(item =>
                    <li key={item._id}>{item.name} booked, from : {(new Date(item.checkIn)).toDateString('dd/MM/yyyy')} to: {(new Date(item.checkOut)).toDateString('dd/MM/yyyy')}</li>
                )
            }
        </div>
    );
};

export default ShowBooking;
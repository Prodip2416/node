import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { UserContext } from '../Main/Main';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    console.log(watch("example"));
    return (
        < form className="ship-form" onSubmit={handleSubmit(onSubmit)} >
            < input name="name" ref={register({ required: true })} defaultValue={loggedInUser.name}  placeholder="your name" />
            {errors.name && <span className="error">This field is required</span>}
            < input name="email" ref={register({ required: true })} defaultValue={loggedInUser.email}  placeholder="your email" />
            {errors.email && <span className="error">This field is required</span>}
            < input name="address" ref={register({ required: true })}  placeholder="your address" />
            {errors.address && <span className="error">This field is required</span>}
            < input name="phone" ref={register({ required: true })} placeholder="your phone" />
            {errors.phone && <span className="error">This field is required</span>}   
            <input type="submit" />
        </form >
    );
};

export default Shipment;
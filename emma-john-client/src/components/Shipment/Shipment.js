import React from 'react';
import { useForm } from "react-hook-form";
import { useContext } from 'react';
import { UserContext } from '../../App';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => console.log(data);

    return (
        < form onSubmit={handleSubmit(onSubmit)} >
            < input name="name" defaultValue={loggedInUser.displayName} ref={register} />
            < input name="email" defaultValue={loggedInUser.email}  />
            < input name="address"  ref={register({ required: true })} />
            {errors.address && <span>This field is required</span>}
            < input name="phone" ref={register({ required: true })} />
            {errors.phone && <span>This field is required</span>}
            <input type="submit" />
        </form >
    );
};

export default Shipment;
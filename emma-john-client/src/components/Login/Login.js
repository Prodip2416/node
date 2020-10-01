import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
    firebaseInitialized, googleSignIn, fbSignIn, signOut, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, githubSignIn
} from './LoginManager';
import {UserContext} from '../../App';

firebaseInitialized();

function Login() {
    const [user, setUser] = useState({ isSignIn: false, name: '', email: '', image: '', success: false, error: '' });
    const [newUser, setNewUser] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleSignIn = () => {
        googleSignIn()
            .then(res => {
                handleResult(res, true);
            })
    }
    const handleFBLogin = () => {
        fbSignIn()
            .then(res => {
                handleResult(res, true);
            })
    }
    const handleGithub = () => {
        githubSignIn()
            .then(res => {
                handleResult(res, true);
            })
    }
    const handleSignOut = () => {
        signOut()
            .then(res => {
                handleResult(res, false);
            })
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResult(res, true);
                })
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResult(res, true);
                })
        }
        e.preventDefault();
    }

    const handleResult = (res, redirect) => {
        console.log(res)
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    const handleBlur = (e) => {
        let isValidForm = true;
        if (e.target.name === 'email') {
            isValidForm = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isGreaterThanFive = e.target.value.length > 5;
            // const isAtLeastOneDigitUpperCaseSpecialCharacter = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(e.target.value);
            const atLestOneDigit = /\d{1}/.test(e.target.value);
            isValidForm = isGreaterThanFive && atLestOneDigit;
        }

        if (isValidForm) {
            const newUser = { ...user };
            newUser[e.target.name] = e.target.value;
            setUser(newUser);
        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.isSignIn ? <button onClick={handleSignOut} >Sign Out</button> : <button onClick={handleSignIn} >Sign In</button>
            }
            <br />
            <button onClick={handleFBLogin}>FaceBook Login</button><br/>
            {
                user.isSignIn && <div>
                    <h1>Welcome, Mr. {user.name}</h1>
                    <p>Your Email : {user.email}</p>
                    <img src={user.image} alt="" />
                </div>
            }
            <h1>Our Own Authentication</h1>
            <form action="" onSubmit={handleSubmit} >
                <input type="checkbox" onChange={() => setNewUser(!newUser)} id="" />
                <label htmlFor="">Is New User</label> <br />
                {newUser && <input type="text" name="name" placeholder="name" onBlur={handleBlur} />}<br />
                <input type="text" name="email" onBlur={handleBlur} placeholder="your email" required /><br />
                <input type="password" name="password" onBlur={handleBlur} placeholder="your password" required /><br />
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} successfully</p>}
        </div>
    );
}

export default Login;
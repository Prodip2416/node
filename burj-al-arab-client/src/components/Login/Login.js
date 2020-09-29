import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

if (firebase.initializeApp.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            const { displayName, email } = result.user;
            const newUser = { name: displayName, email };
            setLoggedInUser(newUser);
            storeToken(); // store token to session
           
        }).catch(function (error) {
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    const storeToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
           sessionStorage.setItem('token', idToken);
            history.replace(from); // replace the page whose requested
        }).catch(function (error) {
            // Handle error
        });
    }

    return (
        <div>
            <h1>This is Login page</h1>
            <button onClick={googleSignIn}>Sign In with Google</button>
        </div>
    );
};

export default Login;
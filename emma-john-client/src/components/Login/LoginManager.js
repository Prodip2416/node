import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';


export const firebaseInitialized = () => {
    if (firebase.initializeApp.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const googleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then((result) => {
            const { displayName, email, photoURL } = result.user;
            const signInUser = { isSignIn: true, name: displayName, email: email, image: photoURL };
            signInUser.success = true;
            return signInUser;
        })
        .catch(error => {
            console.log(error.code);
            console.log(error.message);
        })
}

export const fbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function (result) {
        result.user.success = false;
        return result.user;
    })
        .catch(function (error) {
            console.log(error.code);
            console.log(error.message);
        });
}

export const githubSignIn = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(provider).then(function (result) {
      return result.user;
    }).catch(function (error) {
       console.log(error.code);
    });
}

export const signOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signOutUser = { isSignIn: false, name: '', email: '', image: '' };
            signOutUser.success = false;
            return signOutUser;
        })
        .catch(error => {
            console.log(error);
            console.log(error.message);
        })
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUser = res.user;
            newUser.success = true;
            newUser.error = '';
            userInfoUpdate(name);
            return newUser;
        })
        .catch(error => {
            const newUser = {};
            newUser.success = false;
            newUser.error = error.message;
            return newUser;
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUser = res.user;
            newUser.success = true;
            newUser.error = '';
            return newUser;
        })
        .catch(error => {
            const newUser = {};
            newUser.success = false;
            newUser.error = error.message;
            return newUser;
        });
}

const userInfoUpdate = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    }).then(function () {
        console.log('user name Update successful');
    }).catch(function (error) {
        console.log(error);
    });
}
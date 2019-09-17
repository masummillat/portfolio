import firebase from './firebase/firebase';
const jwtDecode = require('jwt-decode');

const isAuthenticated = () => {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
        if (new Date().getTime() / 1000 <= new Date(jwtDecode(accessToken).exp)) {
            return true;
        }
    }

    return false;
};

export default isAuthenticated;
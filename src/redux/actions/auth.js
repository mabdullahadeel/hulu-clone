import * as actionTyps from './actionsTypes';

import baseURL from './backendConfig'
// importing axios from the installed axios
import axios from 'axios';

// At the Start of Authentication
export const authStart = () => {
    return {
        type: actionTyps.AUTH_START
    }
}
// On Successful Authentication
export const authSuccess = (token) => {
    return {
        type: actionTyps.AUTH_SUCCESS,
        token: token
    }
}

// If authentication Fails
export const authFail = (error) => {
    return {
        type: actionTyps.AUTH_FAIL,
        error: error
    }
};

//Logging OUT when the session expires
export const LogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    return {
        type: actionTyps.AUTH_LOGOUT
    }
}

// Checking for the EXPIRATION of USER's SESSION
const checkAuthTimeout = (expirationTime) => {
    return dispatch =>
        setTimeout(() => {
            dispatch(LogOut())
        }, expirationTime * 1000)
}

// Starting the LOGIN Process
export const authLogin = (username, password) => {
    return dispatch => {  // call to action
        dispatch(authStart());
        axios.post(`${baseURL}/rest-auth/login/`, {
            username: username,
            password: password
        })
            .then(response => {
                const token = response.data.key;  //rest api will reposnse with a key if the crediential are correct
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
                localStorage.setItem("token", token);
                localStorage.setItem("expirationDate", expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout());
            })
            .catch(error => {
                dispatch(authFail(error))
            })
    }
}

// SignUp Process
export const authSignUp = (username, email, password1, password2) => {
    return dispatch => {  // call to action
        dispatch(authStart());
        axios.post(`${baseURL}/rest-auth/registration/`, {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
            .then(response => {
                const token = response.data.key;  //rest api will reposnse with a key if the crediential are correct
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
                localStorage.setItem("token", token);
                localStorage.setItem("expirationDate", expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout());
            })
            .catch(error => {
                dispatch(authFail(error))
            })
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(LogOut());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(LogOut());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()) / 1000);
            }
        }
    }
}
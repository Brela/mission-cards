import { API_URL } from './_config';
import UserType from '../types/UserType';


export async function createUserWithEmail(email: string, password: string, confirmPassword: string) {
    const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // userName,
            email,
            password,
            confirmPassword
        }),
    });
    const responseData = await response.json();
    console.log('done', responseData.userName);
    return responseData;
}

export async function loginWithEmail(email: string, password: string) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            }),
        });
        const data = await response.json();
        return { status: response.status, data };
    } catch (error: unknown) {
        const err = error as Response;
        const data = await err.json();
        return { status: err.status, data };
    }
}

// send a POST request to server to create a new user with the provided Google ID token.
export async function createUserWithGoogle(idToken: string) {
    try {
        const response = await fetch(`${API_URL}/auth/google/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_token: idToken,
            }),
        });
        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        const err = error as Response;
        const data = await err.json();
        return { status: err.status, data };
    }
}

// send a POST request to server to authenticate the user with the provided Google ID token.
export async function loginWithGoogle(idToken: string) {
    try {
        const response = await fetch(`${API_URL}/auth/google/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_token: idToken,
            }),
        });
        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        const err = error as Response;
        const data = await err.json();
        return { status: err.status, data };
    }
}



/* Passport automatically attaches the logged-in user's information to the req object, 
so there's no need to send the user ID explicitly in this case. */
export async function logoutUser() {
    const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
    });
    return response;
}



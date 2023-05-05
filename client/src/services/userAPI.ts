import { API_URL } from './_config';
import UserType from '../types/UserType';


export async function updateUser(userId: string, updates: { themeColor: string }) {
    const { themeColor } = updates;

    try {
        const response = await fetch(`${API_URL}/user/update`, {
            method: 'PATCH',
            body: JSON.stringify({
                userId,
                themeColor,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to update theme color');
        }
        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('Failed to update theme color', error);
        // You can handle the error further, such as displaying an error message to the user
    }
}


export async function createUserWithEmail(email: string, password: string, confirmPassword: string) {
    const response = await fetch(`${API_URL}/user/signup`, {
        method: 'POST',
        credentials: 'include',
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
        const response = await fetch(`${API_URL}/user/login`, {
            method: 'POST',
            credentials: 'include',
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

/* Passport automatically attaches the logged-in user's information to the req object, 
so there's no need to send the user ID explicitly in this case. */
export async function logoutUser() {
    const response = await fetch(`${API_URL}/user/logout`, {
        method: 'POST',
        credentials: 'include',
    });
    return response;
}

/* 
// send a POST request to server to create a new user with the provided Google ID token.
export async function createUserWithGoogle(idToken: string) {
    try {
        const response = await fetch(`${API_URL}/user/google/signup`, {
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
        const response = await fetch(`${API_URL}/user/google/login`, {
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
 */






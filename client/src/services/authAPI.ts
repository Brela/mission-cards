import { API_URL } from './_config';
import UserType from '../types/UserType';

export async function loginUser(email: string, password: string): Promise<UserType[]> {
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        }),
    });
    return await response.json();
}


export async function createUser(userName: string, email: string, password: string, confirmPassword: string) {
    const response = await fetch(`${API_URL}/users/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName,
            email,
            password,
            confirmPassword
        }),
    });
    const responseData = await response.json();
    console.log('done', responseData.userName);
    return responseData;
}

/* Passport automatically attaches the logged-in user's information to the req object, 
so there's no need to send the user ID explicitly in this case. */
export async function logoutUser() {
    const response = await fetch(`${API_URL}/users/logout`, {
        method: 'GET',
    });
    return response;
}

import { API_URL, GUEST_USERNAME, GUEST_PASSWORD } from './_config';
import UserType from '../types/UserType';

// called from decksContainer component
export async function loadUserThemeColor(userId: string) {
    try {
        const response = await fetch(`${API_URL}/user/${userId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();
        const themeColor = userData.user.themeColor;

        const rgbaFromRgb = (rgb: string, alpha: number) => {
            const [r, g, b] = rgb.match(/\d+/g)!.map(x => parseInt(x, 10));
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };

        // Set the CSS global variable for the first accent color
        document.documentElement.style.setProperty('--accent-color-1', themeColor);

        // Set the CSS global variables for the second and third accent colors
        const semiTransAccentColor = rgbaFromRgb(themeColor, 0.20);
        const fullTransAccentColor = rgbaFromRgb(themeColor, 0.05);
        document.documentElement.style.setProperty('--accent-color-1-semi-trans', semiTransAccentColor);
        document.documentElement.style.setProperty('--accent-color-1-full-trans', fullTransAccentColor);
    } catch (error) {
        console.error('Failed to fetch user data:', error);
    }
}



export async function updateUser(userId: string, updates: { themeColor: string }) {
    const { themeColor } = updates;

    try {
        const response = await fetch(`${API_URL}/user/update`, {
            method: 'PATCH',
            credentials: 'include',
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


export async function createUserWithEmail(email: string, password: string, confirmPassword: string, themeColor: string) {
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
            confirmPassword,
            // give the user the default color theme of the current css var
            themeColor,
        }),
    });
    const responseData = await response.json();
    console.log('done', responseData);
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
export async function loginAsGuest() {
    try {
        const response = await fetch(`${API_URL}/user/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: `${GUEST_USERNAME}`,
                password: `${GUEST_PASSWORD}`,
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






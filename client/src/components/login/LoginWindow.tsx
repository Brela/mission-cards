import React, { useState, useEffect, useContext, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { SnackbarCloseReason } from '@mui/material';
import { loginWithEmail } from '../../services/authAPI';
// import { loginWithGoogle } from '../../services/authAPI';
import { UserContext } from '../../contexts/UserContext';

type Props = {};

declare global {
    interface Window {
        google: any;
    }
}

function LoginWindow() {
    const { isAuthenticated, setIsAuthenticated, user, setUser, justSignedUp, setJustSignedUp } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        console.log('isAuthenticated ', isAuthenticated);
        console.log('user ', user);
    }, [isAuthenticated, user]);

    /*     useEffect(() => {
            if (window.google && window.google.accounts && window.google.accounts.id) {
                window.google.accounts.id.initialize({
                    client_id: "785322521849-crbjnjmu9q3s0nhdcj896qq0d7u7snq5.apps.googleusercontent.com",
                    callback: handleCredentialResponse,
                    cancel_on_tap_outside: false,
                });
                window.google.accounts.id.renderButton(document.getElementById("g_id_onload"), {
                    type: "standard",
                    shape: "rectangular",
                    theme: "outline",
                    text: "signup_with",
                    size: "large",
                    logo_alignment: "left",
                });
            }
        }, []);
     */

    async function handleLoginUserWithEmail(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await loginWithEmail(email, password);
        // console.log(response);
        if (response.status === 200) {
            // Redirect to home page after successful login
            setIsAuthenticated(true);
            console.log('response', response);
            setUser(response.data.user);
            window.location.href = '/';
        } else {
            // Display error message if login fails
            alert(response.data.error);
        }
    }

    /* async function handleLoginUserWithGoogle(idToken: string) {
        const response = await loginWithGoogle(idToken);
        if (response.status === 200) {
            setIsAuthenticated(true);
            setUser(response.data.user);
            window.location.href = '/';
        } else {
            alert(response.data.error);
        }
    } */


    // ---------------------- google button with popup window -------------------------------------------------------------
    /*     useEffect(() => {
            window.gapi.load('auth2', renderGoogleButton);
        }, []) 

    function renderGoogleButton() {
        window.gapi.signin2.render('google-button', {
            scope: 'profile email',
            // width: 240,
            // height: 50,
            longtitle: true,
            theme: 'light',
            onsuccess: onGoogleSignInSuccess,
            onfailure: onGoogleSignInFailure,
        });
    }


   function onGoogleSignInSuccess(googleUser: any) {
           const idToken = googleUser.getAuthResponse().id_token;
           handleLoginUserWithGoogle(idToken);
       } 

    function onGoogleSignInFailure(error: any) {
        console.error("Google Sign-In error:", error);
    }
    */
    // -----------------------------------------------------------------------------------

    /* 
        const handleCredentialResponse = (response: any) => {
            console.log(response);
            // Handle response here, e.g., authenticate the user with your server
        }; */

    const handleSnackbarClose = (event: React.SyntheticEvent<Element, Event> | Event, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setJustSignedUp(false);
    };


    return (

        <div className="">
            <form onSubmit={handleLoginUserWithEmail}>
                <ul>
                    <li className='email-pass'>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </li>
                    <li className='email-pass'>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </li>
                    <li className="sign-up-button google-btn">
                        <button type="submit" className="btn-text sign-in-with-email">Sign in</button>
                    </li>

                    <li className='or-container'>
                        <span></span>
                        <p className='or'>or</p>
                        <span></span>
                    </li>
                    <li className='guest-signin-description'>to view app without access to features</li>
                    <li className="sign-up-button google-btn">
                        <button type="submit" className="btn-text sign-in-with-email">
                            <Link to="/">Guest sign in
                            </Link>
                        </button>
                    </li>
                    {/*         <li className='google-button-container'>
                        <div id="google-button"></div>
                    </li> */}
                </ul>
            </form>
            <Snackbar
                open={justSignedUp}
                autoHideDuration={10000}
                onClose={handleSnackbarClose as (event: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" onClose={handleSnackbarClose as (event: React.SyntheticEvent<Element, Event>) => void}>
                    Thank you for signing up! Please log in.
                </Alert>
            </Snackbar>

        </div>
    );
}

export default LoginWindow;

import React, { useState, useEffect, useContext, SyntheticEvent } from 'react';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { SnackbarCloseReason } from '@mui/material';
import { loginUser } from '../../services/authAPI';
import { UserContext } from '../../contexts/UserContext';

type Props = {};

function LoginWindow() {
    const { isAuthenticated, setIsAuthenticated, user, setUser, justSignedUp, setJustSignedUp } = useContext(
        UserContext
    );
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        console.log('isAuthenticated ', isAuthenticated);
        console.log('user ', user);
    }, [isAuthenticated, user]);

    async function handleLoginUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await loginUser(email, password);
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

    const handleSnackbarClose = (event: React.SyntheticEvent<Element, Event> | Event, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setJustSignedUp(false);
    };


    return (
        <div className="">
            <form onSubmit={handleLoginUser}>
                <ul>
                    <li>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </li>
                    <li>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </li>
                    <li className="sign-up-button">
                        <button type="submit">Log in</button>
                    </li>
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

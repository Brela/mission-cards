import React, { useState, useEffect, useContext } from 'react';
import { createUser } from '../../services/authAPI';
import { UserContext } from '../../contexts/UserContext';

type Props = {
    onUserLoggedIn: (user: any) => void;
};
declare global {
    interface Window {
        google: any;
    }
}

function SignupWindow() {
    const { setJustSignedUp, setShowLoginWindow } = useContext(UserContext);
    // const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function handleSignupUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (password === confirmPassword) {
            const response = await createUser(email, password, confirmPassword);
            if (response.user) {
                setJustSignedUp(true)
                setShowLoginWindow(true)
            }
            console.log(response);
        } else {
            console.log("Passwords do not match.");
        }
    }


    useEffect(() => {
    }, []);

    return (
        <div className="">
            <form onSubmit={handleSignupUser}>
                <ul>
                    <li>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </li>
                    {/*       <li>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="username"
                            id="username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </li> */}
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
                    <li>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </li>
                    <li className="sign-up-button google-btn">
                        <button type="submit" className="btn-text sign-in-with-email">Sign up with email</button>
                    </li>
                    <li className='google-button-container'>
                        <div className="google-btn">
                            <div className="google-icon-wrapper">
                                <img className="google-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                            </div>
                            <p className="btn-text"><b>Sign up with Google</b></p>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
    );
}

export default SignupWindow;

import React, { useState, useEffect } from 'react';
import { createUser } from '../../services/authAPI';

type Props = {
    onUserLoggedIn: (user: any) => void;
};


function SignupWindow() {
    // const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function handleSignupUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (password === confirmPassword) {
            const response = await createUser(email, password, confirmPassword);
            if (response.user) {

                // props.onUserLoggedIn(response.user);
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
                    <li className='sign-up-button'>
                        <button type="submit">Sign up</button>
                    </li>
                </ul>
            </form>
        </div>
    );
}

export default SignupWindow;

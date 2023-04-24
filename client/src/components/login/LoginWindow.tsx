import React, { useState, useEffect } from 'react';
import { loginUser } from '../../services/authAPI';

type Props = {
};

function LoginWindow() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLoginUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await loginUser(email, password);
        console.log(response);
    }

    useEffect(() => {
    }, []);

    return (
        <div className="">
            <form onSubmit={handleLoginUser}>
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
                    <li className='sign-up-button'>
                        <button type="submit">Log in</button>
                    </li>
                </ul>
            </form>
        </div>
    );
}

export default LoginWindow;

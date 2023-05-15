import React, { useContext, useEffect, useState } from 'react';
import ErrorContext from '../../contexts/ErrorContext';
import { UserContext } from '../../contexts/UserContext';
import { chatWithGPT } from '../../services/openAiAPI';

import styled from '@emotion/styled';
import { MoonLoader } from 'react-spinners';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function GptBot() {
    const { setError } = useContext(ErrorContext);
    const { user, isAuthenticated } = useContext(UserContext);
    const [userPrompt, setUserPrompt] = useState('');
    const [botResponse, setBotResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const StyledLoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    color: #ffffff
  `;


    async function handleGptPrompt(e: React.FormEvent) {
        e.preventDefault();
        // front end route protection
        /*  if (!isAuthenticated) {
             setError('Please sign up to use this feature');
             return;
         } */
        setIsLoading(true);
        const response = await chatWithGPT(userPrompt);

        // backend "ensureauth" req protection
        if ('error' in response) {
            setError(response.error.message || 'An error occurred');
        } else {
            setBotResponse(response.result); // Update bot response
        }
        setIsLoading(false);
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserPrompt(e.target.value); // Update user prompt
    }

    return (
        <div className='gpt-bot-sub-container'>
            <form onSubmit={handleGptPrompt}>
                <input placeholder='I am chatGPT. Ask me anything' type="text" value={userPrompt} onChange={handleInputChange} />
                <button type="submit">
                    <FontAwesomeIcon
                        className='faPlus-icon send-gpt-prompt-button'
                        icon={faPaperPlane}
                    />
                </button>
            </form>

            <section className='laoding-icon'>
                {isLoading ? (
                    <StyledLoaderContainer>
                        <MoonLoader color="#000" loading={isLoading} size={30} />
                    </StyledLoaderContainer>
                ) : (
                    <p>{botResponse}</p>
                )}

            </section>
        </div>
    );
}

export default GptBot;

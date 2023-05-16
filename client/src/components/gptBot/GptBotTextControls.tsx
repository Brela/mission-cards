import React, { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { CardListContext } from '../../contexts/CardListContext';

// add icons to each component that needs them instead of app
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
// usage -- {<FontAwesomeIcon icon={faSearch} />}


function GptBotTextControls() {
    const { user } = useContext(UserContext)
    const { userPrompt, botResponse, setFrontText, setBackText } = useContext(CardListContext)
    const [activeItem, setActiveItem] = useState('');

    const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const popupName = (e.currentTarget as HTMLDivElement).dataset.popup || '';
        setActiveItem(popupName);
    };


    // this is supposed to allow the boxes to be closed by clicking anywhere, but it makes the boxes not show up
    /*     useEffect(() => {
            const handleClick = (event: MouseEvent) => {
                const popup = document.querySelector('.active-item');
                if (popup && !popup.contains(event.target as Node)) {
                    setActiveItem('');
                }
                console.log(activeItem)
                console.log(popup)
            };
    
            document.addEventListener('click', handleClick);
    
            return () => {
                document.removeEventListener('click', handleClick);
            };
        }, []);
     */
    return (
        <>
            <button className="" title="Send Prompt to Front of Card" onClick={() => setFrontText(userPrompt)}>
                <FontAwesomeIcon
                    className='faPlus-icon send-gpt-prompt-button'
                    icon={faArrowUp}
                />
            </button>
            <button className="" title="Send Response to Back of Card" onClick={() => setBackText(botResponse)}>
                <FontAwesomeIcon
                    className='faPlus-icon send-gpt-prompt-button'
                    icon={faArrowUp}
                />
            </button>
        </>
    );
}

export default GptBotTextControls;
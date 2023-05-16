import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import CardType from '../types/CardType';
import { getAllCardsForDeck, getAllCards } from '../services/cardAPI';

type CardContextType = {
    cardsForDeck: CardType[];
    setCardsForDeck: React.Dispatch<React.SetStateAction<CardType[]>>;
    allCards: CardType[];
    setAllCards: React.Dispatch<React.SetStateAction<CardType[]>>;
    addCard: (newCard: CardType) => Promise<void>;
    userPrompt: string;
    setUserPrompt: React.Dispatch<React.SetStateAction<string>>;
    botResponse: string;
    setBotResponse: React.Dispatch<React.SetStateAction<string>>;
    frontText: string;
    setFrontText: React.Dispatch<React.SetStateAction<string>>;
    backText: string;
    setBackText: React.Dispatch<React.SetStateAction<string>>;
};

export const CardListContext = createContext<CardContextType>({
    cardsForDeck: [],
    setCardsForDeck: () => { },
    allCards: [],
    setAllCards: () => { },
    addCard: async () => { },
    userPrompt: '',
    setUserPrompt: () => { },
    botResponse: '',
    setBotResponse: () => { },
    // front and back of cards in AddCardToDeck component
    frontText: '',
    setFrontText: () => { },
    backText: '',
    setBackText: () => { },
});

interface CardListProviderProps {
    children: ReactNode;
}

export function CardListProvider({ children }: CardListProviderProps) {
    const [cardsForDeck, setCardsForDeck] = useState<CardType[]>([]);
    const [allCards, setAllCards] = useState<CardType[]>([]);
    const [frontText, setFrontText] = useState<string>('');
    const [backText, setBackText] = useState<string>('');
    const [userPrompt, setUserPrompt] = useState<string>('');
    const [botResponse, setBotResponse] = useState<string>('');

    async function fetchCardsForDeck(deckName: string) {
        const response = await getAllCardsForDeck(deckName);
        setCardsForDeck(response);
    }

    async function addCard(newCard: CardType) {
        // Add the new card to the allCards array
        setAllCards((prevCards) => [...prevCards, newCard]);

        // Call fetchAllCards to update the list of cards
        await fetchAllCards();
    }

    async function fetchAllCards() {
        const response = await getAllCards();
        setAllCards(response);
    }
    useEffect(() => {
        fetchAllCards()
    }, [])

    return (
        <CardListContext.Provider value={{
            cardsForDeck,
            setCardsForDeck,
            allCards,
            setAllCards,
            addCard,
            userPrompt,
            setUserPrompt,
            botResponse,
            setBotResponse,
            frontText,
            setFrontText,
            backText,
            setBackText
        }}>
            {children}
        </CardListContext.Provider>
    );
}

export function useCardContext() {
    return useContext(CardListContext);
}

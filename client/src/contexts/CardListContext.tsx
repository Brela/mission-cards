import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import CardType from '../types/CardType';
import { getAllCardsForDeck, getAllCards } from '../services/cardAPI';

type CardContextType = {
    cardsForDeck: CardType[];
    setCardsForDeck: React.Dispatch<React.SetStateAction<CardType[]>>;
    allCards: CardType[];
    setAllCards: React.Dispatch<React.SetStateAction<CardType[]>>;
};

export const CardListContext = createContext<CardContextType>({
    cardsForDeck: [],
    setCardsForDeck: () => { },
    allCards: [],
    setAllCards: () => { },
});

interface CardListProviderProps {
    children: ReactNode;
}

export function CardListProvider({ children }: CardListProviderProps) {
    const [cardsForDeck, setCardsForDeck] = useState<CardType[]>([]);
    const [allCards, setAllCards] = useState<CardType[]>([]);

    async function fetchCardsForDeck(deckName: string) {
        const response = await getAllCardsForDeck(deckName);
        setCardsForDeck(response);
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
            setAllCards
        }}>
            {children}
        </CardListContext.Provider>
    );
}

export function useCardContext() {
    return useContext(CardListContext);
}

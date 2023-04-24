import { createContext, useContext } from 'react';
import CardType from '../types/CardType';

type CardContextType = {
    cards: CardType[];
    setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
};

// the parent component (pages/AddCards) contains the context
export const CardListContext = createContext<CardContextType>({
    cards: [],
    setCards: () => { },
});

// the CardList component uses the 'useCardContext' function to get the current state fo the cards
export function useCardContext() {
    return useContext(CardListContext);
}

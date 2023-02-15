import { useState, useEffect } from 'react';
import DeckType from '../../interfaces'
import './App.css'

let deckList: DeckType[] = [];

function App() {
  // `title` is the current state value
  // `setTitle` is the value used to update the state value
  // useState('') sets the initital state to an empty string
  const [decks, setDecks] = useState<DeckType[]>(deckList);
  const [deckName, setDeckName] = useState('');

  async function loadDecks() {
    // make another GET request to the server to get the updated list of decks
    const response = await fetch('http://localhost:5000/decks');
    const newDecks = await response.json();
    // update the state of the decks array with the new list of decks
    setDecks(newDecks);
  }


  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();

    // send a POST request to backend to create a new deck
    const response = await fetch('http://localhost:5000/decks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        deckName,
      }),
    });
    // update the decks
    loadDecks()
    // clear the input field
    setDeckName('');
  }

  async function handleDeleteDeck(deckId: String) {
    await fetch(`http://localhost:5000/decks/${deckId}`, {
      method: 'DELETE',
    });
    // update the decks
    loadDecks()
  }

  useEffect(() => {
    console.log(decks);
  }, [decks]);

  useEffect(() => {
    loadDecks();
  }, []);



  return (
    <div className="App">
      <div className='decksContainer'>
        {
          decks.map(deck => (
            <li key={deck._id}>
              <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
              {deck.deckName}</li>
          ))
        }
      </div>
      <form onSubmit={handleCreateDeck} >
        <label htmlFor="deck-title">Add Title</label>
        <input id="deck-title"
          value={deckName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDeckName(e.target.value)
          }}
        />
        <button>Create Deck</button>
      </form>
    </div>
  )
}

export default App

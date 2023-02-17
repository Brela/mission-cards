import './styles/header.css'
import './styles/decksColHeadings.css'
import './styles/decks.css'
import './styles/popups/deckMorePopup.css'
import './styles/popups/homeToolbarPopup.css'
import './styles/decksToolbar.css'
import './styles/footer.css'
import Header from './components/Header';
import ColumnHeadings from './components/home/DecksColHeading'
import DeckList from './components/home/DeckListHome';
import DecksToolbar from './components/home/DecksHomeToolbar';
import Footer from './components/Footer';


function App() {

  return (
    <div className="App">
      <Header />
      <ColumnHeadings />
      <DeckList />
      <DecksToolbar />
      <Footer />
    </div>
  )
}

export default App
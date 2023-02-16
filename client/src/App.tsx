import './styles/layout.css'
import './styles/decks.css'
import './styles/morePopup.css'
import './styles/row1.css'
import './styles/row3.css'
import Footer from './components/Footer';
import Header from './components/Header';
import DeckList from './components/DeckListTemp';
import Row1 from './components/row1'
import Row3_w_popups from './components/row3';


function App() {

  return (
    <div className="App">
      <Header />
      <Row1 />
      <DeckList />
      <Row3_w_popups />
      <Footer />
    </div>
  )
}

export default App
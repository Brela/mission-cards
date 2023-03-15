import '../styles/header.css'
import '../styles/footer.css'

import '../styles/home/decksColHeadings.css'
import '../styles/home/decksToolbar.css'
import '../styles/home/deckList.css'

import '../styles/popups/deckMorePopup.css'
import '../styles/popups/homeToolbarPopup.css'

import Header from '../components/Header';
import ColumnHeadings from '../components/home/DecksColHeading'
import DecksContainer from '../components/home/DecksConatiner';
import DecksToolbar from '../components/home/DecksHomeToolbar';
import Footer from '../components/Footer';


function Home() {

  return (
    <div className="home-page">
      <Header />
      <ColumnHeadings />
      <DecksContainer />
      <DecksToolbar />
      <Footer />
    </div>
  )
}

export default Home
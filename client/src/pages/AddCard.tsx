import '../styles/header.css'
import '../styles/footer.css'

import '../styles/addCard/addCardFrontBack.css'

import Header from '../components/Header';
import AddCardContainer from '../components/addCard/AddCardContainer'
import DisplayCardsForDeck from '../components/addCard/DisplayCardsContainer'
import Footer from '../components/Footer';

function AddCard() {

    return (
        <div className="add-card-page">
            <Header />
            <div className='align-containers'>
                <AddCardContainer />
                <DisplayCardsForDeck />
            </div>
            <Footer />
        </div>
    )
}

export default AddCard
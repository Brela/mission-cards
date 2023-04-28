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
import ErrorAlert from '../components/popups/ErrorAlert';
import Footer from '../components/Footer';

import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

type Props = {
};

function Home() {
  const { isAuthenticated, user, } = useContext(UserContext);


  /* 
    useEffect(() => {
      console.log("isAuthenticated ", isAuthenticated)
      console.log("user ", user)
    }, [isAuthenticated, user]); */


  return (
    <div className="home-page">
      <Header />
      <ColumnHeadings />
      <DecksContainer />
      <DecksToolbar />
      <ErrorAlert />
      <Footer />
    </div>
  )
}

export default Home
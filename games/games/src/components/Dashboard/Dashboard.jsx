import React from "react";
import "./Dashboard.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

function Dashboardcard(props){
    return (
        <MDBCarousel showControls fade>
          <MDBCarouselItem
            className='test'
            itemId={1}
            src="https://store-images.s-microsoft.com/image/apps.31378.14440169033196048.33ec04e1-f2d4-46ed-a05b-03b332738f93.8032cfe7-683a-4be1-8b4c-9da7dc14c2b3?q=90&w=1293&h=571"
            alt='...'
            
          >
            <h5>Hangman</h5>
            <p>Can you guess what's the word we were thinking of? Try it out!</p>
          </MDBCarouselItem>
    
          <MDBCarouselItem
            className='test d-block'
            itemId={2}
            src='https://m.media-amazon.com/images/I/71XB4z0uO3L._AC_UF894,1000_QL80_.jpg'
            alt='...'
          >
            <h5>Memory Card Game</h5>
            <p>You have the memory of a genius? Let's test it out!</p>
          </MDBCarouselItem>
    
          <MDBCarouselItem
            className='test'
            itemId={3}
            src='https://t3.ftcdn.net/jpg/03/45/97/36/360_F_345973621_sMifpCogXNoIDjmXlbLwx1QZA5ZmQVl8.jpg'
            alt='...'
          >
            <h5>Quiz</h5>
            <p>Test your knowledge!</p>
          </MDBCarouselItem>
        </MDBCarousel>
      );
}

export default Dashboardcard;
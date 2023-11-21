import React, {useState} from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
  Navigate,
  useNavigate,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {loggedIn} from "../Auth/Login";

function Navbar({handleLoginClick}){
 const navigate = useNavigate();

 const navigateLogin = () => {
  navigate("/login");
  };

 const navigatetoRegister = () => {
  navigate("/register");
 }

 const handleLogOut = () => {
  window.localStorage.clear();
  window.location.reload();
 }

 const handleEventHangman = () => {
  if(loggedIn === 1){
    navigate("/hangman");
  } else{
    alert("You need to be logged in!");
  }
 }
 const handleEventMemory = () => {
  if(loggedIn === 1){
    navigate("/memo");
  } else{
    alert("You need to be logged in!");
  }
 }
 const handleEventQuiz = () => {
  if(loggedIn === 1){
    navigate("/quiz");
  } else{
    alert("You need to be logged in!");
  }
 }


  
    return(
            <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
          
          <div className="container">
            
            <a className="navbar-brand me-2" href="https://mdbgo.com/">
              <img
                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                height="16"
                alt="MDB Logo"
                loading="lazy"
                
              />
            </a>
        
            
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarButtonsExample"
              aria-controls="navbarButtonsExample"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>
        
           
            <div className="collapse navbar-collapse" id="navbarButtonsExample">
              
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/"><button type="button" className="btn btn-primary me-3">Dashboard</button></Link>
                </li>
              </ul>
              
        
              <div class="d-flex align-items-center">
                {loggedIn === 0 ? <><button type="button" className="btn btn-link px-3 me-2" onClick={navigateLogin}>
                Login
                </button></> : <button type="button" className="btn btn-link px-3 me-2" onClick={handleLogOut}>
                Log out
                </button>}
                {loggedIn === 0 ? <button type="button" className="btn btn-primary me-3" onClick={navigatetoRegister}>
                Sign up
                </button> : null}
                {loggedIn === 1 ? 
                <><Link to="/profile"><button type="button" className="btn btn-primary me-3">Profile</button></Link></> : null}
                {loggedIn === 1 ? 
                <><Link to="/lead"><button type="button" className="btn btn-primary me-3">Leaderboard</button></Link></> : null}
                </div>
                
            </div>
            <div class="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Games
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
              {/*<Link to="/hangman" className="dropdown-item" onClick={handleEvent}>Hangman</Link>*/}
              <button className="dropdown-item" onClick={handleEventHangman}>Hangman</button>
              <button className="dropdown-item" onClick={handleEventMemory}>Memory Card</button>
              <button className="dropdown-item" onClick={handleEventQuiz}>Quiz</button>
              {/*<Link to="/memo" className="dropdown-item">Memory Card Game</Link>
                <Link to ="/quiz" className="dropdown-item">Quiz</Link>*/}
              </div>
            
            
          </div>
            
          </div>
          
        </nav>
            </>
  )
    
}

export default Navbar;
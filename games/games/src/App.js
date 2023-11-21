import logo from './logo.svg';
import './App.css';
import Navbar from './components/Nav/navbar';
import Registration from './components/Auth/Registration';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Hangman from './components/Games/Hangman/Hangman';
import MemoryCard from './components/Games/MemoryGame/MemoryCard';
import Profile from './components/Profile/Profile';
import {Login} from './components/Auth/Login';
import Quiz from './components/Games/Quiz/Quiz.jsx';
import Leaderboard from './components/Leaderboard/LeaderBoard.jsx';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={
    <>
    <Navbar/>
    <Dashboard/>
    </>} />
    <Route path="/login" element={
      <>
      <Navbar/>
      <Login/>
      </>
    }/>
    <Route path="/register" element={
      <>
      <Navbar/>
      <Registration/>
      </>
    } />
    <Route path="/hangman" element={
      <>
      <Navbar/>
      <Hangman/>
      </>
    } />
    <Route path="/memo" element={
      <>
      <Navbar/>
      <MemoryCard/>
      </>
    }/>
    <Route path="/profile" element={
      <>
      <Navbar/>
      <Profile/>
      </>
    }/>
    
    <Route path="/quiz" element={
      <>
      <Navbar/>
      <Quiz/>
      </>
    }/>
    <Route path="/lead" element={
      <>
      <Navbar/>
      <Leaderboard/>
      </>
    }/>
    </Routes>
    </BrowserRouter>
    
  
    
  );
}

export default App;

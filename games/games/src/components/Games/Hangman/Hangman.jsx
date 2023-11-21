import React, {Component, useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import "./Hangman.css"
import randomWord from "./words";

import img0 from "./img/img0.png";
import img1 from "./img/img1.png";
import img2 from "./img/img2.png";
import img3 from "./img/img3.png";
import img4 from "./img/img4.png";
import img5 from "./img/img5.png";
import img6 from "./img/img6.png";

let newScore = 0;
class Hangman extends Component {
    componentDidMount(){
        fetch('http://localhost:5000/userProfile', {
            method: "post",
            body: JSON.stringify({ token: window.localStorage.getItem("token") }),
            headers: {
                'Content-Type': 'application/json'
            },
        })

    .then((res) => res.json())
    .then((data) => {
        this.setState({score: data.data.score, email: data.data.email});
    })
    }
    static defaultProps = {
        maxWrong: 6,
        images: [img0, img1, img2, img3, img4, img5, img6]
    }
    state = { nWrong: 0, answer: randomWord(), guessed: new Set(), group: 'colors', score: newScore} 

    
    reset = () =>
    this.setState(prevState => ({
        nWrong: 0,
        guessed: new Set(),
        answer: randomWord(),
        group: 'colors',
        score: newScore
        
    }))

    resetScore = () =>
    this.setState(ps =>({
        score: ps.newScore
    }))

    
    guessedWord = () => {
        return this.state.answer.split('').map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"))
    }

    handleGuess = (e) =>{
        let ltr = e.target.value
        this.setState(ps => ({
            guessed: ps.guessed.add(ltr),
            nWrong: ps.nWrong + (ps.answer.includes(ltr) ? 0 : 1)
        }))
    }

    generateLetters = () => {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
            <button
                key={ltr}
                value={ltr}
                onClick={this.handleGuess}
                disabled={this.state.guessed.has(ltr)}
        >
                {ltr}
            </button>
        ))
    }

    handleChange = (e) => {
        const {value, name} = e.target
        this.setState({
            [name]:value,
            answer: randomWord(value),
            nWrong: 0,
            guessed: new Set(),
            
        })
    }

    updateScore = (newScore) => {
        fetch('http://localhost:5000/updateScore', {
            method: "post",
            body: JSON.stringify({ email: this.state.email, score: newScore }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }
    


    render() { 
        let {nWrong, answer, group, score} = this.state
        const {maxWrong, images} = this.props
        let isWinner = this.guessedWord().join("") === answer
        let gameOver = nWrong >= maxWrong;
        let gameState = this.generateLetters();
        let alt = `${nWrong}/${maxWrong} guesses`
        if(isWinner){
            gameState = 'You won!';
            newScore = score + 50;
            this.updateScore(newScore);
        } 
        if(gameOver) gameState = 'Unfortunately, you lost!'
        return (
            <div className="Hangman">
                <h1 className="Hangman-title">Hangman {group}</h1>
                <div className="Hangman-flex">
                    <div className="Hangman-counter">
                        <img src={images[nWrong]} alt={alt} />
                        <p>Guessed Wrong: {nWrong}</p>
                        <p>Score: {score}</p>
                    </div>
                    <div>
                        <p className="Hangman-word">{gameOver ? answer : this.guessedWord()}</p>
                        <div className="btns">{gameState}</div>
                    </div>
                    <div className="Hangman-reset">
                        
                    <button id="reset" onClick={this.reset}>Restart?</button>
                        <form>
                            <label htmlFor="group">Guess About: </label>
                            <select name="group" id="group" value={group} onChange={this.handleChange}>
                                <option value="colors" >Colors</option>
                                <option value="countries">Countries</option>
                                <option value="animals">Animals</option>
                            </select>
                        </form>
                    </div>
                </div>
                
                
                
                
                
            </div>
        );
    }
}
 
export default Hangman;
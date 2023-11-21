import React, {useState, useEffect} from "react";
import cardImages from "./cards";
import "./MemoryCard.css";
import Card from "./Card";
import { useLocation } from "react-router-dom";


function MemoryCard(){
    let hide = 0;
    const location = useLocation();
    const [card, setCard] = useState([]);
    const [turns, setTurns] = useState(0);
    let [score, setScore] = useState();
    const [choiceOne, setChoiseOne] = useState(null);
    const [choiceSecond, setChoiseSecond] = useState(null);
    const [email, setEmail] = useState("");
    const shuffleCards = () => {
        const shuffledCards = [...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({...card, id: Math.random()}))

        setCard(shuffledCards)
        setTurns(0)
        //initializeScore();
        
    };

    const handleChoice = (card) => {
        choiceOne ? setChoiseSecond(card) : setChoiseOne(card)
    }

    useEffect(() => {
        fetch('http://localhost:5000/userProfile', {
            method: "post",
            body: JSON.stringify({ token: window.localStorage.getItem("token") }),
            headers: {
                'Content-Type': 'application/json'
            },
        })

    .then((res) => res.json())
    .then((data) => {
        setScore(data.data.score);
        setEmail(data.data.email);
        console.log();
        console.log(data);
    })
    }, [])

    

    const updateScore = () =>{
        const token = window.localStorage.getItem("token")
        fetch('http://localhost:5000/updateScore', {
            method: "post",
            body: JSON.stringify({ email: email, score: score }),
            headers: {
                'Content-Type': 'application/json'
            },
        }); console.log(token)
    }

    const updateScorewith50 = () =>{
        setScore(score += 50)}


    useEffect(() => {
        if(choiceOne && choiceSecond){
            if(choiceOne.alt === choiceSecond.alt){
                setCard(prevCards => {
                    return prevCards.map(card => {
                        if(card.alt === choiceOne.alt){
                            return {...card, matched:true}
                        }
                        else{
                            return card
                        }
                    })
                })
                updateScorewith50();
                updateScore();
                resetTurn()
            }
            else{
                
                setTimeout(() => resetTurn(), 500);
            }
        }
    }, [choiceOne, choiceSecond])


    const resetTurn = () => {
        setChoiseOne(null)
        setChoiseSecond(null)
        setTurns(prevTurns => prevTurns + 1)
    }

    return(
        <div className="backg">
            <h1 className="titlem">Memory Card Game</h1>
            <div><button className="newGameButton" onClick={shuffleCards}>New Game</button></div>
            
            <div>
                <p className="scoreM">Score: {score}</p>
                {hide === 1 ? <p>{email}</p> : null}
            </div>
            <div className="card-grid">
                {card.map(card => (
                    <Card key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceSecond || card.matched}></Card>
                ))}
            </div>
        </div>
            
    );
    
    
}

export default MemoryCard;

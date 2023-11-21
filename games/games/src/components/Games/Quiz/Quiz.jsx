import React, {useState, useEffect} from "react";
import "./Quiz.css";
import questions from "./question";

function Quiz(){

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
    let hide = 0;
    const [results, setResults] = useState(false);
    const [score, setScore] = useState();
    const [currentQuest, setCurrentQuest] = useState(0); 
    const [email, setEmail] = useState("");
    const [correctAns, setCorrectAns] = useState(0);

    const optionClicked = (correct) => {
        console.log(correct);
        if(correct)
        {   
            setCorrectAns(correctAns + 1);
            setScore(score + 50);
            updateScore();
        }

        if(currentQuest + 1 < questions.length){
            setCurrentQuest(currentQuest + 1);
        }
        else{
            setResults(true);
        }

        
    }

    const restartGame = () => {
        setCorrectAns(0);
        setCurrentQuest(0);
        setResults(false);
    }
    

    

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

    
    return(
    <>
    <div className="backgQ">
     <h1 className="titlem">Quiz</h1>
     <h2 className="scoreQ">Score: {score}</h2>
     {hide === 1? {email} : null}
     {!results ? 
        <><div className="question-text">
            <h2>{questions[currentQuest].quest}</h2>
        </div>
        <div>
            <ul>
                <li className="options">{questions[currentQuest].options.map((option) => {
                    return (
                        <li className="options" key={option.id} onClick={() => optionClicked(option.correct)}>{option.text}</li>
                    )
                })}</li>
            </ul>
        </div></>:
        <div className="result">
            <h1>Final result</h1> {/* ez a div lesz az, amit a végén jelenítünk meg*/
            <h2>{correctAns} out of {currentQuest + 1} correct - {(correctAns/questions.length)*100}%</h2>}
            <h2><button onClick={restartGame} className="quizb">Restart Game</button></h2>
        </div>

    }
    </div>       
    </>
       
    )
}

export default Quiz;
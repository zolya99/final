import React from "react";

function Card({card, handleChoice, flipped}){

    const handleClick = () =>{
        handleChoice(card)
    }

    return(
        <div className = "card">
            <div className={flipped ? "flipped" : "image"}>
                        <div>
                            <img className="front" src={card.src} alt='card front' width={card.width} height={card.height}/>
                            <img className="back" src={require("./img/Cover.png")} alt='card back' width={card.width} height={card.height} onClick={handleClick}/>
                        </div>
                        </div>
                    </div>
    )
}

export default Card;
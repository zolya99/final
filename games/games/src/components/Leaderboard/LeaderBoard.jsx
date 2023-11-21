import React, {useState, useEffect} from "react";
import "./LeaderBoard.css";

function Leaderboard(){

    const [data, setData] = useState([]);
    
    useEffect(() => {
        // Fetch API használata a szerverről való adatlekéréshez
        fetch('http://localhost:5000/getCurrentPoint')
          .then(response => response.json())
          .then(data => {
            const sortedData = data.data.sort((a, b) => b.score - a.score);
            setData(sortedData); // Beállítjuk az adatokat az állapotban
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);
        

      return (
        <div className="leaderboard-container">
          <h2>Leaderboard</h2>
          <ul className="leaderboard-list">
            {data.map((item, index) => (
              <li key={item._id} className="leaderboard-item">
                <span className="position">{index + 1}</span>
                <div className="user-info">
                  <span className="email">{item.email}</span>
                  <span className="score">{item.score}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );

        }

export default Leaderboard;
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';

 


function Profile(){
    const [userProfile, setUserProfile] = useState("");
    const [score, setScore] = useState();
    const [username, setUserName] = useState("");
    useEffect( () => {
        
        const fetchData = async () => {
            try {
                let result = await fetch(
                    'http://localhost:5000/userProfile', {
                        method: "post",
                        body: JSON.stringify({ token: window.localStorage.getItem("token") }),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
    
                .then((res) => res.json())
                .then((data) => {
                    setUserProfile(data.data.email);
                    setScore(data.data.score);
                    setUserName(data.data.username);
                })
    
                // A kód további részei, amelyek lefutnak a sikeres kérés esetén
            } catch (error) {
                // Hiba kezelése
                console.error('An error occurred during fetch:', error);
            }
        };
    
        fetchData();
    }, []);

    return (
        /*<>
            <div className="container">
                <p className="userInfo" id="userInfo1">
                    Name: {userProfile}</p>
                <p className="userInfo" id="userInfo2">
                    Given Name: Teszt Elek</p>
                <p className="userInfo" id="userInfo3">
                    Family Name: Teszt</p>
                <p className="userInfo" id="userInfo4">
                    Email: teszelek@gmail.com</p>
                <p className="userInfo" id="userInfo5">
                    Sub: None</p>
            </div>
        </>*/
        <div className="vh-100" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: '180px', borderRadius: '10px' }}
                      src='https://www.creativefabrica.com/wp-content/uploads/2020/10/27/Animal-Logo-Graphics-6314054-1-580x386.jpg'
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>{username}</MDBCardTitle>
                    <MDBCardText>{userProfile}</MDBCardText>

                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: '#efefef' }}>
                      
                      <div className="px-3">
                        <p className="small text-muted mb-1">Score</p>
                        <p className="mb-0">{score}</p>
                      </div>
                      
                    </div>
                    
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
    )
}
    

 
export default Profile;
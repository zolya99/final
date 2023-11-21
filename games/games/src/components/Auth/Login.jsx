import React, {useState} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

let loggedIn = 0;

function Login(props){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const handleOnSubmit = async (e) => {

		let result = await fetch(
		'http://localhost:5000/login', {
			method: "post",
			body: JSON.stringify({email, password}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		result = await result.json();
        
		console.warn(result);
		if (result) {
			window.localStorage.setItem("token", result.email);
			
    
            loggedIn = 1;
            navigate("/");
		}
	}


    return(
        <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
    
          <MDBRow>
    
            <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
    
              
               
                <h1><span style={{color: 'hsl(218, 81%, 75%)'}}>EnglishWonders</span></h1>
              
    
              <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
              </p>
    
            </MDBCol>
    
            <MDBCol md='6' className='position-relative'>
    
              <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
    
              <MDBCard className='my-5 bg-glass'>
                <MDBCardBody className='p-5'>
    
                  <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' name="email" value={props.email} onChange={(e)=> {
                        setEmail(e.target.value)}}/>
                  <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' name="pw" value={props.password} onChange={(e)=> {
                        setPassword(e.target.value)}}/>
    
                  <div className='d-flex justify-content-center mb-4'>
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                  </div>
    
                  <MDBBtn className='w-100 mb-4' size='md' id='button' onClick={handleOnSubmit}>Sign in</MDBBtn>
    
                  <div className="text-center">
    
                    <p>or sign up with:</p>
    
                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                      <MDBIcon fab icon='facebook-f' size="sm"/>
                    </MDBBtn>
    
                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                      <MDBIcon fab icon='twitter' size="sm"/>
                    </MDBBtn>
    
                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                      <MDBIcon fab icon='google' size="sm"/>
                    </MDBBtn>
    
                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                      <MDBIcon fab icon='github' size="sm"/>
                    </MDBBtn>
    
                  </div>
    
                </MDBCardBody>
              </MDBCard>
    
            </MDBCol>
    
          </MDBRow>
    
        </MDBContainer>
        



    )
}
export {Login, loggedIn};

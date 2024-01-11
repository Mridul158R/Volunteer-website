import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/Login.css"
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,

}
from 'mdb-react-ui-kit';

const Login = () => { 

  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({email:"",password:""})
    let history = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", 
            
            headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify({email: credentials.email, password: credentials.password }),
          });
          const json = await response.json();
       
          if(json.success){
            //save the authtoken and redirect
            localStorage.setItem('token', json.authtoken);
            history("/")
          }
          else{
            alert("invalid credentials ")
          }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
  return (

    <MDBContainer fluid className="p-3 my-5">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol col='4' md='6'>


          <MDBInput wrapperclassname='mb-4' label='email' id='email' name='email' value={credentials.email}type='email' onChange={onChange} size="lg"/>
          <MDBInput wrapperclassname='mb-4' label='password' id='password' name='password' value ={credentials.password}type='password'  onChange={onChange} size="lg"/>


          <div className="d-flex justify-content-between mx-4 mb-4">
            <div></div>
            <a onClick={(e) => {
                  e.preventDefault();
                  navigate('/signup');
                }} href="!#">Don't have an account ? Sign up</a>
          </div>

          <MDBBtn className="mb-4 w-100" size="lg" onClick={handleSubmit}>Sign in</MDBBtn>

          {/* <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div> */}

          {/* <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
            <MDBIcon fab icon="facebook-f" className="mx-2"/>
            Continue with facebook
          </MDBBtn>

          <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#55acee'}}>
            <MDBIcon fab icon="twitter" className="mx-2"/>
            Continue with twitter
          </MDBBtn> */}

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );

}

export default Login
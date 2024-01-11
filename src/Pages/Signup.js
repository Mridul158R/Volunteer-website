import React, { useState } from 'react';

import { useNavigate} from 'react-router-dom'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRow,
  MDBCol,
}
from 'mdb-react-ui-kit';
function App() {
  const navigate=useNavigate();
  const [credentials, setCredentials] = useState({name:"", email:"",password:"", cpassword: ""})

    let history = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
  
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST", 
            
            headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify({name: credentials.name ,email: credentials.email, password: credentials.password }),
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            //save the authtoken and redirect
            localStorage.setItem('token', json.authtoken)
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
    <MDBContainer fluid className='my-5'>

      <MDBRow className='g-0 align-items-center'>
        <MDBCol col='6'>

          <MDBCard className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
            <MDBCardBody className='p-5 shadow-5 text-center'>

              <h2 className="fw-bold mb-5">Sign up now</h2>

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='' id='name' value={credentials.name}onChange={onChange} name='name' type='text' placeholder='Name'/>
                </MDBCol>

                
              </MDBRow>

              <MDBInput wrapperClass='mb-4' label='' id='email' name='email' value={credentials.email} onChange={onChange} type='email' placeholder='Email'/>
              <MDBInput wrapperClass='mb-4' label='' id='password' name='password' value={credentials.password} onChange={onChange} type='password' placeholder='Password' required minLength={5}/>
              <MDBInput wrapperClass='mb-4' label='' id='cpassword' name='cpassword' value={credentials.cpassword} onChange={onChange} type='password' placeholder='Confirm Password' required minLength={5}/>

              <div className="d-flex justify-content-between mx-4 mb-4">
            {/* <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' /> */}
            <a onClick={(e) => {
                  e.preventDefault();
                  navigate('/login');
                }} href="/login">Already have an account ? Log in</a>
          </div>

              <MDBBtn className='w-100 mb-4' onClick={handleSubmit} size='md'>Sign Up</MDBBtn>

              <div className="text-center">

                {/* <p>or Sign Up With:</p>

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
                </MDBBtn> */}

              </div>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default App;
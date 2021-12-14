import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import "./signUp.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.min.css';
import error from './error.png';
import suc from './suc.png'
import Background from './Background.jpeg'
import 'bootstrap/dist/css/bootstrap.min.css';






export default function Login() {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  function validateForm() {
    return Username.length > 0 && password.length > 0;
  }
  function Authentic(element)
  {
    return  element.username === Username && element.password === password
  }
  function handleSubmit(event) {
    const user = {
      username : Username, password: password
      }
    event.preventDefault();
    console.log('LOGIN is been pressed');
    axios.post('http://localhost:5000/users/login',user)
      .then(response => {
        console.log(response);
        if(response.data === 'Success')
        {
          setMessage('You are Successfully logged in')
          console.log('message')
          // window.location  = '/myBookings'
        }
        else if(response.data === 'Wrong User')
        {
            setMessage('Incorrect username')
            console.log('Wrong User')
        }
        else if(response.data === 'Wrong Password')
        {
          setMessage('Incorrect Password')
          console.log('Wrong Password')
        }
      })
     
  }
  function getMessage()
  {
    if(message === 'You are Successfully logged in')
    {
      return (
        <div class = 'success'>
                          <div class="flex-container"> <img  src={suc} width="40" height="40" /> <h6 class = 'pass'>successfully logged in</h6></div>
        </div>
      )

    }
    else if(message === 'Incorrect Password')
    {
        return (
          <div class = 'password'>
                            <div class="flex-container"> <img  src={error} width="40" height="40" /> <h6 class = 'pass'>Password is wrong</h6></div>
          </div>
        )
    }
    else if(message === 'Incorrect username'){
      return (
        <div class = 'password'>
                          <div class="flex-container"> <img  src={error} width="40" height="40" /> <h6 class = 'pass'>Username is wrong</h6></div>
        </div>
      )
    }
    else
    {
      return (
        <div >
        </div>
      )
    }
  }
  var sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundImage: `url(${Background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh'
  };
  return (
    
   
<body>
    <div class="signup-form">
        <form  method="post">
            <h2>Register</h2>
            <div >
               
                <div class ='special' >
                    <div class="col ">
                        <input type="text" class="form-control " name="first_name" placeholder="First Name" maxlength="100" required="required" />
                    </div>
                    <div class="col ">
                        <input type="text" class="form-control" name="last_name" placeholder="Last Name"  maxlength="100" required="required"/>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" name="UserName:" placeholder="User Name:" required="required"/>
            </div>
            <div class="form-group">
                <input type="email" class="form-control" name="email" placeholder="Email" required="required"/>
            </div>
            
            <div class="form-group ">
                <input type="text" class="form-control " name="Passportnumber:" placeholder="Passport number:" required="required"/>
            </div>
            <div class="row ">
                <div class="col form-group">
                    <input type="password" class="form-control" name="password" placeholder="Password" required="required"/>
                </div>
                <div class="col form-group">
                    <input type="password" class="form-control" name="confirm_password" placeholder="Confirm Password" required="required"/>
                </div>
            </div>
            
            <div class="form-group">
                <label class="form-check-label">
                    <input type="checkbox" required="required"/> I accept the
                    <a href="#">Terms of Use</a> &amp;
                    <a href="#">Privacy Policy</a>
                </label>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-success btn-lg btn-block">Register Now</button>
            </div>
        </form>
        <div class="text-center">Already have an account?
            <a href="#">Sign in</a>
        </div>
    </div>
</body>
  );
}
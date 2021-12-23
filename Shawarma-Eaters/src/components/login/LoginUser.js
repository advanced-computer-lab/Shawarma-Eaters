import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import "./Login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.min.css';
import error from './error.png';
import suc from './suc.png'
import Background from './Background.jpeg'

import {Helmet} from 'react-helmet';






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
    // const headers = { 'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Origin' : '*' };
    axios.post('http://localhost:5000/users/login',user)
      .then(response => {
        console.log(response);
       localStorage.setItem("accessToken",response.data.accessToken);
        // localStorage.getItem("lastname");
        if(response.data === 'Wrong User')
        {
            setMessage('Incorrect username')
            console.log('Wrong User')
        }
        else if(response.data === 'Wrong Password')
        {
          setMessage('Incorrect Password')
          console.log('Wrong Password')
        }
        else
        {   
          setMessage('You are Successfully logged in')
          console.log('message')
          // window.location  = '/myBookings'
        
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
    
    <div className="Login">
     
          <Helmet>
                <style>{'body { background-color: #5dd9be }'}</style>
            </Helmet> 
      
      <Form className="LoginForm" onSubmit={handleSubmit}>
      {getMessage()}
        <Form.Group size="lg" controlId="Username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="Username"
            placeholder = "Enter Username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder = "Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
        </Form.Group>
        <div className = "register">
          Don't have account?         <a href="http://localhost:3000/createuser" >Register</a>
        </div>
        <div className = "loginAs">
            <a href="http://localhost:3000/login" >        Login as Admin</a>
        </div>
        
        <br></br>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
      
    </div>
  );
}
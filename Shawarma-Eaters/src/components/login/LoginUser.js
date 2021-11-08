import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import "./Login.css";

export default function Login() {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return Username.length > 0 && password.length > 0;
  }
  function Authentic(element)
  {
    return  element.username === Username && element.password === password
  }
  let error = '';
  function handleSubmit(event) {
    event.preventDefault();
    console.log('LOGIN is been pressed');
    // axios.get('http://localhost:5000/login/')
    //   .then(response => {
    //     console.log(response.data);
    //     const result = response.data.filter(Authentic);
    //     console.log(result);
    //     if (result.length > 0)
    //     {
    //       window.location  = '/home'
    //     }
    //     else
    //     {
    //       error = (<div className="ERROR Login" role = 'alert'>wrong user name or password</div>);

    //     }
        
    //   })
     
  }

  return (
    <div className="Login">

      <Form onSubmit={handleSubmit}>
      
      <Form.Label>{error}</Form.Label>
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
import React, { Component } from 'react';
import { ReactDOM } from 'react';
import { Prompt } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./login/signUp.css";
import {Helmet} from 'react-helmet';
import { Redirect } from 'react-router';


export default class CreateUser extends Component {
  
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassport = this.onChangePassport.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      username: '',
      firstname: '',
      lastname: '',
      email:'',
      passportnumber:'',
      password:'',

      users: []
    }
  }

    submit() {
      window.location('/login')
    const user = {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      passportnumber: this.state.passportnumber,
      password:this.state.password
      }
  
    console.log('user',user);
  
    axios.post('http://localhost:5000/guest/makeUser', user);
    <Redirect to='/login'  />
//  
  }
 
  // componentDidMount() {
  //   const user = {
  //     username: this.state.username,
  //     firstname: this.state.firstname,
  //     lastname: this.state.lastname,
  //     email: this.state.email,
  //     passportnumber: this.state.passportnumber,
  //     password:this.state.password
  //     }
  //   axios.post('http://localhost:5000/guest/createUser', user)
      

  // }
  onChangeUsername(e) {
   this.setState({
    username: e.target.value
   })
  }
  onChangeFirstname(e) {
    this.setState({
      firstname: e.target.value
    })
  }
  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value
    })
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  onChangePassport(e) {
    this.setState({
      passportnumber: e.target.value
    })
  }
  onChangePassword(e){
    this.setState({
      password:e.target.value
    })
  }
  
  render() {
    return (
  <div class="planebg">

      
      <div class="Forumdiv">
        <h3>Sign Up</h3>
        <form onSubmit={this.onSubmit}>

          <div  className="form-group"> 
            <label>User Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                /> 
                </div>
            
        
          <div className="form-group"> 
          <label> Firstname: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.firstname}
                onChange={this.onChangeFirstname}
                />
          </div>

          <div className="form-group">
          <label> Lastname: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.lastname}
                onChange={this.onChangeLastname}
                />
          </div>
          <div className="form-group"> 
            <label>Passportnumber: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.passportnumber}
                onChange={this.onChangePassport}
                />
          </div>
          
          <div className="form-group"> 
            <label>Email: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
          </div>
          
          <div className="form-group"> 
            <label>Password: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>
          
    <body>
    <div class="signup-form">
            <Helmet>
                <style>{'body { background-color: #5dd9be }'}</style>
            </Helmet> 
        <form  method="post">
            <h2>Register</h2>
            <div >
               
                <div class ='special' >
                    <div class="col ">
                        <input type="text" class="form-control " name="first_name" placeholder="First Name" maxlength="100" required="required" value={this.state.firstname} onChange={this.onChangeFirstname}/>
                    </div>
                    <div class="col ">
                        <input type="text" class="form-control" name="last_name" placeholder="Last Name"  maxlength="100" required="required"  value={this.state.lastname} onChange={this.onChangeLastname}/>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" name="UserName:" placeholder="User Name:" required="required"  value={this.state.username} onChange={this.onChangeUsername}/>
            </div>
            <div class="form-group">
                <input type="email" class="form-control" name="email" placeholder="Email" required="required" value={this.state.email} onChange={this.onChangeEmail}/>
            </div>
            
            <div class="form-group ">
                <input type="text" class="form-control " name="Passportnumber:" placeholder="Passport number:" required="required" value={this.state.passportnumber} onChange={this.onChangePassport}/>
            </div>
            <div class="row ">
                <div class="col form-group">
                    <input type="password" class="form-control" name="password" placeholder="Password" required="required"  value={this.state.password} onChange={this.onChangePassword}/>
                </div>
               
            </div>
            
            
            <div class="form-group">
                <button onClick={()=>   window.location='/login'} class="btn btn-success btn-lg btn-block">Register Now</button>
            </div>
        </form>
        <div class="text-center">Already have an account?
            <a href="http://localhost:3000/loginUser">Sign in</a>
        </div>
    </div>
</body>

          <div className="form-group">
            <input type="submit" value="Sign Up!" className="btn btn-primary" />
    
          </div>
          </form>
          
    </div>
    

  </div>
      
    
    )
  }
}
//
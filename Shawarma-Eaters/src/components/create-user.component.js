import React, { Component } from 'react';
import { ReactDOM } from 'react';
import { Prompt } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import {Helmet} from 'react-helmet';


export default class CreateUser extends Component {
  
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassport = this.onChangePassport.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

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
    const user = {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      passportnumber: this.state.passportnumber,
      password:this.state.password
      }
  
    console.log('user',user);
  
    axios.post('http://localhost:5000/guest/createUser', user)
      .then(res => console.log(res.data)).catch(error => console.log(console.log(error)));
  
    window.location = '/loginUser';
  }
 
  // componentDidMount() {
  //   axios.get('http://localhost:5000/users/')
  //     .then(response => {
  //       if (response.data.length > 0) {
  //         this.setState({
  //           users: response.data.map(user => user.username),
  //           username: response.data[0].username
  //         })
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })

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
  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      passportnumber: this.state.passportnumber,
      password:this.state.password
      }
  
    console.log(user);

    axios.post('http://localhost:5000/guest/createUser', user)
      .then(res => console.log(res.data));

  }
  render() {
    return (
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
                <div class="col form-group">
                    <input type="password" class="form-control" name="confirm_password" placeholder="Confirm Password" required="required"/>
                </div>
            </div>
            
            
            <div class="form-group">
                <button onClick={()=>this.submit()} class="btn btn-success btn-lg btn-block">Register Now</button>
            </div>
        </form>
        <div class="text-center">Already have an account?
            <a href="http://localhost:3000/loginUser">Sign in</a>
        </div>
    </div>
</body>

  
      
    
    )
  }
}
//
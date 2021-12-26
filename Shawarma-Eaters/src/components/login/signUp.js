import React, { Component } from 'react';
import { ReactDOM } from 'react';
import { Prompt } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./signUp.css";
import {Helmet} from 'react-helmet';
import { Redirect } from 'react-router';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const regExp = RegExp(
  /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
)
const formValid = ({ isError, ...rest }) => {
  let isValid = false;

  Object.values(isError).forEach(val => {
      if (val.length > 0) {
          isValid = false
      } else {
          isValid = true
      }
  });

  Object.values(rest).forEach(val => {
      if (val === null) {
          isValid = false
      } else {
          isValid = true
      }
  });

  return isValid;
};

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
      isError: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passport: ''
    },

      users: []
    }
  }
  

    submit() {
  
      console.log('in submit')
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
    window.location ='/';
    
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
    const  value = e.target;

    this.setState({
      firstname: e.target.value
    })
    let isError = { ...this.state.isError };

    isError.name = value.length < 4 ? "Atleast 4 characaters required" : "";
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
  onSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
        console.log(this.state)
        console.log('in submit')
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
      
    } else {
        console.log("Form is invalid!");
    }
};
formValChange = e => {
  e.preventDefault();
  const { name, value } = e.target;
  let isError = { ...this.state.isError };

  switch (name) {
      case "UserName":
          isError.name = value.length < 4 ? "Atleast 4 characaters required" : "";
          this.setState({username:e.target.value})
          
          break;
      case "first_name":
          isError.firstname = value.length < 4 ? "Atleast 4 characaters required" : "";
          this.setState({firstname:e.target.value})

          break;
      case "last_name":
        isError.lastname = value.length < 4 ? "Atleast 4 characaters required" : "";
        this.setState({lastname:e.target.value})

        break;
      case "email":
          isError.email = regExp.test(value)? "" : "Email address is invalid";
          this.setState({email:e.target.value})
          break;
      case "Passportnumber":
        isError.passport = value.length < 6 ? "Atleast 6 characaters required" : "";
        this.setState({passportnumber:e.target.value})
        break;
      case "password":
          isError.password = value.length < 6 ? "Atleast 6 characaters required" : "";
          this.setState({password:e.target.value})
          break;
      default:
          break;
  }

    this.setState({
        isError,
        [name]: value
    })
  };


  
  render() {
    const { isError } = this.state;
    return (
    <body>
    <div class="signup-form">
            <Helmet>
                <style>{'body { background-color: #5dd9be }'}</style>
            </Helmet> 
        <form onSubmit={this.onSubmit} noValidate >
            <h2>Register</h2>
            <div >
                
                <div class ='special' >
                    <div class="col ">
                        <input type="text"  className={isError.firstname.length > 0 ? "is-invalid form-control" : "form-control"} name="first_name" placeholder="First Name" maxlength="100" required="required" value={this.state.firstname} onChange={this.formValChange}/>
                    </div>
                    <div class="col ">
                        <input type="text"className={isError.lastname.length > 0 ? "is-invalid form-control" : "form-control"}  name="last_name" placeholder="Last Name"  maxlength="100" required="required"  value={this.state.lastname} onChange={this.formValChange}/>
                    </div>
                    {isError.firstname.length > 0 && (
                        <span className="invalid-feedback">{isError.firstname}</span>
                    )}
                </div>
            </div>
            <div class="form-group">
                <input type="text" className={isError.username.length > 0 ? "is-invalid form-control" : "form-control"}  name="UserName" placeholder="User Name:" required="required"  value={this.state.username} onChange={this.formValChange}/>
                {isError.username.length > 0 && (
                        <span className="invalid-feedback">{isError.username}</span>
                    )}
            </div>
            <br/>
            <div class="form-group">
                <input type="email" className={isError.email.length > 0 ? "is-invalid form-control" : "form-control"}  name="email" placeholder="Email" required="required" value={this.state.email} onChange={this.formValChange}/>
                {isError.email.length > 0 && (
                        <span className="invalid-feedback">{isError.email}</span>
                    )}
            </div>
            <br/>

            <div class="form-group ">
                <input type="text" className={isError.passport.length > 0 ? "is-invalid form-control" : "form-control"}  name="Passportnumber" placeholder="Passport number:" required="required" value={this.state.passportnumber} onChange={this.formValChange}/>
                {isError.passport.length > 0 && (
                        <span className="invalid-feedback">{isError.passport}</span>
                    )}
            </div>
            <div class="row ">
                <div class="col form-group">
                    <input type="password" className={isError.password.length > 0 ? "is-invalid form-control" : "form-control"}  name="password" placeholder="Password" required="required"  value={this.state.password} onChange={this.formValChange}/>
                    {isError.password.length > 0 && (
                        <span className="invalid-feedback">{isError.password}</span>
                    )}
                </div>
               
            </div>
            
            <div className="form-group">
          <input  onClick={()=>this.submit()} value="Register Now" className="btn btn-success btn-lg btn-block" />
  
           </div>
           <button type="submit" className="btn btn-block btn-danger">Create User</button>

            {/* <div class="form-group">
                <button  class="btn btn-success btn-lg btn-block">Register Now</button>
            </div> */}
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
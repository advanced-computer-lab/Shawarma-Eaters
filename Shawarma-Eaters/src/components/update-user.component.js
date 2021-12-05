import React, { Component } from 'react';
import axios from 'axios';

export default class EditUser extends Component {
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
    componentDidMount() {
        axios.get('http://localhost:5000/user/'+this.props.match.params.id)
          .then(response => {
            this.setState({
              username : response.data.username,
              firstname : response.data.firstname,
              lastname : response.data.lastname,
              email : response.data.email,
              passportnumber : response.data.passportnumber,
              password : response.data.password
            })   
          })
          .catch(function (error) {
            console.log(error);
          })
    
        
      }
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

    axios.post('http://localhost:5000/user/update/' + this.props.match.params.id, user)
      .then(res => console.log(res.data));

    window.location = '/';
    alert("User updated");
  }
  render() {
    return (
    <div class="Forumdiv">
      <h3>Update User Information</h3>
      <form onSubmit={this.onSubmit}>

        <div className="form-group"> 
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
        

        <div className="form-group">
          <input type="submit" value="Submit your updated information" className="btn btn-primary" />
  
        </div>
        </form>
        
  </div>

    )
  }
}  
import React, { Component } from 'react';
import { ReactDOM } from 'react';
import { Prompt ,Redirect,useLocation,BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./search.css";

import MasterForm from './MasterForm.js';
import DepFlights from './DepFlights.js';
// Departure Airport, Arrival Airport, Departure Date, Arrival Date, Adults, Children, Cabin class
let data=[];
let flag1=false;
let flag2=false;
export default class SearchPage extends Component {
   constructor(props) {
      super(props);
      
      
      this.onChangeDepAirport = this.onChangeDepAirport.bind(this);
      this.onChangeArrAirport = this.onChangeArrAirport.bind(this);
      this.onChangeDepDate = this.onChangeDepDate.bind(this);
      this.onChangeArrDate = this.onChangeArrDate.bind(this);
      this.onChangeAdults = this.onChangeAdults.bind(this);
      this.onChangeChildren = this.onChangeChildren.bind(this);
      this.onChangeCabinClass = this.onChangeCabinClass.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      



        this.state = {
            departureAirport: '',
            arrivalAirport: '',
            departureDate:new Date(),
            arrivalDate:new Date(),
            adults: 0,
            children:0,
            cabinclass:'',
            redirectToMasterForm:false,
            depSearch:{},
            retSearch:{},
            allFlights:[]
        }
        
    }


    componentDidMount() {
      axios.get('http://localhost:5000/flights/')
      .then(response => {
        this.setState({ allFlights: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

//window.localStorage.clear();
    }


     onChangeDepAirport(e) {
      this.setState({
        departureAirport: e.target.value
      })
     }
   
     onChangeArrAirport(e) {
       this.setState({
        arrivalAirport: e.target.value
       })
     }
   
     onChangeDepDate(date) {
       this.setState({
        departureDate: date
       })
     }
   
     onChangeArrDate(date) {
       this.setState({
        arrivalDate: date
       })
     }
   
   
     onChangeAdults(e) {
       this.setState({
        adults: e.target.value
       })
     }
   
     onChangeChildren(e) {
       this.setState({
        children: e.target.value
       })
     }
   
     onChangeCabinClass(e){
       this.setState({
        cabinclass:e.target.value
       })
     }
    

onSubmit(e) { 
  console.log('in oSubmit');

const Dep_search = {
  departureAirport : this.state.departureAirport,
  arrivalAirport : this.state.arrivalAirport,
  departureDate : this.state.departureDate,
  arrivalDate : this.state.arrivalDate,
  adults : this.state.adults,
  children : this.state.children,
  cabinclass : this.state.cabinclass
}
this.setState({
  depSearch: Dep_search
 })


const Return_search = {
  departureAirport :   this.state.arrivalAirport,
  arrivalAirport :this.state.departureAirport ,
  departureDate : this.state.departureDate,
  arrivalDate : this.state.arrivalDate,
  adults : this.state.adults,
  children : this.state.children,
  cabinclass : this.state.cabinclass
}
this.setState({
  retSearch: Return_search
 })

this.setState({
  redirectToMasterForm:true
});
//   e.preventDefault();
//  alert('YOU DID IT YOU SEARCHED!!!!!' );

}

     render() {
      const redirectToMasterForm = this.state.redirectToMasterForm;
      if (redirectToMasterForm) {
      //   console.log("depSearch:");
      //   console.log(this.state.depSearch);
      //   console.log("retSearch:");
      // console.log(this.state.retSearch);
        //window.localStorage.clear();
        return (  
           <Redirect
           to={{
           pathname: "/DepFlights",
           state: { 
             depSearch: this.state.depSearch,
             retSearch: this.state.retSearch
                   }
           }}
           />

        
        )
      }
     
      
      return (
        
      <div class="IMGdiv">
        <div class="searchForum">
        <h1>Search</h1>
        <form onSubmit={this.onSubmit}>
  
          <div class="depAirdiv" className="form-group"> 
            <label>Departure Airport: </label>
            <input  class="depAirdiv" type="text"
                required
                className="form-control"
                value={this.state.departureAirport}
                onChange={this.onChangeDepAirport}
                placeholder="From"
                /> 
                </div>
   
            
         
          <div id="arrAirdiv" className="form-group"> 
          <label>  Arrival Airport: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.arrivalAirport}
                onChange={this.onChangeArrAirport}
                placeholder="To"
                /> 
          </div>
  
          <div class="depDatediv" className="form-group">
          <label> Departure Date: </label>
          <div>
            <DatePicker
              selected={this.state.departureDate}
              onChange={this.onChangeDepDate}
            />
          </div>
          </div>
          <div class="arrDatediv" className="form-group"> 
            <label>Arrival Date: </label>
            <div>
            <DatePicker
              selected={this.state.arrivalDate}
              onChange={this.onChangeArrDate}
            />
          </div>
          </div>
          
          <div className="form-group"> 
            <label>Number of Adults: </label>
            <input  type="text"
                required
                className="form-control"
                // value={this.state.adults}
                onChange={this.onChangeAdults}
                //placeholder="Number of Adults:"

                /> 
          </div>
          
          <div className="form-group"> 
            <label>Number of Children: </label>
            <input  type="text"
                required
                className="form-control"
                //value={this.state.children}
                onChange={this.onChangeChildren}
                //placeholder="Number of Children:"

                /> 
          </div>
          <div className="form-group"> 
            <label>Cabin Class:</label>
            {/* <input  type="text"
                required
                className="form-control"
                value={this.state.cabinclass}
                onChange={this.onChangeCabinClass}
                />  */}
          
              <input type="radio" id="Business" onChange={this.onChangeCabinClass} value="Business"/>
              <label for="Business">Business</label>
              <input type="radio" id="Economy" onChange={this.onChangeCabinClass} value="Economy"/>
              <label for="Economy">Economy</label>
              <br></br>
              <br></br>
              
              
        </div>
          <div className="form-group">
            <input type="submit" value="Search" className="btn btn-primary" />
    
          </div>
          </form>
          </div>
    </div>
    
  
    
        
      
      )
    }
 
  }

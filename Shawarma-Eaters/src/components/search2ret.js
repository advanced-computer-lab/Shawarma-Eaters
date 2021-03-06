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
export default class Search2ret extends Component {
   constructor(props) {
      super(props);

      
        
      



      this.onChangeDepDate = this.onChangeDepDate.bind(this);
      this.onChangeArrDate = this.onChangeArrDate.bind(this);
      this.onChangeCabinClass = this.onChangeCabinClass.bind(this);
      this.onSubmit = this.onSubmit.bind(this);




        this.state = {
            departureDate:new Date(),
            arrivalDate:new Date(),
            cabinclass:'',
            redirectToMasterForm:false,
            depSearch:{},
            retSearch:{},
            amountDebit:0,
            amountCredit:0

        }

    }
    componentDidMount(){
      console.log(this.props);
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


     onChangeCabinClass(e){
       this.setState({
        cabinclass:e.target.value
       })
     }

onSubmit(e) { 
  console.log('in oSubmit');
  let costDiffrences = 0;

  if(this.props.location.state.retSearch.cabinclass=='Economy' && this.state.cabinclass=='Business' ){
    costDiffrences=(1000 *(this.props.location.state.retSearch.adults + this.props.location.state.retSearch.children))-this.props.location.state.NewBooking.cost;
  }
  if(this.props.location.state.retSearch.cabinclass=='Business' && this.state.cabinclass=='Economy'){
    costDiffrences=(100 *(this.props.location.state.retSearch.adults + this.props.location.state.retSearch.children))-this.props.location.state.NewBooking.cost;
  }
  if ( (this.props.location.state.retSearch.cabinclass=='Economy' && this.state.cabinclass=='Economy') ||(this.props.location.state.retSearch.cabinclass=='Business' && this.state.cabinclass=='Business')){
    costDiffrences = 0;
  }


  let amountDebit =costDiffrences<-1?costDiffrences*-1:0 ;
  let amountCredit= costDiffrences>-1?costDiffrences*-1:0;

  this.setState({
    amountDebit:amountDebit,
    amountCredit:amountCredit
  })




const Dep_search = {
  departureAirport :  this.props.location.state.depSearch.departureAirport,
  arrivalAirport :  this.props.location.state.depSearch.arrivalAirport,
  departureDate : this.state.departureDate,
  arrivalDate : this.state.arrivalDate,
  adults :  this.props.location.state.depSearch.adults,
  children : this.props.location.state.depSearch.children,
  cabinclass : this.state.cabinclass
}
this.setState({
  depSearch: Dep_search
 })


const Return_search = {
  departureAirport :   this.props.location.state.retSearch.departureAirport,
  arrivalAirport :this.props.location.state.retSearch.arrivalAirport ,
  departureDate : this.state.departureDate,
  arrivalDate : this.state.arrivalDate,
  adults : this.props.location.state.retSearch.adults,
  children : this.props.location.state.retSearch.children,
  cabinclass : this.state.cabinclass
}
this.setState({
  retSearch: Return_search
 });


this.setState({
  redirectToMasterForm:true
});
alert("amountDebit: "+amountDebit+" and AmountCredit: "+amountCredit);

//   e.preventDefault();
//  alert('YOU DID IT YOU SEARCHED!!!!!' );

}

     render() {
      const redirectToMasterForm = this.state.redirectToMasterForm;
      if (redirectToMasterForm) {
      //   console.log("depSearch:");
      //   console.log(this.state.depSearch);
      //   console.log("retSearch:");
      console.log(this.state.retSearch);
        //window.localStorage.clear();

        return (  
           <Redirect
           to={{
           pathname: "/RetFlights2",
           state: { 
            depSearch: this.state.depSearch , // we edit this
            retSearch: this.state.retSearch,  // we edit this
            depFlight : this.props.location.state.depFlight,
            retFlight : this.props.location.state.retFlight,
            seatnumber : this.props.location.state.seatnumber,
            NewBooking: this.props.location.state.NewBooking,
            amountDebit: this.state.amountDebit,  // we pass this
            amountCredit : this.state.amountCredit, // we pass this
  
            users: this.props.location.state.users,

            user:this.props.location.state.user,

            //////////


          depSeats: this.props.location.state.depSeats,
          retSeats: this.props.location.state.retSeats


                   }
           }}
           />


        )
      }


      return (

        <div class="IMGdiv">
        <div class="searchForum">
        <h1>Edit Your Return Flight Search</h1>
        <form onSubmit={this.onSubmit}>

          <div class="depDatediv" className="form-group">
          <label>Old Departure Date: <br></br>{this.props.location.state.retSearch.departureDate +""} </label><br></br>
          <label>Old Arrival Date: <br></br>{this.props.location.state.retSearch.arrivalDate +""} </label><br></br>
          <label>Old Cabin Class: <br></br>{this.props.location.state.retSearch.cabinclass +""} </label><br></br>
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
            <label>Cabin Class:</label>

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
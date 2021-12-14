import React, { Component } from 'react';
import { ReactDOM } from 'react';
import { Prompt ,Redirect,useLocation,BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./search.css";

import MasterForm from './MasterForm.js';
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
            depArray:[],
            retArray:[],
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

    componentDidUpdate(prevProps, prevState) {
      if (prevState.depArray.length !== this.state.depArray.length) {
        console.log('depArray state has changed.')
      }
      if (prevState.retArray.length !== this.state.retArray.length) {
        console.log('retArray state has changed.')
      }
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
      e.preventDefault();

      const Dep_search = {
        departureAirport : this.state.departureAirport,
        arrivalAirport : this.state.arrivalAirport,
        departureDate : this.state.departureDate,
        arrivalDate : this.state.arrivalDate,
        adults : this.state.adults,
        children : this.state.children,
        cabinclass : this.state.cabinclass
      }
      axios.post('http://localhost:5000/guest/depFlights',Dep_search)
      .then(result =>{
         this.setState({
          depArray: result.data
         }, 
         () =>{
          console.log("result data of dep search:",result.data);
          window.localStorage.setItem("depArray", JSON.stringify(this.state.depArray) );
          flag2=true;
         }
         ) 
      }
         )
      .catch(function (error) {
        console.log(error);
      });







      const Return_search = {
        departureAirport :   this.state.arrivalAirport,
        arrivalAirport :this.state.departureAirport ,
        departureDate : this.state.departureDate,
        arrivalDate : this.state.arrivalDate,
        adults : this.state.adults,
        children : this.state.children,
        cabinclass : this.state.cabinclass
      }

      const myarr= this.state.allFlights.filter(
        (flight) =>{
          const myArray = flight.dates.split("-");
          if (Return_search.cabinclass=="Economy"){
            return ( myArray[0] == Return_search.departureDate.getFullYear() &
            myArray[1] ==Return_search.departureDate.getMonth()+1 &
            (myArray[2].substring(0,2).startsWith("0"))?myArray[2].substring(1,2) == Return_search.departureDate.getDate():myArray[2].substring(0,2)==Return_search.departureDate.getDate()
    &
                    flight.arrivalAirport == Return_search.arrivalAirport &
                    flight.departureAirport == Return_search.departureAirport &
                    flight.number_of_Economy_seats>= (Return_search.children + Return_search.adults));
            }
            else{
              return ( myArray[0] == Return_search.departureDate.getFullYear() &
              myArray[1] ==Return_search.departureDate.getMonth()+1 &
              (myArray[2].substring(0,2).startsWith("0"))?myArray[2].substring(1,2) == Return_search.departureDate.getDate():myArray[2].substring(0,2)==Return_search.departureDate.getDate()
             & 
                flight.arrivalAirport == Return_search.arrivalAirport &
                flight.departureAirport == Return_search.departureAirport &
                flight.number_of_Business_class_seats>= (Return_search.children + Return_search.adults));
               }

        }
      );

      this.setState({
        retArray: myarr
      }, ()=>{       
      console.log("result data of ret search:",myarr);
      window.localStorage.setItem("retArray", JSON.stringify(this.state.retArray) );
      flag1=true;
      });






      this.setState({
        redirectToMasterForm:true
      });
//       ret sr d date(date):     Wed Dec 01 2021 02:31:30 GMT+0200 (Eastern European Standard Time)
//       all flight date(string):   2021-12-01T21:17:10.268Z

      // axios.post('http://localhost:5000/guest/arrFlights',Return_search)
      // .then(result =>{
      //   console.log('Result data of return search:',result.data)
      //   this.setState({
      //    retArray: result.data
      //   }, window.localStorage.setItem("retArray",JSON.stringify( (result.data==null || result.data.length== 0) ? [] : result.data  ) ))}
      //   )
      // .catch(function (error) {
      //   console.log(error+" yes error in axios post arrFlights");
      // })


    // alert('YOU DID IT YOU SEARCHED!!!!!' );
    
      
      }


     render() {
      const redirectToMasterForm = this.state.redirectToMasterForm;
      if (redirectToMasterForm) {
        console.log("depArray:");
        console.log(this.state.depArray);
        console.log("retArray:");
      console.log(this.state.retArray);
        //window.localStorage.clear();
             
       console.log("local dep ",JSON.parse( window.localStorage.getItem("depArray")));
       console.log("local ret ",JSON.parse(window.localStorage.getItem("retArray")));
        return (  
          <>
            <Redirect
              to={{
              pathname: "/MasterForm",
              state: { depArray: this.state.depArray,
                        retArray: this.state.retArray  }
            }}
          />
          </>

        
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

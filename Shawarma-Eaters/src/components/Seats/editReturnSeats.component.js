// import React, { useState } from "react";
import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
//import CheckIcon from '@mui/icons-material/Check';
// import ToggleButton from '@mui/material/ToggleButton';
import "./seats.css";
import { Prompt ,Redirect,useLocation,BrowserRouter,withRouter } from 'react-router-dom';

export default class editReturnSeats extends Component{
    constructor(props) {
        super(props);
       
        this.toggleOcc = this.toggleOcc.bind(this);  
        this.startSeats = this.startSeats.bind(this);  
         this.seatsArray = [];
          this.startSeats = this.startSeats.bind(this); 
          
          this.makeAvailable=this.makeAvailable.bind(this);
          this.makeSelected=this.makeSelected.bind(this);


        //  this.state = {
        //     seatnumber:'',
        //     occupied:false
        //   }
          

          this.state = {
            flight_number: '',
            departure: '',
            arrival_times: '',
            number_of_Economy_seats: 0,
            number_of_Business_class_seats: 0,
            arrAirport:'',
            depAirport:'',
            // dates: new Date(),
            users: [], 
            economy_seats: [{ seatnumber: '', occupied:false }],
            business_seats: [{ seatnumber: '', occupied:false }],
            redirectNext:false,
            redirectPrev:false

          } 

        }
        getMethodBusiness(flightNo,seatNo,isOccupied)
        {
          axios.get(`http://localhost:5000/flights/businessSeats/${flightNo}/${seatNo}/${isOccupied}`)
          .then(respond => {console.log(respond.data)})
        }
        getMethodEconomy(flightNo,seatNo,isOccupied)
        {
          axios.get(`http://localhost:5000/flights/economySeats/${flightNo}/${seatNo}/${isOccupied}`)
          .then(respond => {console.log(respond.data)})
        }
        makeSelected(sno){
          console.log("make Selected");
          var sno2 = sno.substring(1, 3);
          this.setState({  seatnumber:sno2, occupied:true })
          document.getElementById(sno).classList.remove("available");   
          document.getElementById(sno).classList.add("selected");
          if(sno2>12){
          this.getMethodEconomy( this.state.flight_number,sno2,true);
        }else{
          this.getMethodBusiness( this.state.flight_number,sno2,true);
        }
          this.seatsArray.push(sno);

         }
        makeAvailable(sno){
          console.log("make Available");

          var sno2 = sno.substring(1, 3);
          this.setState({ seatnumber:sno2, occupied:false })
          document.getElementById(sno).classList.remove("selected");
          document.getElementById(sno).classList.add("available");
          if(sno2>12){
            this.getMethodEconomy( this.state.flight_number,sno2,false);
          }else{
            this.getMethodBusiness( this.state.flight_number,sno2,false);
          }
          const index = this.seatsArray.indexOf(sno);
          if(index > -1 ){
            this.seatsArray.splice(index,1);
          }
         }
        toggleOcc(sno){
           var sno2 = sno.substring(1, 3);
            //console.log("sno: "+sno2);
            let sLen= this.seatsArray.length;

           // console.log("Seats array length : "+sLen);
            if(this.state.occupied | sLen>=3 ){

              
                this.makeAvailable(sno);
                /*
                 // From Selected to Available.... remove sno from array
                  this.setState({ seatnumber:sno2, occupied:true })
                  document.getElementById(sno).classList.remove("selected");
                  document.getElementById(sno).classList.add("available");
                  this.getMethod( this.state.flight_number,sno2,false);

                  //  let fFlag=false;
                  //  let fLoc =0;
                  //  for(let i=0;i<sLen;i++){
                  //    if(this.seatsArray[i]===sno){
                  //      fFlag= true;
                  //      fLoc = i;
                  //    }
                  //  }
                  //  if(fFlag){
                   // console.log("inside if fFlag ");
                    const index = this.seatsArray.indexOf(sno);
                    if(index > -1 ){
                      this.seatsArray.splice(index,1);
                    }

                    */
              }else{ 
                if(sLen<3){
                this.makeSelected(sno);
}
                /*this.setState({  seatnumber:sno2, occupied:false })
                    // From Available to Selected .... Put sno in Array
                    document.getElementById(sno).classList.remove("available");
                    document.getElementById(sno).classList.add("selected");
                    this.getMethod( this.state.flight_number,sno2,true);
    
                    let fFlag=false;
                    let fLoc =0;
                    // for(let i=0;i<sLen;i++){
                    //   console.log("inside Available to Selected for "+ i);
                    //   if(this.seatsArray[i]===sno){
                    //     console.log("inside seatsArray[i]===sno");
                    //     fFlag= true;
                    //     fLoc = i;
                    //   }
                    // }
                    if(!fFlag){
                     // console.log("inside if ! fFlag");
                      this.seatsArray.push(sno);
                    }
    
                    */
                
              }
              console.log("Seatnumber: "+this.state.seatnumber);
              console.log("Occupied: "+this.state.occupied);
              console.log("Seats Array:"+ this.seatsArray);
          
            

}

startSeats(){
  //console.log("in startSeats");

  // To close the not there Business seats 
  for(let i=12;i>this.state.number_of_Business_class_seats;i--){
      let x="s"+i;
      document.getElementById(x).classList.remove("available");
      document.getElementById(x).classList.add("reserved");
  }

  // To close the not there Economy seats 
  for(let i=55;i>this.state.number_of_Economy_seats+12;i--){
      //console.log("startSeats: i:"+i);   
      let x="s"+i;
      //console.log(x);
      document.getElementById(x).classList.remove("available");
      document.getElementById(x).classList.add("reserved");
  }

  // To close the reserved Business seats
  for(let i=0;i<this.state.number_of_Business_class_seats;i++){
    let x="s"+(i+1);
    let cn = document.getElementById(x).className;

    if(cn=="available"){
      // check if the remaining seats are reserved or not
    // console.log("i:"+i+" business_seats[i].seatnumber "+ this.state.business_seats[i].seatnumber+"  occupied: "+ this.state.business_seats[i].occupied  );
      if(this.state.business_seats[i].occupied==true){
        //console.log("this seat is RESERVED by a user  " +x);
        document.getElementById(x).classList.remove("available");
        document.getElementById(x).classList.add("reserved");
       }else{
        //console.log("this business seat is available  "+x);
      }
}
}

// To close the reserved Economy seats
for(let i=0;i<this.state.number_of_Economy_seats;i++){
  let x="s"+(i+1+11);
  let cn = document.getElementById(x).className;

  if(cn=="available" && i>=12 ){
    // check if the remaining seats are reserved or not
   console.log("i:"+i+" economy_seats[i].seatnumber "+ this.state.economy_seats[i].seatnumber+"  occupied: "+ this.state.economy_seats[i].occupied  );
    
   if(this.state.economy_seats[i].occupied==true){
     console.log("this seat is RESERVED by a user  " +x);
      document.getElementById(x).classList.remove("available");
      document.getElementById(x).classList.add("reserved");
     }else{
      console.log("this economy seat is available  "+x);
    }
}
}
      




    
    /*

// Keep this line in mind 
      //const list = state.list.filter(item => item.id !== id);

*/

}

componentDidMount() {
  //ret f

      this.setState({
        flight_number: this.props.location.state.retFlight.flight_number,
        departure: this.props.location.state.retFlight.departure,
        arrival_times: this.props.location.state.retFlight.arrival_times,
        number_of_Economy_seats: this.props.location.state.retFlight.number_of_Economy_seats,
        number_of_Business_class_seats: this.props.location.state.retFlight.number_of_Business_class_seats,
        arrAirport: this.props.location.state.retFlight.arrAirport,
        depAirport: this.props.location.state.retFlight.depAirport,
        dates: this.props.location.state.retFlight.dates,
        createdAt: this.props.location.state.retFlight.createdAt,
        economy_seats: this.props.location.state.retFlight.economy_seats,
        business_seats: this.props.location.state.retFlight.business_seats,

      })   ;
   

//this.startSeats()
    
}

render(){
  const redirectNext = this.state.redirectNext;
  if (redirectNext) {
    return (  
        <Redirect
        to={{
        pathname: "/summary",
        state: { 

          depSearch: this.props.location.state.depSearch ,
          retSearch: this.props.location.state.retSearch,
          depFlight : this.props.location.state.depFlight,
          retFlight : this.props.location.state.retFlight,
          seatnumber : this.props.location.state.seatnumber,
          NewBooking: this.props.location.state.NewBooking,
          amountDebit: this.props.location.state.amountDebit,
          amountCredit : this.props.location.state.amountCredit,

          //

          //from search 2 ret


          users: this.props.location.state.users,

          depSeats: this.props.location.state.depSeats,
          retSeats: this.seatsArray,

          user:this.props.location.state.user
  
                }
        }}
        />

    
    )
  }

  const redirectPrev = this.state.redirectPrev;
  if (redirectPrev) {
    return (  
        <Redirect
        to={{
        pathname: "/RetFlights2",
        state: { 
          depSearch: this.props.location.state.depSearch ,
          retSearch: this.props.location.state.retSearch,
          depFlight : this.props.location.state.depFlight,
          retFlight : this.props.location.state.retFlight,
          seatnumber : this.props.location.state.seatnumber,
          NewBooking: this.props.location.state.NewBooking,
          amountDebit: this.props.location.state.amountDebit,
          amountCredit : this.props.location.state.amountCredit,

          //

          //from search 2 ret
          economy_seats_dep: this.props.location.state.economy_seats,
          business_seats_dep: this.props.location.state.business_seats,

          users: this.props.location.state.users,

          economy_seats_ret: this.state.economy_seats, // we edit this  
          business_seats_ret: this.state.business_seats,// we edit this  

          user:this.props.location.state.user
          }
        }}
        />

    
    )
  }
return(
<body>


  <div id="progressbar">
<button  onClick={() =>this.startSeats()} type="button">PRESSSS</button>
</div>
<h2>Edit Return Flight Seating</h2>


<div class="solid1"> 
<h3>Profile</h3>
Username: Mohamed Kamal
<br></br>
Email: MKamal@gmail.com
<br></br>

Passport number:38163A13G


</div>

<div class="solid2"> 
<h3>Flight Details:</h3>
Flight number:  {this.state.flight_number}
<br></br>
dep Flight number From Props: {this.props.location.state.depFlight.flight_number}
<br></br>

Departure time: {this.state.departure}
<br></br>
Arrival time: {this.state.arrival_times}
<br></br>
Economy Class Seats: {this.state.number_of_Economy_seats}
<br></br>
Business Class Seats: {this.state.number_of_Business_class_seats}
<br></br>
Departure Airport: {this.state.depAirport}
<br></br>
Arrival Airport: {this.state.arrAirport} 
<br></br>
Date: {this.state.dates}
<br></br>
{/* Economy seats: {this.state.economy_seats} */}
</div>






<div class="pbody"> 
<br></br>
<br></br>

{/* <h3>Business</h3> */}
<div class="grid-containerBus">
   
    {/* <div class="item1"> <button class="available" type="button">A1</button></div>
    <div class="item2"> <button class="available" type="button">B1</button></div>
    <div class="item3"> <button class="available" type="button">C1</button></div>
    <div class="item4"> <button class="available" type="button">D1</button></div>
    <div class="item5"> <button class="available" type="button">E1</button></div>
    <div class="item6"> <button class="available" type="button">A2</button></div>
    <div class="item7"> <button class="available" type="button">B2</button></div>
    <div class="item8"> <button class="available" type="button">C2</button></div>
    <div class="item9"> <button class="available" type="button">D2</button></div>
    <div class="item10"> <button class="available" type="button">E2</button></div>
         */}
        <button id="s1"class="available" onClick={() =>this.toggleOcc("s1")} type="button">1</button>
        <button id="s2"class="available" onClick={() =>this.toggleOcc("s2")} type="button">2</button>
        <button id="s3"class="available" onClick={() =>this.toggleOcc("s3")} type="button">3</button>
        <button id="s4"class="available" onClick={() =>this.toggleOcc("s4")} type="button">4</button>
        <button id="s5"class="available" onClick={() =>this.toggleOcc("s5")} type="button">5</button>
        <button id="s6"class="available" onClick={() =>this.toggleOcc("s6")} type="button">6</button>
        <button id="s7"class="available" onClick={() =>this.toggleOcc("s7")} type="button">7</button>
        <button id="s8"class="available" onClick={() =>this.toggleOcc("s8")} type="button">8</button> 
        <button id="s9"class="available" onClick={() =>this.toggleOcc("s9")} type="button">9</button>
        <button id="s10"class="available" onClick={() =>this.toggleOcc("s10")} type="button">10</button>
        <button id="s11"class="available" onClick={() =>this.toggleOcc("s11")} type="button">11</button>
        <button id="s12"class="available" onClick={() =>this.toggleOcc("s12")} type="button">12</button>

</div>
{/* <h3>Economy</h3> */}
<br></br>
    <div class="grid-containerEcon">
        
        <button id="s13"class="available" onClick={() =>this.toggleOcc("s13")} type="button">13</button>
        <button id="s14"class="available" onClick={() =>this.toggleOcc("s14")} type="button">14</button>
        <button id="s15"class="available" onClick={() =>this.toggleOcc("s15")} type="button">15</button>
        <button id="s16"class="available" onClick={() =>this.toggleOcc("s16")} type="button">16</button>
        <button id="s17"class="available" onClick={() =>this.toggleOcc("s17")} type="button">17</button>
        <button id="s18"class="available" onClick={() =>this.toggleOcc("s18")} type="button">18</button>
        <button id="s19"class="available" onClick={() =>this.toggleOcc("s19")} type="button">19</button>
        <button id="s20"class="available" onClick={() =>this.toggleOcc("s20")} type="button">20</button>
        <button id="s21"class="available" onClick={() =>this.toggleOcc("s21")} type="button">21</button>
        <button id="s22"class="available" onClick={() =>this.toggleOcc("s22")} type="button">22</button>
        <button id="s23"class="available" onClick={() =>this.toggleOcc("s23")} type="button">23</button>
        <button id="s24"class="available" onClick={() =>this.toggleOcc("s24")} type="button">24</button>
        <button id="s25"class="available" onClick={() =>this.toggleOcc("s25")} type="button">25</button>
        <button id="s26"class="available" onClick={() =>this.toggleOcc("s26")} type="button">26</button>
        <button id="s27"class="available" onClick={() =>this.toggleOcc("s27")} type="button">27</button>
        <button id="s28"class="available" onClick={() =>this.toggleOcc("s28")} type="button">28</button>
        <button id="s29"class="available" onClick={() =>this.toggleOcc("s29")} type="button">29</button>
        <button id="s30"class="available" onClick={() =>this.toggleOcc("s30")} type="button">30</button>
        <button id="s31"class="available" onClick={() =>this.toggleOcc("s31")} type="button">31</button>
        <button id="s32"class="available" onClick={() =>this.toggleOcc("s32")} type="button">32</button>
        <br></br>
        <button id="s33"class="available" onClick={() =>this.toggleOcc("s33")} type="button">33</button>
        <button id="s34"class="available" onClick={() =>this.toggleOcc("s34")} type="button">34</button>
        <button id="s35"class="available" onClick={() =>this.toggleOcc("s35")} type="button">35</button>
        <button id="s36"class="available" onClick={() =>this.toggleOcc("s36")} type="button">36</button>
        <button id="s37"class="available" onClick={() =>this.toggleOcc("s37")} type="button">37</button>
        <button id="s38"class="available" onClick={() =>this.toggleOcc("s38")} type="button">38</button>
        <button id="s39"class="available" onClick={() =>this.toggleOcc("s39")} type="button">39</button>
        <button id="s40"class="available" onClick={() =>this.toggleOcc("s40")} type="button">40</button>
        <button id="s41"class="available" onClick={() =>this.toggleOcc("s41")} type="button">41</button>
        <button id="s42"class="available" onClick={() =>this.toggleOcc("s42")} type="button">42</button>
        <button id="s43"class="available" onClick={() =>this.toggleOcc("s43")} type="button">43</button>
        <button id="s44"class="available" onClick={() =>this.toggleOcc("s44")} type="button">44</button>
        <button id="s45"class="available" onClick={() =>this.toggleOcc("s45")} type="button">45</button>
        <br></br>
        <button id="s46"class="available" onClick={() =>this.toggleOcc("s46")} type="button">46</button>
        <button id="s47"class="available" onClick={() =>this.toggleOcc("s47")} type="button">47</button>
        <button id="s48"class="available" onClick={() =>this.toggleOcc("s48")} type="button">48</button>
        <button id="s49"class="available" onClick={() =>this.toggleOcc("s49")} type="button">49</button>
        <button id="s50"class="available" onClick={() =>this.toggleOcc("s50")} type="button">50</button>
        <button id="s51"class="available" onClick={() =>this.toggleOcc("s51")} type="button">51</button>
        <button id="s52"class="available" onClick={() =>this.toggleOcc("s52")} type="button">52</button>
        <button id="s53"class="available" onClick={() =>this.toggleOcc("s53")} type="button">53</button>
        <button id="s54"class="available" onClick={() =>this.toggleOcc("s54")} type="button">54</button>
        <button id="s55"class="available" onClick={() =>this.toggleOcc("s55")} type="button">55</button>
</div>
    
    {/* <tbody>
    {seats.map((i) =>{
            return<div class= {i} > <button class="available" type="button">{seats[i-1]}</button></div> ;
        })}
    </tbody> */}
</div> 

<Button id="prevButton" color="primary" size="" style={{float:'inline-start',width:'15%'}}   
 onClick={()=>{this.setState({redirectPrev: true});}}>Previous</Button>
               
               <Button id="nextButton" color="primary" size="" style={{float:'inline-start',width:'15%'}} 
onClick={()=>{  // if (seats empty){
                  //   alert("Please select a seat 1st");
                  // }
                  // else{
                    this.setState({redirectNext: true});

                  //}
                } } style={{float:'inline-start',width:'15%'}} >Next</Button>



</body>

);
}
}
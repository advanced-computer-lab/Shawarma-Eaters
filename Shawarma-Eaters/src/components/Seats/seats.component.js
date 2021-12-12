// import React, { useState } from "react";
import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
//import CheckIcon from '@mui/icons-material/Check';
// import ToggleButton from '@mui/material/ToggleButton';
import "./seats.css";

export default class seats extends Component{
    constructor(props) {
        super(props);
        console.log("inside constructor");
        this.onChangeOcc = this.onChangeOcc.bind(this);  
        this.toggleOcc = this.toggleOcc.bind(this);  
          this.state = {
            seatnumber:'',
            occupied:false

          }
        //   this.flight = {
        //     flight_number: '',
        //     departure: '',
        //     arrival_times: '',
        //     number_of_Economy_seats: 0,
        //     number_of_Business_class_seats: 0,
        //     arrAirport:'',
        //     depAirport:'',
        //     dates: new Date(),
        //     users: []
        //   }  
        }

        onChangeOcc(sno){
            //console.log("inside onChange");
             /* this.setState({
                seatnumber:sno.target.value,
                occupied:true
            })
            //console.log("Seatnumber: "+this.state.seatnumber);
            //console.log("Occupied: "+this.state.occupied);
          console.log(document.getElementById('s1').innerHTML );
            var x = document.getElementById("s2").style.backgroundImage;
            console.log(x);
            document.getElementById("s2").style.backgroundImage = " url('seat_reserved.png')";
            document.getElementById("s2").style.opacity="0.7";
            //document.getElementById("s2").style.display="none";
            var y = document.getElementById("s10").classList.value
            console.log(y);*/
            if (document.getElementById(sno).classList.value == "reserved"){
                var y = document.getElementById(sno).classList.value
            console.log(y);
                document.getElementById(sno).classList.remove("reserved");
                document.getElementById(sno).classList.add("available");
            }else {
                if(document.getElementById(sno).classList.value == "available"){
                    document.getElementById(sno).classList.remove("available");
                    document.getElementById(sno).classList.add("reserved");
            }
                } 

            
        }   
        toggleOcc(sno){
           var sno2 = sno.substring(1, 2);
             console.log(sno2);
            // this.setState({
            //    // seatnumber:sno.target.value,
            //     seatnumber:sno2,
            //     occupied:true
            //  })
            //  var x = (this.props.occupied===false)?true:false;
            //  this.setState({occupied:x});
            if(this.state.occupied){
                this.setState({
                    seatnumber:sno2,
                    occupied:false
                 })
                //  this.toggleClass("reserved");
                document.getElementById(sno).classList.remove("available");
                document.getElementById(sno).classList.add("reserved");
            }else{
                this.setState({
                    seatnumber:sno2,
                    occupied:true
                 })
                 document.getElementById(sno).classList.remove("reserved");
                 document.getElementById(sno).classList.add("available");

                //document.getElementById("s1").className += "reserved";
                

            }
             console.log("Seatnumber: "+this.state.seatnumber);
             console.log("Occupied: "+this.state.occupied);
}

     Seats() {
        
//   const [seats,SetSeats]= useState([1,2,3,4,5]);
    }
componentDidMount() {
    axios.get('http://localhost:5000/flights/61a7e66b2772fe2430a1524a')
    .then(response => {
      this.setState({
        flight_number: response.data.flight_number,
        departure: response.data.departure,
        arrival_times: response.data.arrival_times,
        number_of_Economy_seats: response.data.number_of_Economy_seats,
        number_of_Business_class_seats: response.data.number_of_Business_class_seats,
        arrAirport: response.data.arrAirport,
        depAirport: response.data.depAirport,
        dates: response.data.dates,
        createdAt: response.data.createdAt,
        EconomySeats: response.data.economy_seats.occupied
      })   
    })
    .catch(function (error) {
      console.log(error);
    })

  

}
 econSeat(s){

    console.log('econseat clicked'+ s);

}


render(){
return(

<body>

<h2>Flight Seating</h2>

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
Economy seats: {this.state.EconomySeats}
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
        <button id="s1"class="available" onClick={() =>this.econSeat(1)} type="button">1</button>
        <button id="s2"class="available" onClick={() =>this.onChangeOcc("s2")} type="button">2</button>
        <button id="s3"class="available" onClick={() =>this.toggleOcc("s3")} type="button">3</button>
        <button id="s4"class="available" onclick={() =>this.toggleOcc("s4")} type="button">4</button>
        <button id="s5"class="available" onclick={() =>this.toggleOcc("s5")} type="button">5</button>
        <button id="s6"class="available" type="button">6</button>
        <button id="s7"class="available" type="button">7</button>
        <button id="s8"class="available" type="button">8</button> 
        <button id="s9"class="available" type="button">9</button>
        <button id="s10"class="reserved" type="button">10</button>
        <button id="s11"class="reserved" type="button">11</button>
        <button id="s12"class="reserved" type="button">12</button>
</div>
{/* <h3>Economy</h3> */}
<br></br>
    <div class="grid-containerEcon">
        
    <button id="s13"class="available" type="button">13</button>
        <button id="s14"class="available" type="button">14</button>
        <button id="s15"class="available" type="button">15</button>
        <button id="s16"class="available" type="button">16</button>
        <button id="s17"class="reserved" type="button">17</button>
        <button id="s18"class="selected" type="button">18</button>
        <button id="s19"class="available" type="button">19</button>
        <button id="s20"class="available" type="button">20</button> 
        <button id="s21"class="available" type="button">21</button>
        <button id="s22"class="available" type="button">22</button>
        <button id="s23"class="available" type="button">23</button>
        <button id="s24"class="available" type="button">24</button>
        <button id="s25"class="available" type="button">25</button>
        <button id="s26"class="available" type="button">26</button>
        <button id="s27"class="reserved" type="button">27</button>
        <button id="s28"class="available" type="button">28</button>
        <button id="s29"class="available" type="button">29</button>
        <button id="s10"class="available" type="button">30</button> 
        <button id="s30"class="available" type="button">31</button>
        <button id="s31"class="available" type="button">32</button>
        <br></br>
        <button id="s33"class="available" type="button">33</button>
        <button id="s34"class="available" type="button">34</button>
        <button id="s35"class="available" type="button">35</button>
        <button id="s36"class="available" type="button">36</button>
        <button id="s37"class="reserved" type="button">37</button>
        <button id="s38"class="available" type="button">38</button>
        <button id="s39"class="available" type="button">39</button>
        <button id="s40"class="available" type="button">40</button> 
        <button id="s41"class="available" type="button">41</button>
        <button id="s42"class="available" type="button">42</button>
        <button id="s43"class="available" type="button">43</button>
        <button id="s44"class="available" type="button">44</button>
        <button id="s45"class="available" type="button">45</button>
         <br></br>
         <button id="s46"class="available" type="button">46</button>
        <button id="s47"class="reserved" type="button">47</button>
        <button id="s48"class="available" type="button">48</button>
        <button id="s49"class="available" type="button">49</button>
        <button id="s50"class="available" type="button">50</button> 
        <button id="s51"class="available" type="button">51</button>
        <button id="s52"class="available" type="button">52</button>
</div>
    
    {/* <tbody>
    {seats.map((i) =>{
            return<div class= {i} > <button class="available" type="button">{seats[i-1]}</button></div> ;
        })}
    </tbody> */}

  
  
</div> 

</body>

);
}
}
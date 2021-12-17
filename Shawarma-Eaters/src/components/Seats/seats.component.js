// import React, { useState } from "react";
import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
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
        }

        onChangeOcc(sno){
            //console.log("inside onChange");
            this.setState({
                seatnumber:sno.target.value,
                occupied:true
            })
            //console.log("Seatnumber: "+this.state.seatnumber);
            //console.log("Occupied: "+this.state.occupied);
            console.log(document.getElementById('s1').innerHTML );
          //  console.log(this.className);

            
        }   
        toggleOcc(sno){
            this.setState({
                seatnumber:sno.target.value,
                occupied:true
             })
            //  var x = (this.props.occupied===false)?true:false;
            //  this.setState({occupied:x});
            if(this.state.occupied){
                this.setState({
                    seatnumber:sno.target.value,
                    occupied:false
                 })
                //  this.toggleClass("reserved");
                document.getElementById("s5").classList.delete("available");
                document.getElementById("s5").classList.add("reserved");
            }else{
                this.setState({
                    seatnumber:sno.target.value,
                    occupied:true
                 })
                 
                 document.getElementById("s5").classList.delete("reserved");
                 document.getElementById("s5").classList.add("available");

                //document.getElementById("s1").className += "reserved";
                

            }
             console.log("Seatnumber: "+this.state.seatnumber);
             console.log("Occupied: "+this.state.occupied);
}

     Seats() {
        
//   const [seats,SetSeats]= useState([1,2,3,4,5]);
    }
componentDidMount() {

    
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
Flight number: AD2135
<br></br>
Departure time: 16:34
<br></br>
Arrival time: 18:34
<br></br>
Economy Class Seats: 2
<br></br>
Business Class Seats: 
<br></br>
Departure Airport: Heathrow
<br></br>
Arrival Airport: Cairo
<br></br>
Date: 12/01/2022
</div>






<div class="pbody"> 
<br></br>
<br></br>

{/* <h3>Business</h3> */}
<div class="grid-containerBus">
   
    {/* <div class="item1"> <button class="button" type="button">A1</button></div>
    <div class="item2"> <button class="button" type="button">B1</button></div>
    <div class="item3"> <button class="button" type="button">C1</button></div>
    <div class="item4"> <button class="button" type="button">D1</button></div>
    <div class="item5"> <button class="button" type="button">E1</button></div>
    <div class="item6"> <button class="button" type="button">A2</button></div>
    <div class="item7"> <button class="button" type="button">B2</button></div>
    <div class="item8"> <button class="button" type="button">C2</button></div>
    <div class="item9"> <button class="button" type="button">D2</button></div>
    <div class="item10"> <button class="button" type="button">E2</button></div>
         */}
        <button id="s1"class="button" onClick={this.econSeat} type="button">1</button>
        <button id="s2"class="button" onClick={this.onChangeOcc} type="button">2</button>
        <button id="s3"class="button" onClick={this.toggleOcc} type="button">3</button>
        <button id="s4"class="button" type="button">4</button>
        <button id="s5"class="button" type="button">5</button>
        <button id="s6"class="button" type="button">6</button>
        <button id="s7"class="button" type="button">7</button>
        <button id="s8"class="button" type="button">8</button> 
        <button id="s9"class="button" type="button">9</button>
        <button id="s10"class="reserved" type="button">10</button>
        <button id="s11"class="reserved" type="button">11</button>
        <button id="s12"class="reserved" type="button">12</button>
</div>
{/* <h3>Economy</h3> */}
<br></br>
    <div class="grid-containerEcon">
        
    <button id="s13"class="button" type="button">13</button>
        <button id="s14"class="button" type="button">14</button>
        <button id="s15"class="button" type="button">15</button>
        <button id="s16"class="button" type="button">16</button>
        <button id="s17"class="reserved" type="button">17</button>
        {/* <ToggleButton class="available" value="check" selected={this.state.occupied} onChange={() => {this.setState({occupied:false}) }}>99</ToggleButton> */}
        <button id="s18"class="button" type="button">18</button>
        <button id="s19"class="button" type="button">19</button>
        <button id="s8"class="button" type="button">20</button> 
        <button id="s9"class="button" type="button">21</button>
        <button id="s10"class="button" type="button">22</button>
        <button id="s1"class="button" type="button">23</button>
        <button id="s2"class="button" type="button">24</button>
        <button id="s3"class="button" type="button">25</button>
        <button id="s4"class="button" type="button">26</button>
        <button id="s5"class="reserved" type="button">27</button>
        <button id="s6"class="button" type="button">28</button>
        <button id="s7"class="button" type="button">29</button>
        <button id="s8"class="button" type="button">30</button> 
        <button id="s9"class="button" type="button">31</button>
        <button id="s10"class="button" type="button">32</button>
        <br></br>
        <button id="s1"class="button" type="button">33</button>
        <button id="s2"class="button" type="button">34</button>
        <button id="s3"class="button" type="button">35</button>
        <button id="s4"class="button" type="button">36</button>
        <button id="s5"class="reserved" type="button">37</button>
        <button id="s6"class="button" type="button">38</button>
        <button id="s7"class="button" type="button">39</button>
        <button id="s8"class="button" type="button">40</button> 
        <button id="s9"class="button" type="button">41</button>
        <button id="s10"class="button" type="button">42</button>
        <button id="s1"class="button" type="button">43</button>
        <button id="s2"class="button" type="button">44</button>
        <button id="s3"class="button" type="button">45</button>
         <br></br><button id="s4"class="button" type="button">46</button>
       

        <button id="s5"class="reserved" type="button">47</button>
        <button id="s6"class="button" type="button">48</button>
        <button id="s7"class="button" type="button">49</button>
        <button id="s8"class="button" type="button">50</button> 
        <button id="s9"class="button" type="button">51</button>
        <button id="s10"class="button" type="button">52</button>
</div>
    
    {/* <tbody>
    {seats.map((i) =>{
            return<div class= {i} > <button class="button" type="button">{seats[i-1]}</button></div> ;
        })}
    </tbody> */}

{/* <Link
  to={{
    pathname: "/summary",
    state: { seats: this.state.seatnumber }
  }}
/> */}
  
</div> 

</body>

);
}
}
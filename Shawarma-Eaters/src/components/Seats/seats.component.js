// import React, { useState } from "react";
import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
//import CheckIcon from '@mui/icons-material/Check';
//import ToggleButton from '@mui/material/ToggleButton';
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
            console.log("inside onChange");
            this.setState({
                seatnumber:sno.target.value,
                occupied:true
            })
            console.log("Seatnumber: "+this.state.seatnumber);
            console.log("Occupied: "+this.state.occupied);
            console.log(""+this.class);
            console.log(this.className);
            
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

<div class="solid1"> Profile

</div>

<div class="solid2"> Flight Details

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
        
   
        <button id="s1"class="button" type="button">1</button>
        <button id="s2"class="button" type="button">2</button>
        <button id="s3"class="button" type="button">3</button>
        <button id="s4"class="button" type="button">4</button>
        <button id="s5"class="reserved" type="button">5</button>
        <button id="s6"class="button" type="button">6</button>
        <button id="s7"class="button" type="button">7</button>
        <button id="s8"class="button" type="button">8</button> 
        <button id="s9"class="button" type="button">9</button>
        <button id="s10"class="button" type="button">10</button>
</div>
    
    {/* <tbody>
    {seats.map((i) =>{
            return<div class= {i} > <button class="button" type="button">{seats[i-1]}</button></div> ;
        })}
    </tbody> */}

  
  
</div> 

</body>

);
}
}
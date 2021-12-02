import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import "./seats.css";

export default function Seats() {
  const [seats,SetSeats]= useState([1,2,3,4,5]);
return(
<body>

<h2>Flight Seating</h2>

<div class="solid1"> Profile

</div>

<div class="solid2"> Flight Details

</div>

<div class="solid3">Adham
<h2>Please choose your seat/s</h2>

</div>






<h1>Seats map  </h1>


<div class="grid-container">
  <tbody>
{seats.map((i) =>{
        return<div class= {i} > <button class="button" type="button">{seats[i-1]}</button></div> ;
    })}
</tbody>

  
  
</div>

</body>

);
}
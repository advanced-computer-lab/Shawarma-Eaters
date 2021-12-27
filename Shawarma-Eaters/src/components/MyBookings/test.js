
import React, { useEffect, useState } from "react";
import { Prompt ,Redirect,useLocation,BrowserRouter,withRouter } from 'react-router-dom';

import axios from 'axios';
import round_trip from './round_trip.png';
import './MyBooking.css'
import {
    Form,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    CardFooter,
    CardImg,
    CardSubtitle,FormGroup, Label, Input
  } from "reactstrap"; 
const DisplayBookings = () => { 

    const [bookings,setBookings] = useState([{}]);
    const [debFlight,setdebFlight] = useState([{}]);
    const [arrFlight,setarrFlight] = useState([{}]);
    const [arrIten,setIten] = useState(false);
    const [tmpBooking,settmpBooking] = useState({});



    
    const getId = (idx) =>{
        let path = window.location.pathname;
        let find = 0;
        let indexOfFirst = -1;
        for(var i = (path.length) -1; i > 0;i--)
        {
            if(path[i] === '/')
            {
                find++;
                if(find == 1)   //getting the first id
                {
                    if(find == idx )
                        return path.slice(i+1);
                    else
                    {
                        indexOfFirst = i;
                    }
                }
                else if(find == 2)
                {
                    return path.slice(i+1,indexOfFirst);
                }
            }
           
            
        }
    }
    const GetBookings = async () => {
    //const id = this.props.match.params.id;
    //console.log(id);
   
    console.log(window.location.pathname);

    const token = {accessToken :localStorage.getItem("accessToken")};    
    const user = await axios.post('http://localhost:5000/users/verify',token);
    
    console.log('user:',user.data);
    console.log('token:',token)

 
    const response = await axios
        .get(`http://localhost:5000/users/userBookings/`+user.data).then(booking => {setBookings(booking.data);console.log('bookings:',booking)})//.then(set)
        .catch((err) => console.log(err))
        console.log('all bookings',bookings);
    }


    useEffect(() => {
        GetBookings();
      },bookings);


    const DeletingBookings = async (BookID) => {
        console.log('DeletingBookings method')
        const UserId = getId(1);  //endpoint/:Userid/:BookId
        //const BookID = getId(1);
        const deleted = 
        await axios
            .put(`http://localhost:5000/users/DeleteBookings/${UserId}/${BookID}`).then(await axios
            .delete(`http://localhost:5000/booking/${BookID}`)).then( await axios 
            .get("http://localhost:5000/users/sendingMail/"+getId(1)))
            .catch((err) => console.log(err))
            console.log(bookings);
      
    }

    const SendItinerary = async (Booking) => {
        console.log('SendItinerary method')
        const token = {accessToken :localStorage.getItem("accessToken")};    
        const user = await axios.post('http://localhost:5000/users/verify',token);        //const BookID = getId(1);
        console.log('userID:222' , user)
       
        const Itinerary = 
        await axios
            .post(`http://localhost:5000/users/sendItinerary/`+user.data,Booking).then()
            .catch((err) => console.log(err))
            console.log(bookings);
      
    }
    const viewIten = (booking)=>
    {
        setIten(true);
        settmpBooking(booking)
    }
    const Check = (id)=>
    {
        if(window.confirm('are you sure')){
            DeletingBookings(id)
          }
    
    }
        console.log('testttt',bookings)

        const theItems = bookings.map((booking) =>
        {
           
            
              
            var depFlight = booking.outgoingFlightId;
            var arrFlight = booking.returnFlightId;
            console.log(booking.returnFlightId)
            if(depFlight !== undefined && arrFlight !== undefined &&depFlight !== null  &&arrFlight !== null){
            return (
                    <Card className = 'card'>
                    {/* <CardImg className="card-img-top" top width="100%"  alt="Card image cap" /> */}

                    <div class="container">
                                    <div class="row">
                                        <div class="col-sm">
                                        <CardBody>
                        <div class = 'txtColor'>
                        <CardTitle tag="h5" >
                            Booking Number : {booking.bookingNumber}
                        </CardTitle>
                        </div>
                        <div class="flex-container">
                            <div > <h2>  {depFlight.depAirport}</h2> <small>  </small></div>
                            <div> <img src={round_trip} width="70" height="70" /> </div>
                            <div > <h2>{depFlight.arrAirport}</h2> <small> </small></div>
                        </div>
                        {/* <CardSubtitle
                        className="mb-2 text-muted" 
                        tag="h6"
                        >
                        Booking details:
                        </CardSubtitle>

                        <Label>From : {depFlight.depAirport}</Label> <br></br>
                    
                        <Label>To : {depFlight.arrAirport} </Label> <br></br> */}
                        
                    
                        

                        
                    </CardBody>
                                        </div>
                                        <div class="col-sm btnPart ">
                                            <Button className = 'btnBook' size="small"  color="primary" onClick={()=> {Check(booking._id)}}>
                                                Delete
                                            </Button>   
                                            <Button className = 'btn btn-success btn-lg btn-block' size="small"  color="primary" onClick={()=> {SendItinerary(booking)}}>
                                                Send Itinerary via mail
                                            </Button>    
                                            <Button className = 'btn btn-success btn-lg btn-block' size="small"  color="primary" onClick={()=> {viewIten(booking)}}>
                                                view Itinerary
                                            </Button>                     
                                        </div>

                                </div>
                            </div>
                
                    </Card>
      
     
   

      
            )
            }
        })

    
        const redirectEditRet = arrIten;
        if (redirectEditRet) {
          return (  
              <Redirect
              to={{
              pathname: "/iten",
              state: { 

            tmpBooking
                      }
              }}
              />
  
  
          )
        }
      
return (
    <>
    <h1>My Bookings</h1>
                  
             <div>
                
            <FormGroup>

                {theItems}
            </FormGroup>
            </div>
    </>
)
};
 
export default DisplayBookings;



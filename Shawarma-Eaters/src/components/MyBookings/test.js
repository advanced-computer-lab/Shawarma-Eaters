
import React, { useEffect, useState } from "react";
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
   
    console.log(window.location.pathname)
    
    const response = await axios
        .get(`http://localhost:5000/users/userBookings/`+getId(1)).then(booking => setBookings(booking.data))//.then(set)
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
            if(depFlight !== undefined && arrFlight !== undefined){
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
                        </Button>                        </div>

                                </div>
                            </div>
                
                    </Card>
      
     
   

      
            )
            }
        })

    

      
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


// import React, { Component } from "react";
// import {
//   Form,
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   CardTitle,
//   CardText,
//   CardFooter,
//   CardImg,
//   CardSubtitle
// } from "reactstrap";

// import axios from 'axios';



// import StepProgressBar from "react-step-progress";
// // import the stylesheet
// import "react-step-progress/dist/index.css";

// import MultiStepProgressBar from "./MultiStepProgressBar";

// //import plane from '../imgs/plane.jpg';
// //import  '../imgs/img.css';

// import { FormGroup, Label, Input } from "reactstrap";


// let selected_flight_no=0;

// class MasterForm extends Component {
//   constructor(props) {
//     super(props);

//     // Set the intiial input values
//     this.state = {
//       bookings: []
      
//     };

//     // // Bind new functions for next and previous
//     // this._next = this._next.bind(this);
//     // this._prev = this._prev.bind(this);
//   }

//   componentDidMount() {
//     axios.get('http://localhost:5000/users/userBookings/'+getId(2))
//       .then(response => {
//         this.setState({ bookings: response.data })
//       })
//       .catch((error) => {
//         console.log(error);
//       });
     
//   }

//   // Trigger an alert on form submission
//   handleSubmit = event => {
//     event.preventDefault();
//     if (selected_flight_no==0){
//       alert(`You did not select your departure flight !`);
//     }
//     else{
//     alert(`Your Departure Flight detail: \n 
//       Your Flight Number: ${selected_flight_no}`);
//     }
//   };

  



  

//   step1Content() {
    
    
  
//     return (  
//     <div>
//       <p>Please select prefered departure flight</p>
//       <FormGroup>

//   { this.state.bookings.map(currentflight =>(
    
      
//       <Card>
//     <CardImg className="card-img-top" top width="100%" src={plane} alt="Card image cap" />
//     <CardBody>
//         <CardTitle tag="h5">
//         Departure Flight
//         </CardTitle>
//         <CardSubtitle
//           className="mb-2 text-muted"
//           tag="h6"
//         >
//           Flight details:
//         </CardSubtitle>

//         <Label>Flight Number : {currentflight.flight_number}</Label> <br></br>
     
//         <Label>Departure : {currentflight.departure}</Label> <br></br>
           
//         <Label>Economy seats : {currentflight.number_of_Economy_seats}</Label>  <br></br>      

//         <Label>Business class seats : {currentflight.number_of_Business_class_seats}</Label>  <br></br>
          

//             <Button size="small" color="primary" onClick={()=> {selected_flight_no=currentflight.flight_number ; alert("Flight Selected !\nPlease proceed to the next page");}}>
//             Select
//           </Button>
//       </CardBody>
//       </Card>
      

//       )
//   )}
//         </FormGroup>
      
//     </div>
    
//     );
//   }


//   render() {
//     return (
//       <>
//         <Form onSubmit={this.handleSubmit}>
//           <Card>
//             <CardHeader>Choose your departure and return flight</CardHeader>
//             <CardBody>
//               <CardTitle>
//                 <MultiStepProgressBar currentStep={this.state.currentStep} />
//               </CardTitle>
              

//               {this.step1Content()}
              
//               <Step2
//                 currentStep={this.state.currentStep}

//               />
//               <Step3
//                 currentStep={this.state.currentStep}  
//               />



//             </CardBody>
//             <CardFooter>
//               {this.previousButton}
//               {this.nextButton}
//               {this.submitButton}
//             </CardFooter>
//           </Card>
//         </Form>
//       </>
//     );
//   }
// }

// export default MasterForm;

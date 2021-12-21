import React, { Component } from "react";
import { useState,useEffect } from 'react';
import ReactDOM  from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./search.css";
import "./ticket.css";
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
  CardSubtitle
} from "reactstrap";

import axios from 'axios';

import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";

import SearchPage from "./search-plus.component";
import plane from '../imgs/plane.jpg';
import  '../imgs/img.css';


import { FormGroup, Label, Input } from "reactstrap";
import { Prompt ,Redirect,useLocation,BrowserRouter,withRouter } from 'react-router-dom';
const step3Content = <h1>Summary of Dep and Return flight</h1>;



class MasterForm extends Component {
  handleSubmit = ()=> window.location='/myBookings/61a8d3f3ef7267e7fe6a6d4c';
  constructor(props) {
    super(props);

    // Set the intiial input values
    this.state = {
      user: {},
      dep_flights: [],
      ret_flights: [],
      depFlight:{},
      retFlight:{}
      
    };
    this.step1Validator = this.step1Validator.bind(this);
    this.step2Validator = this.step2Validator.bind(this);
    this.step3Validator = this.step3Validator.bind(this);

    this.step1Content = this.step1Content.bind(this);
    this.step2Content = this.step2Content.bind(this);
    this.step3Content = this.step3Content.bind(this);

    this.fetchData = this.fetchData.bind(this);
    // Bind new functions for next and previous
    //Do I need bind?
   

  }
  


  // Alex
  //  United States
  //  "cabinclass": "Economy",
  //  "arrivalDate":"12/15/2021",
  //  "departureDate":"12/15/2021",
  //  "adults":1,
  //  "children":2
  
   /*componentDidMount(props) {

    // axios.get('http://localhost:5000/users/61a8d3f3ef7267e7fe6a6d4c/')
    //   .then(response => {
    //     this.setState({ user: response.data })
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    //   axios.get('http://localhost:5000/flights/')
    //   .then(response => {
    //     this.setState({ dep_flights: response.data })
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })

      // axios.get('http://localhost:5000/flights/')
      // .then(response => {
      //   this.setState({ retFlight: response.data })
      // })
      // .catch((error) => {
      //   console.log(error);
      // })

      //window.sessionStorage.setItem;

    // this.setState({
    //   dep_flights: localStorage.getItem("depArray"),
    //   dep_flights:localStorage.getItem("retArray"),
    //  });

    //console.log( JSON.parse(window.localStorage.getItem("depArray")));
    //console.log(JSON.parse(window.localStorage.getItem("retArray")));
    depFlights_test=JSON.parse(window.localStorage.getItem("depArray"));
    retFlights_test=JSON.parse(window.localStorage.getItem("retArray"));

    this.setState({ 
      dep_flights:  depFlights_test,
      ret_flights: retFlights_test
    });
    //window.localStorage.clear();

    
    console.log('using local depFlights_test in master form:' ,depFlights_test);
    console.log('using local retFlights_test in master form:' ,retFlights_test);
    console.log("using depArray in master form:",this.props.location.state.depArray);
    console.log("using retArray in master form:",this.props.location.state.retArray);

      console.log(this.props);

    window.localStorage.clear();
     
  }

  */
  
  
  /*
  How componentWillMount() work:
      As you know, the life-cycle hook componentWillMount triggers before the initial render, 
      and the function will only trigger once in the lifespan of a component.
      It is used to update the state value before the DOM is rendered, creating a state variable, as shown below.

      constructor() {
          super();
          this.state = {
            message: "This is initial message"
          };
      }

      As shown above, there is one state variable called message with a default string. 
      Now update the message as shown below.

      componentWillMount() {
          this.setState({ message: "This is an updated message" });
      }

      Once the component gets initiated, 
      the current state value will be overridden with the updated value,
       but keep in mind this happens once in a lifetime of a component.
  */
 //For more info go to this link
 //https://reactjs.org/docs/react-component.html#shouldcomponentupdate
  // componentWillMount() {
  //   axios.post('http://localhost:5000/guest/depFlights',this.props.depSearch).then(result => this.setState({ dep_flights:  result.data})).catch((error) => {
  //     console.log(error);
  //   });
  //   axios.post('http://localhost:5000/guest/arrFlights',this.props.retSearch).then(result => this.setState({ ret_flights:  result.data})).catch((error) => {
  //     console.log(error);
  //   });
  // console.log('propsssssss',this.props);
  
  // axios.get('http://localhost:5000/users/61a8d3f3ef7267e7fe6a6d4c/')
  //   .then(response => {
  //     this.setState({ user: response.data })
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });  
  
  // }
 
  componentDidUpdate(prevProps, prevState) {

    // if (prevState.dep_flights.length == this.state.dep_flights.length) {
    //   console.log('((((((depFlight state has changed))))))))).')
    // }
    // if (prevState.ret_flights.length !== this.state.ret_flights.length) {
    //   console.log('((((retFlight state has changed.))))))')
    // }
  }

  fetchData = async () => {
   await axios.post('http://localhost:5000/guest/depFlights',this.props.depSearch).then(result => this.setState({ dep_flights:  result.data})).catch((error) => {
        console.log(error);
      });
      await  axios.post('http://localhost:5000/guest/arrFlights',this.props.retSearch).then(result => this.setState({ ret_flights:  result.data})).catch((error) => {
        console.log(error);
      });
    console.log('propsssssss',this.props);

    await  axios.get('http://localhost:5000/users/61a8d3f3ef7267e7fe6a6d4c')
      .then(response => {
        this.setState({ user: response.data })
      })
      .catch((error) => {
        console.log(error);
      });  
  }
  componentDidMount() {

    axios.get('http://localhost:5000/users/61a8d3f3ef7267e7fe6a6d4c/')
      .then(response => {
        this.setState({ user: response.data })
      })
      .catch((error) => {
        console.log(error);
      });

     this.fetchData();

      // axios.get('http://localhost:5000/flights/')
      // .then(response => {
      //   this.setState({ retFlight: response.data })
      // })
      // .catch((error) => {
      //   console.log(error);
      // })


    // this.setState({
    //   dep_flights: localStorage.getItem("depArray"),
    //   dep_flights:localStorage.getItem("retArray"),
    //  });

    // console.log(this.props);
    console.log("depArray in master form:",this.state.dep_flights);
    //console.log("retArray in master form:",this.state.dep_flights);

      


     
  }



  //Departure
  
  step1Validator() {
   // return true;
   return (this.state.dep_flights.length==0)?false:true;
  }
  //Return
  step2Validator() {
    //return true;
   return (this.state.ret_flights.length==0)?false:true;
  }
  
  //Summary
   step3Validator() {
    return true;
  }


  step1Content() {

    return (  
    <div>
      <p>Please select prefered departure flight</p>
      <FormGroup>

  { 
  this.state.dep_flights.map(currentflight =>(
    
      
      <Card>
    <CardImg className="card-img-top" top width="100%" src={plane} alt="Card image cap" />
    <CardBody>
        <CardTitle tag="h5">
        Departure Flight
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          Flight details:
        </CardSubtitle>

        <Label>Flight Number : {currentflight.flight_number}</Label> <br></br>
     
        <Label>Departure : {currentflight.departure}</Label> <br></br>
           
        <Label>Economy seats : {currentflight.number_of_Economy_seats}</Label>  <br></br>      

        <Label>Business class seats : {currentflight.number_of_Business_class_seats}</Label>  <br></br>
          

            <Button size="small" color="primary" onClick={()=> {this.setState({ depFlight: currentflight }) ; alert("Flight Selected !\nPlease proceed to the next page");}}>
            Select
          </Button>
      </CardBody>
      </Card>
      

      )
  )
  }
        </FormGroup>
      
    </div>
    
    );
  }

  step2Content() {
   
    return (  
    <div>
      <p>Please select prefered return flight</p>
      <FormGroup>

  { this.state.ret_flights.map(currentflight =>(
    
      
      <Card>
    <CardImg className="card-img-top" top width="100%" src={plane} alt="Card image cap" />
    <CardBody>
        <CardTitle tag="h5">
        Return Flight
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          Flight details:
        </CardSubtitle>

        <Label>Flight Number : {currentflight.flight_number}</Label> <br></br>
     
        <Label>Departure : {currentflight.departure}</Label> <br></br>
           
        <Label>Economy seats : {currentflight.number_of_Economy_seats}</Label>  <br></br>      

        <Label>Business class seats : {currentflight.number_of_Business_class_seats}</Label>  <br></br>
          

            <Button size="small" color="primary" onClick={()=> { this.setState({ retFlight: currentflight });  alert("Flight Selected !\nPlease proceed to the next page");}}>
            Select
          </Button>
      </CardBody>
      </Card>
      

      )
  )}
        </FormGroup>
      
    </div>
    
    );
  
  }

  step3Content() {
    console.log('selected dep flight:',this.state.depFlight);
    console.log('selected ret flight:',this.state.retFlight);

    // return(<>summary</>)
    // if(this.state.depFlight.length==0 || this.state.retFlight.length==0) {
    //   return (<div>
    //     <h1>Sorry no flights selected </h1> <br></br>
    //     <h1>Please go back to our search page</h1>
    //     </div>)
    // }

    
    return(
     <> 
     <h1>Please proceed to seats page to select your seat</h1>
    <div class="ticket">
  <div id="banner">
    <div id="topbanner"></div>
    <span id="mainbanner">
      <img src="https://lukw4l.de/utils/media/assets/flightticket/plane_logo.png"></img>
      Shawarma Eaters Airlines
    </span>
    <span id="tearoffbanner">
      <img src="https://lukw4l.de/utils/media/assets/flightticket/plane_logo.png"></img>
      Shawarma Eaters Airlines
    </span>
  </div>
  <div id="barcode">
  <Label>Flight Number : WG33</Label> <br></br>
  </div>
  <div id="data">
    <div id="maindata">
       <div class="box">
        <span class="header">
          Passenger Name
        </span>
        <span class="body">
        <Label>Username : Anas Anas</Label> <br></br>
        </span> 
      </div>
      <div class="box">
        <span class="header">
          Flight Number
        </span>
        <span class="body">
        <Label>Flight Number : {this.state.depFlight.flight_number}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
          From
        </span>
        <span class="body">
        <Label>depAirport : {this.state.depFlight.depAirport}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
          Date
        </span>
        <span class="body">
        <Label>Departure : {this.state.depFlight.departure}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
          To
        </span>
        <span class="body">
        <Label>arrAirport : {this.state.depFlight.arrAirport}</Label> <br></br>
        </span>
      </div>
      <div class="box">
      </div>
     

      <div id="tearoffdata">
        <div class="box">
          <span class="header">
            Passenger Name
          </span>
          <span class="body">
          <Label>Username : {this.state.user.firstname && this.state.user.lastname}</Label> <br></br>
          </span>
        </div>
        <div class="box">
          <span class="header">
            Flight Number
          </span>
          <span class="body">
          <Label>Flight Number : {this.state.depFlight.flight_number}</Label> <br></br>
          </span>
        </div>
        <div class="box">
          <span class="header">
            Date
          </span>
          <span class="body">
          <Label>Departure : {this.state.depFlight.departure}</Label> <br></br>
          </span>
        </div>
       
        <div class="box seat">
          <span class="header">
            Seat
          </span>
          <span class="body">
          <Label>Seat :{this.state.depFlight.economy_seats}</Label> <br></br>
          </span>
        </div>
      </div>
    </div>

    <div id="holes">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  </div>
  <div class="ticket">
  <div id="banner">
    <div id="topbanner"></div>
    <span id="mainbanner">
      <img src="https://lukw4l.de/utils/media/assets/flightticket/plane_logo.png"></img>
      Shawarma Eaters Airlines
    </span>
    <span id="tearoffbanner">
      <img src="https://lukw4l.de/utils/media/assets/flightticket/plane_logo.png"></img>
      Shawarma Eaters Airlines
    </span>
  </div>
  <div id="barcode">
  <Label>Flight Number : {this.state.retFlight.flight_number}</Label> <br></br>
  </div>
  <div id="data">
    <div id="maindata">
       {/* <div class="box">
        <span class="header">
          Passenger Name
        </span>
        <span class="body">
        <Label>Username : {this.state.user.firstname && this.state.user.lastname}</Label> <br></br>
        </span> 
      </div> */}
      <div class="box">
        <span class="header">
          Flight Number
        </span>
        <span class="body">
        <Label>Flight Number : {this.state.retFlight.flight_number}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
          From
        </span>
        <span class="body">
        <Label>depAirport : {this.state.retFlight.depAirport}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
          Date
        </span>
        <span class="body">
        <Label>Departure : {this.state.retFlight.departure}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
          To
        </span>
        <span class="body">
        <Label>arrAirport : {this.state.retFlight.arrAirport}</Label> <br></br>
        </span>
      </div>
      <div class="box">
      </div>
     

      <div id="tearoffdata">
        {/* <div class="box">
          <span class="header">
            Passenger Name
          </span>
          <span class="body">
          <Label>Username : {this.state.user.firstname && this.state.user.lastname}</Label> <br></br>
          </span>
        </div> */}
        <div class="box">
          <span class="header">
            Flight Number
          </span>
          <span class="body">
          <Label>Flight Number : {this.state.retFlight.flight_number}</Label> <br></br>
          </span>
        </div>
        <div class="box">
          <span class="header">
            Date
          </span>
          <span class="body">
          <Label>Departure : {this.state.retFlight.departure}</Label> <br></br>
          </span>
        </div>
       
        <div class="box seat">
          <span class="header">
            Seat
          </span>
          <span class="body">
          <Label>Seat :{this.state.retFlight.economy_seats}</Label> <br></br>
          </span>
        </div>
      </div>
    </div>

    <div id="holes">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  </div>
  </> 
    );



  
  }

  step1ContentEmpty(){      
      return (
      <div>
        <h1>Sorry no departure flights match your search in our database </h1> <br></br>
        <h1>Please go back to our search page</h1>
        {/* <button onClick={this.fetchData}>Fetch data</button> */}
        </div>);
    }


  step2ContentEmpty(){  
      return (
              <div>
                <h1>Sorry no return flights match your search in our database </h1> <br></br>
                <h1>Please go back to our search page</h1>
                </div>
                );

  }


  // Trigger an alert on form submission
  //make it normal func if didnt work
  // handleSubmit = ()=> window.location('/');
  //  event => {
  //   // event.preventDefault();
  //   //window.location('/myBookings/61a8d3f3ef7267e7fe6a6d4c')
  //   return(<>
  //     <Redirect
  //       to={{
  //       pathname: "/myBookings/61a8d3f3ef7267e7fe6a6d4c"
  //     }}
  //   />
  //   </>)
  //   // alert(`Your Departure Flight detail: \n 
  //   //   Your Departure Flight ID: ${this.state.depFlight} \n 
  //   //   Your Return Flight ID: ${this.state.retFlight}`);
    
  // };


  render() {
  //   if(this.state.dep_flights.length!=0 || this.state.ret_flights.length!=0)  {
  //   return (
  //     <div class="MasterForm">

  //     <StepProgressBar 
  //       startingStep={0}
  //       wrapperClass="progress-wrapper-custom"
  //       onSubmit={this.handleSubmit}
  //       submitBtnName="Submit"
  //       previousBtnName="Previous"
  //       nextBtnName="Next"
  //       steps={[
  //         {
  //           label: "Step 1",
  //           name: "step 1",
  //           content: this.step1Content(),
  //           validator:this.step1Validator
  //         },
  //         {
  //           label: "Step 2",
  //           name: "step 2",
  //           content: this.step2Content(),
  //           validator: this.step2Validator
  //         },
  //         {
  //           label: "Step 3",
  //           name: "step 3",
  //           content: this.step3Content(),
  //           validator: this.step3Validator
  //         }
  //       ]}
  //     />
  //   </div>
  //   );
  //     }
  //     else
  // {
  //   return( <div></div>);
  // }



   if(this.state.dep_flights.length==0 && this.state.ret_flights.length==0)  {
    return (<div>No departure and arrival flights.</div>);

    }
   else if(this.state.dep_flights.length==0 && this.state.ret_flights.length!=0 ){
    return (
      <div class="MasterForm">

      <StepProgressBar 
        startingStep={0}
        wrapperClass="progress-wrapper-custom"
        onSubmit={this.handleSubmit}
        submitBtnName="Submit"
        previousBtnName="Previous"
        nextBtnName="Next"
        steps={[
          {
            label: "Step 1",
            name: "step 1",
            content: this.step1ContentEmpty(),
            validator:true
          },
          {
            label: "Step 2",
            name: "step 2",
            content: this.step2Content(),
            validator: true
          },
          {
            label: "Step 3",
            name: "step 3",
            content: this.step3Content(),
            validator: this.step3Validator
          }
        ]}
      />
    </div>
    );
   
   }
   else if(this.state.ret_flights.length!=0 && this.state.ret_flights.length==0){
    return (
      <div class="MasterForm">

      <StepProgressBar 
        startingStep={0}
        wrapperClass="progress-wrapper-custom"
        onSubmit={this.handleSubmit}
        submitBtnName="Submit"
        previousBtnName="Previous"
        nextBtnName="Next"
        steps={[
          {
            label: "Step 1",
            name: "step 1",
            content: this.step1Content(),
            validator:true
          },
          {
            label: "Step 2",
            name: "step 2",
            content: this.step2ContentEmpty(),
            validator: true
          },
          {
            label: "Step 3",
            name: "step 3",
            content: this.step3Content(),
            validator: this.step3Validator
          }
        ]}
      />
    </div>
    );
   }
   else{

    return (
      <div class="MasterForm">

      <StepProgressBar 
        startingStep={0}
        wrapperClass="progress-wrapper-custom"
        onSubmit={this.handleSubmit}
        submitBtnName="Submit"
        previousBtnName="Previous"
        nextBtnName="Next"
        steps={[
          {
            label: "Step 1",
            name: "step 1",
            content: this.step1Content(),
            validator:this.step1Validator
          },
          {
            label: "Step 2",
            name: "step 2",
            content: this.step2Content(),
            validator: this.step2Validator
          },
          {
            label: "Step 3",
            name: "step 3",
            content: this.step3Content(),
            validator: this.step3Validator
          }
        ]}
      />
    </div>
    );
   }

  }
  
}

export default MasterForm;



// function a(){
//   if(this.state.dep_flights.length==0 && this.state.ret_flights.length==0)  {
//     return (<div>No departure and arrival flights.</div>);

//     }
//   else if(this.state.dep_flights.length==0 && this.state.ret_flights.length!=0 ){
//     return (
//       <div class="MasterForm">

//       <StepProgressBar 
//         startingStep={0}
//         wrapperClass="progress-wrapper-custom"
//         onSubmit={this.handleSubmit}
//         submitBtnName="Submit"
//         previousBtnName="Previous"
//         nextBtnName="Next"
//         steps={[
//           {
//             label: "Step 1",
//             name: "step 1",
//             content: this.step1ContentEmpty(),
//             validator:true
//           },
//           {
//             label: "Step 2",
//             name: "step 2",
//             content: this.step2Content(),
//             validator: true
//           },
//           {
//             label: "Step 3",
//             name: "step 3",
//             content: this.step3Content(),
//             validator: this.step3Validator
//           }
//         ]}
//       />
//     </div>
//     );
   
//    }
//    else if(this.state.ret_flights.length!=0 && this.state.ret_flights.length==0){
//     return (
//       <div class="MasterForm">

//       <StepProgressBar 
//         startingStep={0}
//         wrapperClass="progress-wrapper-custom"
//         onSubmit={this.handleSubmit}
//         submitBtnName="Submit"
//         previousBtnName="Previous"
//         nextBtnName="Next"
//         steps={[
//           {
//             label: "Step 1",
//             name: "step 1",
//             content: this.step1Content(),
//             validator:true
//           },
//           {
//             label: "Step 2",
//             name: "step 2",
//             content: this.step2ContentEmpty(),
//             validator: true
//           },
//           {
//             label: "Step 3",
//             name: "step 3",
//             content: this.step3Content(),
//             validator: this.step3Validator
//           }
//         ]}
//       />
//     </div>
//     );
//    }
//    else{

//     return (
//       <div class="MasterForm">

//       <StepProgressBar 
//         startingStep={0}
//         wrapperClass="progress-wrapper-custom"
//         onSubmit={this.handleSubmit}
//         submitBtnName="Submit"
//         previousBtnName="Previous"
//         nextBtnName="Next"
//         steps={[
//           {
//             label: "Step 1",
//             name: "step 1",
//             content: this.step1Content(),
//             validator:this.step1Validator
//           },
//           {
//             label: "Step 2",
//             name: "step 2",
//             content: this.step2Content(),
//             validator: this.step2Validator
//           },
//           {
//             label: "Step 3",
//             name: "step 3",
//             content: this.step3Content(),
//             validator: this.step3Validator
//           }
//         ]}
//       />
//     </div>
//     );
//    }
// }

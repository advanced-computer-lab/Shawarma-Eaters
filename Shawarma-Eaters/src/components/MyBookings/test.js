
import React, { useState } from "react";
import axios from 'axios';
import Items from './item'
 
const DisplayBookings = () => { 

    const [bookings,setBookings] = useState([{}]);
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
        .get(`http://localhost:5000/users/userBookings/`+window.location.pathname.substr(12)).then(booking => setBookings(booking.data))
        .catch((err) => console.log(err))
        console.log(bookings);
    }





    const DeletingBookings = async () => {
        const UserId = getId(2);  //endpoint/:Userid/:BookId
        const BookID = getId(1);
        const deleted = await axios
            .put(`http://localhost:5000/users/DeleteBookings/${UserId}/${BookID}`).then(await axios
            .delete(`http://localhost:5000/booking/${BookID}`))
            .catch((err) => console.log(err))
            console.log(bookings);
        }




    

      
return (
    <>
                    <button onClick={() =>GetBookings()}>DELETE</button>
        <div>
            <Items items = {bookings}/>
        </div>
        <h1>SENDING MAIL WHEN THE DELETE BUTTON IS THE PREESED</h1>
    </>
)
};
 
export default DisplayBookings;

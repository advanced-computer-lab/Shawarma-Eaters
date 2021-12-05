import React from "react";
import axios from 'axios'
 
const EmailSend = () => { 
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
  const sendMail =  async() => {  //async before ()
    console.log(window.location.pathname.substr(6));
    const response = await axios 
      .get("http://localhost:5000/users/sendingMail/"+getId(1)).then(window.location = '/myBookings/'+getId(1))
      .catch((err) => console.log(err));}
return (
    <>
        <button onClick={sendMail}>DELETE</button>
        <h1>SENDING MAIL WHEN THE DELETE BUTTON IS THE PREESED</h1>
    </>
)
};
 
export default EmailSend;

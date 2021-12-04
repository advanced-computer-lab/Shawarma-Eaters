import React from "react";
import axios from 'axios'
 
const EmailSend = () => { 
  const sendMail =  async() => {  //async before ()
    console.log(window.location.pathname.substr(6));
    const response = await axios  //await before axios
      .get("http://localhost:5000/users/sendingMail/"+window.location.pathname.substr(6)).then()
      .catch((err) => console.log(err));}
return (
    <>
        <button onClick={sendMail}>DELETE</button>
        <h1>SENDING MAIL WHEN THE DELETE BUTTON IS THE PREESED</h1>
    </>
)
};
 
export default EmailSend;


import React, { useState } from "react";
import axios from 'axios'
 
const EmailSend = () => { 
  const sendMail = async () => {
    const response = await axios
      .get("http://localhost:5000/users/sendingMail")
      .catch((err) => console.log(err));}
return (
    <>
        <button onClick={sendMail}>DELETE</button>
        <h1>SENDING MAIL WHEN THE DELETE BUTTON IS THE PREESED</h1>
    </>
)
};
 
export default EmailSend;

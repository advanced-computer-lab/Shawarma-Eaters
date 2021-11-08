import React, { Component } from 'react';

function Popup(props){
return (props.trigger)?(
<div className="popup">
    <div className="popup-inner">
        <button classname="close-btn" onClick={() => props.setTrigger(false)}>close</button>
        {props.children}
    </div>
</div>    
):"";
}
export default Popup
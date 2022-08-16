import React, { useState } from 'react';

const Popup = props => {
    return (
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>x</span>
          {props.classes.length==0?
          <div>No Classes scheduled today.</div>:
          <ul>
            {props.classes.map((value,index)=>{
                return (
                    <li>
                        {value.event_name +" - "+value.event_hour+":"+value.event_min}
                    </li>
                )
            })}
          </ul>}
          
        </div>
      </div>
    );
  };
  
  export default Popup;
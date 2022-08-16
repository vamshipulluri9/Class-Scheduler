import React, { useState } from 'react';


export default function ConstDatePopup (props) {
    var date = props.date;
    var month = props.month;
    var year = props.year;
    var teacher_id = props.teacher_id;

    const [hour,setHour] = useState(0);
    const [min,setMin] = useState(0);
    const [info,setInfo] = useState("");
    const [loading,setLoading] = useState(false);

    const hours = function(){
        var rows = [];
        for(var i=0;i<24;i++){
            rows.push(
                <option value={i}>{i<10?"0"+i:i+""}</option>
            )
        }
        return rows;
    }

    const minutes = function(){
        var rows = [];
        for(var i=0;i<60;i+=10){
            rows.push(
                <option value={i}>{i==0?"00":i}</option>
            )
        }
        return rows;
    }

    function changeHour(e){
        setHour(e.target.value);
    }
    function changeMin(e){
        setMin(e.target.value);
    }
    function changeInfo(e){
        setInfo(e.target.value)
    }
    function onClickButton(e){
        //alert("clicked");
        setLoading(true);
        fetch("/classes",{
            method : "POST",
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify({
                date: date+"/"+(month+1)+"/"+year,
                teacher_id : teacher_id,
                class_name : info,
                time_hrs : hour,
                time_min : min
            }),
        })
        .then(res=>{
            if(res.ok){
                setLoading(false);
                alert("updated schedule.");
                props.handleClose();
            }
            else {
                setLoading(false);
                //alert("Sorry , Try another Slot");
                throw new Error("response : "+res.status);
            }
        })
        .catch(e=>alert("Sorry , Try another Slot"));

        
        
        
    }



    return (
        loading?<div>LOADING.....</div>:
      <div className="popup-box">
        <div className="box">

            <span className="close-icon" onClick={props.handleClose}>x</span>

          <div>
              <h3>{ "Adding class on "+ date+"/"+(month+1)+"/"+year}</h3>
          </div>

          <div className="time_selectors">
              <div>
                  <h5>Select time :</h5>
              </div>
              <div className="selectors">
                  <label for="hours">hour : </label>
                   <select name="hours" id="hours" size="4" value={hour} onChange={changeHour}>
                       {hours()}
                   </select>
              </div>
              <div className="selectors">
                    <label for="min">minutes : </label>
                    <select name="min" id="min" size="4" value={min} onChange={changeMin}>
                        {minutes()}
                    </select>
              </div>
          </div>

          <div className="class_info">
                <label for="class_info">Class Info:</label>
                <input type="text" id="class_info" name="class_info" onChange={changeInfo}/>
          </div>

          <div>
              <button onClick={onClickButton}>
                  confirm
              </button>
          </div>
          
        </div>
      </div>
    );
  };
  

import React, { useState } from 'react';


export default function VarDatePopup (props) {
    var teacher_id = props.teacher_id;

    const [date,setDate] = useState({day:null,month:null,year:null});
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

    const years = function(){
        var rows = [];
        for(var i=2015;i<=2030;i++){
            rows.push(
                <option value={i}>{i}</option>
            )
        }
        return rows;
    }

    const monthsOfYear = ["January", "Febuary", "March", "April" , "May", "June", "July",
     "August", "September", "October", "November", "December"];

    const months = function(){
        var rows = [];
        for(var i=0;i<12;i++){
            rows.push(
                <option value={i}>{monthsOfYear[i]}</option>
            )
        }
        return rows;
    }

    const days = function(){
        var lastDayOfMonth = new Date(date.year,parseInt(date.month)+1,0).getDate();
        //alert(date.year+ " "+date.month+" "+lastDayOfMonth);
        var rows = []; 
        for(var i=1;i<=lastDayOfMonth;i++){
            rows.push(
                <option value={i}>{i}</option>
            )
        }
        return rows;
    }

    function ChangeDate(e){
        //alert(e.target.value);
        setDate((prevState)=>{
            return{...prevState,[e.target.name]: e.target.value}
        });
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
                date: date.day+"/"+(parseInt(date.month)+1)+"/"+date.year,
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
              <h3>{"Adding class"}</h3>
          </div>

          <div className="date_selector">
                <div>
                  <h5>Select Date :</h5>
                </div>
                <div className="selectors">
                    <label for="year">year : </label>
                    <select name="year" id="year" size="3" value={date.year} onChange={ChangeDate}>
                       {years()}
                    </select>
                </div>
                {date.year&&<div className="selectors">
                    <label for="month">month : </label>
                    <select name="month" id="month" size="3" value={date.month} onChange={ChangeDate}>
                       {months()}
                    </select>
                </div>}
                {date.month&&<div className="selectors">
                    <label for="day">date : </label>
                    <select name="day" id="day" size="3" value={date.day} onChange={ChangeDate}>
                       {days()}
                    </select>
                </div>}
          </div>

          <div className="time_selectors">
              <div>
                  <h5>Select time :</h5>
              </div>
              <div className="selectors">
                    <label for="hours">hours : </label>
                  <select name="hours" id="hours" size="3" value={hour} onChange={changeHour}>
                       {hours()}
                   </select>
              </div>
              <div className="selectors">
                    <label for="min">minutes : </label>
                    <select name="min" id="min" size="3" value={min} onChange={changeMin}>
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
  

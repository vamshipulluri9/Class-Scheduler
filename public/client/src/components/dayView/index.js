import React, { useState, useEffect } from 'react';
import ConstDatePopup from '../addPopUps/constDatePopUp';

export default function DayView(props){

    var date = props.date;
    var month = props.month;
    var year = props.year;
    var teacher_id = props.teacher_id;

    const curr_date = new Date(year,month,date);

    const [classes,setClasses] = useState([]);
    const [loading,setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        getClassesMain();
    }, [props])


    async function getClassesMain(){
        setLoading(true);

        fetch('/classes?'+ new URLSearchParams({start_date:date+"/"+(month+1)+"/"+year, end_date:date+"/"+(month+1)+"/"+year, teacher_id:teacher_id}),{
            method : "GET"
        })
        .then((res)=>{
            if(res.ok){
                return res.json();
            }
            else {
                throw new Error(res.statusText+" "+res.status);
            }
        })
        .then((data)=>{
            console.log(data[0]);
            setLoading(false);
            setClasses(data);
        })
        .catch(e=>{setLoading(false); console.log(e.message)})
        .catch(e=>{setLoading(false); console.log(e)});
    }

    

    const togglePopup = () => {
        if(isOpen) getClassesMain();
        setIsOpen(!isOpen);
    }

    function addClass(){
        //alert("clicked");
        togglePopup();
    }

    const monthsOfYear = ["January", "Febuary", "March", "April" , "May", "June", "July",
     "August", "September", "October", "November", "December"];

    const daysOfWeek = ["Sunday", "Monday" , "Tuesday", "Wednesday" , "Thursday", "Friday" ,"Saturday"];

    return(
        loading?<div>LOADING.....</div>:
        <div className="dayViewClass">
            <div className="dayDetails">

                <h1>{date + " " + monthsOfYear[month] +" "+year}</h1>
                <h3>{daysOfWeek[curr_date.getDay()]}</h3>
            </div>
            <div className ="classesDetails">
                <h2>Classes Schedule</h2>
                <ul>
                    {classes.map((value,index)=>{
                        return (
                            <li>
                                {value.event_name + " - " + value.event_hour+":"+value.event_min}
                            </li>
                        )
                    })}
                </ul>
                <div className="addClassToDate">
                    <div className="addButton">
                        <button onClick={addClass}>+</button>
                    </div>
                    <div>
                        {isOpen && <ConstDatePopup date={date} month={month} year={year} teacher_id={teacher_id} handleClose={togglePopup}></ConstDatePopup>}
                    </div>
                </div>
            </div>
        </div>
    )
}
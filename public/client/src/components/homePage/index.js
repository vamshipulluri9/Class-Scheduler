import React, { useEffect, useState } from 'react';

import WeekView from '../weekView';
import MonthView from '../monthView';
import DayView from '../dayView';
import VarDatePopup from '../addPopUps/varDatePopUp';
import "../../css/index2.css";
import "../../css/dayClasses.css";
import "../../css/listClasses.css";
import "../../css/dayview.css";
import "../../css/popup.css";

export default function HomePage(props){

    const [teacher_id,setTeacherId] = useState(props.teacher_id);
    const [view,setView] = useState(3);
    const [teachers,setTeachersList] = useState([]);
    const [loading,setLoading] = useState(false);
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [today,setToday] = useState(new Date());

    useEffect(()=>{
        getTeachers();
    },[props]);


    function selectTeacherId(event){
        if(!props.isAdmin)alert(
            "Sorry teacher cant be changed. Require Admin Previlage"
        );else{
            setTeacherId(event.target.value);
            //alert(event.target.value);
        }
        
    }

    function selectView(event){
        setView(event.target.value);
        //alert(event.target.value);
    }

    const togglePopupAdd = () => {
        if(isOpenAdd){
            var view_temp = view;
            var teacher_id_temp = teacher_id;
            setTeacherId(teacher_id_temp);
            setView(view_temp);
        };
        setIsOpenAdd(!isOpenAdd);
    }

    function changeDate(num){
        if(view==1){
            setToday(new Date(today.getFullYear(),today.getMonth(),today.getDate()+1*num))
        }
        else if(view==2){
            setToday(new Date(today.getFullYear(),today.getMonth(),today.getDate()+7*num))
        }
        else {
            setToday(new Date(today.getFullYear(),today.getMonth()+1*num,today.getDate()))
        }

    }

    async function getTeachers(){ 
        setLoading(true);

        fetch('/teachers',{
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
            setTeachersList(data);
        })
        .catch(e=>{setLoading(false); console.log(e.message)})
        .catch(e=>{setLoading(false); console.log(e)});
    }

    return(
        loading?<div>LOADING.....</div>:
        <div className="homepage">

            <div className="sideSelector">
                <h2>Control Panel</h2>
                <div className="teacher_selector">
                    <h4>Filter By Teacher Name :</h4>
                    <select name="teachers" id="teachers" value={teacher_id} onChange={selectTeacherId}>
                        {teachers.map((value,index)=>{
                            return (
                                <option value={value.teacher_id}>{value.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="view_selector">
                    <h4>Change view as you desire :</h4>
                    <select name = "view" id = "view" value={view} onChange={selectView}>
                        <option value="1">Day View</option>
                        <option value="2">Week View</option>
                        <option value="3">Month View</option>
                    </select>
                </div>
                <div className="classAdder">
                    <h4>Schedule a class:</h4>
                    <button onClick={()=>{togglePopupAdd()}}>
                        Add Class
                    </button>
                </div>
                <div className="navigator">
                    <div>
                    <h4>Navigate through dates:</h4>
                    </div>

                    <div>
                    <button onClick={()=>{changeDate(-1)}}>
                        Prev
                    </button>
                    <button onClick={()=>{changeDate(1)}}>
                        next
                    </button>
                    </div>
                </div>
                <div className="Logout">
                        <button onClick={()=>{props.logOut()}}>LogOut</button>
                </div>
            </div>

            <div className="viewer">
                <h1> Class Scheduler </h1>
                <div className="viewDiv">
                {view==3?<MonthView {... {month : today.getMonth(), year : today.getFullYear(),teacher_id:teacher_id}}></MonthView>
                    :view==2?<WeekView {... {date : today.getDate(), month: today.getMonth() ,year : today.getFullYear(),teacher_id : teacher_id}}></WeekView>
                    : <DayView {... {date:today.getDate(), month:today.getMonth(),year:today.getFullYear(),teacher_id: teacher_id}}></DayView>}
                </div>
            </div>

            {isOpenAdd && <VarDatePopup  teacher_id={teacher_id} handleClose={togglePopupAdd}></VarDatePopup>}
        </div>
    )
}
import React, { useEffect, useState } from 'react';
import DayClasses from './dayClasses';

export default function MonthView(props){

    var month = props["month"];
    var year = props["year"];
    var teacher_id = props["teacher_id"];

    var noDaysInMonth = new Date(year,month+1,0).getDate();
    var startingDayOfMonth = new Date(year,month,1).getDay();

    

    const monthsOfYear = ["January", "Febuary", "March", "April" , "May", "June", "July",
     "August", "September", "October", "November", "December"];

    const daysOfWeek = ["Sunday", "Monday" , "Tuesday", "Wednesday" , "Thursday", "Friday" ,"Saturday"];

    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        getClassesMain();
    },[props]);


    async function getClassesMain(){
        setLoading(true);

        fetch('/classes?'+ new URLSearchParams({start_date:1+"/"+(month+1)+"/"+year,end_date:noDaysInMonth+"/"+(month+1)+"/"+year,teacher_id:teacher_id}),{
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


    function getDateRows(){
        var rows = [];
        var dateNo = 1,weekNo =1,j=0;
        while(dateNo<=noDaysInMonth){
            var days = [];
            var dayNo =0;
            while(dayNo<7){
                

                if(weekNo==1&&dayNo<startingDayOfMonth)days.push(
                    <div className = "tableBodyCell">
                        <DayClasses {... {date : null , month: month, year : year ,classes:[] }} ></DayClasses>
                    </div>
                );
                else if(dateNo>noDaysInMonth){
                        days.push(
                            <div className = "tableBodyCell">
                                <DayClasses {... {date : null , month: month, year : year ,classes:[] }} ></DayClasses>
                            </div>
                        );
                }
                else{

                    var classes_on_date = [];

                    while(j<classes.length){
                        var temp = new Date(classes[j].event_date);
        
                       if(temp.getDate()===dateNo && temp.getFullYear()===year && temp.getMonth()===month){
        
                            classes_on_date.push(classes[j]);
                            j++;
                    
                       }else{
                           break;
                       }
        
                    }

                    days.push(
                        <div className = "tableBodyCell">
                            <DayClasses {... {date : dateNo , month: month, year : year ,
                                classes:classes_on_date,teacher_id: teacher_id , handleClosePopUp: getClassesMain }} ></DayClasses>
                        </div>
                    );
                    dateNo++;
                }
                dayNo++;
            }

            weekNo++;
            rows.push(
                <div className = "tableRow">
                    {days}
                </div>
            );
        
        }
        return rows;
    }
    



    return (
        loading?<div>LOADING.....</div>:
        <div className = "tableResponsive">

            <div className = "tableHeading">
                {monthsOfYear[month] + " " +year}
            </div>

            <div className = "tableHeaders">
                {
                    daysOfWeek.map((val,index)=>{
                        return(
                        <div className="tableHeaderCell">
                            {val}
                        </div>
                    )
                    })
                }
            </div>

            <div className = "tableBody">
                {getDateRows()}
            </div>

        </div>
    );
}
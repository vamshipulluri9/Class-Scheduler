import React,{useState,useEffect} from 'react';
import ListClasses from './listClasses';

export default function WeekView(props){

    var date_given = props["date"];
    var month_given = props["month"];
    var year_given = props["year"];
    var teacher_id = props["teacher_id"];

    //alert("teacherId = "+teacher_id);
    

    var start_date = new Date(year_given,month_given,date_given);
    //alert(start_date.getDate()+" "+start_date.getMonth()+" "+start_date.getDay());
    start_date.setDate(start_date.getDate() - start_date.getDay());
    //alert(start_date.getDate()+" "+start_date.getMonth()+" "+start_date.getDay());
    

    var last_date = new Date(start_date.getFullYear(),start_date.getMonth(),start_date.getDate()+6);

    const monthsOfYear = ["January", "Febuary", "March", "April" , "May", "June", "July",
     "August", "September", "October", "November", "December"];

    const daysOfWeek = ["Sunday", "Monday" , "Tuesday", "Wednesday" , "Thursday", "Friday" ,"Saturday"];

    const [classes, setClasses] = useState([]);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        getClassesMain();
    }, [props])

    async function getClassesMain(){
        setloading(true);

        fetch('/classes?'+ new URLSearchParams({start_date:dateToString(start_date),end_date:dateToString(last_date),teacher_id:teacher_id}),{
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
            setloading(false);
            setClasses(data);
        })
        .catch(e=>{setloading(false); console.log(e.message)})
        .catch(e=>{setloading(false); console.log(e)});
    }


    function dateToString(date){
        var temp = date;
        return temp.getDate()+"/"+(temp.getMonth()+1)+"/"+temp.getFullYear();
        //return temp.toString();
    }

    

    
    function getRowDates(){
        var row1 = [];
        var row2 = [];

        var curr_date = new Date(start_date.getFullYear(),start_date.getMonth(),start_date.getDate());
        
        var i = 0;
        var j=0;
        
        while(i<=6){

            row1.push(
                <div className = "tableBodyCell">
                    {dateToString(curr_date)}
                </div>
            )
            var classes_on_date = [];
            
            //console.log(classes.length);
            //console.log(j<classes.length);

            while(j<classes.length){
                var temp = new Date(classes[j].event_date);

               if(temp.getDate()===curr_date.getDate() && temp.getFullYear()===curr_date.getFullYear() && temp.getMonth()===curr_date.getMonth()){

                    classes_on_date.push(classes[j]);
                    console.log(dateToString(curr_date));
                    j++;
            
               }else{
                   break;
               }

            }

            row2.push(
                <div className = "tableBodyCell">
                     <ListClasses {... {classes : classes_on_date ,handleClosePopUp: getClassesMain,
                        date:curr_date.getDate(),month:curr_date.getMonth(),year:curr_date.getFullYear(),teacher_id:teacher_id}}></ListClasses> 
                </div>
            )
            curr_date.setDate(curr_date.getDate()+1);
            i++;
        }

        return [<div className="tableRow">{row1}</div>, <div className="tableRow">{row2}</div>];
    }


    return (
        loading?<div>LOADING.....</div>:
        <div className = "tableResponsive">

            <div className="tableHeading">
                {"Weekly view - " + dateToString(start_date) +" to "+dateToString(last_date) }
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

            <div className="tableBody">
                    {getRowDates()}
            </div>
            
        </div>
    );
}
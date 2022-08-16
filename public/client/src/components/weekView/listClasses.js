import React,{useState} from "react";
import ConstDatePopup from "../addPopUps/constDatePopUp";

export default function ListClasses(props){
    const classes = props["classes"];
    var date = props.date
    var month = props.month
    var year = props.year
    var teacher_id = props.teacher_id;

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    
    const togglePopupAdd = () => {
        if(isOpenAdd)props.handleClosePopUp();
        setIsOpenAdd(!isOpenAdd);
    }
    

    return (
        <div className="ListView">
            <div className="ListWrapper">
                {
                classes.length >0 ?
                    <ul>
                    {
                    classes.map((value,index)=>{
                        return (
                            <li>
                                {value.event_name +" - "+value.event_hour+":"+value.event_min}
                            </li>
                        )
                    })
                    }
                    </ul>
                :
                    <div>
                        NO EVENTS RIGHT NOW TODAY...
                    </div>
                }
                
            </div>
            <div className="addClassToDate">
                <div className="addButton">
                    <button onClick={()=>togglePopupAdd()}>+</button>
                </div>
                <div>
                    {isOpenAdd && <ConstDatePopup date={date} month={month} year={year} teacher_id={teacher_id} handleClose={togglePopupAdd}></ConstDatePopup>}
                </div>
            </div>
        </div>
    )
}
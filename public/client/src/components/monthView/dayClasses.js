import React,{useState} from 'react';
import Popup from './popup';
import ConstDatePopup from '../addPopUps/constDatePopUp';

export default function DayClasses (props){
    const date = props["date"];
    const month = props["month"];
    const year = props["year"];
    const teacher_id = props["teacher_id"]; 
    const classes = props["classes"];

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAdd, setIsOpenAdd] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const togglePopupAdd = () => {
        if(isOpenAdd)props.handleClosePopUp();
        setIsOpenAdd(!isOpenAdd);
    }
    
    
    if(date!=null)return(
        <div className="dayClasses">
            <div className="datenevents" onClick={(e)=>{togglePopup()}} >
                <div> 
                    {date}
                </div>
                <div>
                    {classes.length + " events"}
                </div>
                <div>
                    <a href="#" onClick={e=>{e.preventDefault()}}>check</a>
                </div>
            </div>
            <div className="addClassToDate">
                <div className="addButton">
                    <button onClick={()=>togglePopupAdd()}>+</button>
                </div>
                <div>
                    {isOpenAdd && <ConstDatePopup date={date} month={month} year={year} teacher_id={teacher_id} handleClose={togglePopupAdd}></ConstDatePopup>}
                </div>
            </div>
            
            {isOpen && <Popup
                classes={classes}
                handleClose={togglePopup}
            />}

        </div>
    )
    else return (
            <div>
                ------
            </div>
    );

}
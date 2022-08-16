var express = require('express');
var router = express.Router();
var db_services = require("../services/db");
const withAuth = require("./middleware");


router.get("/",withAuth,(req,res)=>{
    var start = req.query.start_date;
    var end = req.query.end_date;
    var teacher_id = req.query.teacher_id;
    var query_str = "SELECT * FROM `ClassSchedule` WHERE event_date >= STR_TO_DATE( ? , '%d/%m/%Y') AND event_date <= STR_TO_DATE( ?, '%d/%m/%Y') and event_teacher_id = ? ORDER BY event_date ASC ";
    var params = [start,end,teacher_id];

    console.log(start+" "+end+" "+teacher_id);

    try{
            db_services.query(query_str,params)
            .then((results)=>{
                res.json(results).status(200);
                console.log("Results obtained");
                console.log(results);
            }).catch(e=>{
                console.log(e);
            });
        
    }
    catch(e){
        res.status(500).send("Internal server error");
        console.log("Internal server error");
    }
    
})

router.post("/",withAuth,(req,res)=>{
    var date = req.body.date;
    var teacher_id = req.body.teacher_id;
    var class_name = req.body.class_name;
    var time_hrs = req.body.time_hrs;
    var time_min = req.body.time_min;
    var temp = parseInt(time_hrs)*60+parseInt(time_min);
    console.log(req.body);
    console.log(temp);

    var query_str = "INSERT into ClassSchedule (event_name,event_date,event_hour,event_min,event_teacher_id) VALUES (?,STR_TO_DATE(?,'%d/%m/%Y'),?,?,?)";
    var params = [class_name,date,time_hrs,time_min,teacher_id];
    var query_str1 = "SELECT * FROM ClassSchedule where event_date = STR_TO_DATE(?,'%d/%m/%Y') and ( ( (event_hour*60 + event_min)<= ? and (event_hour*60 + event_min) + 60 >= ? ) or ( (event_hour*60 + event_min)>=? and (event_hour*60 + event_min) -60 <=?) ) and event_teacher_id=?";
    var params1 = [date,temp,temp,temp,temp,teacher_id];
    try{
        db_services.query(query_str1,params1)
        .then((results)=>{
            console.log(results);
            if(results.length==0){
                try{
                db_services.query(query_str,params)
                .then((results1)=>{
                    res.json(results1).status(200);
                    console.log("event posted");
                })
                .catch( e =>{
                    console.log(e);
                });
                }
                catch(e){console.log(e)};
            }else{
                res.status(400).send("OVERFLOW");
                console.log("event posted");
            }
            
        })
        .catch( e =>{
            console.log(e);
        });
    
    }
    catch(e){
        res.status(500).send("Internal server error");
        console.log("Internal server error");
    }

})


module.exports = router;
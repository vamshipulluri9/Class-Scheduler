var express = require('express');
var router = express.Router();
var db_services = require("../services/db");

const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';



router.post("/",(req,res)=>{
    var username = req.body.username;
    var pass = req.body.pass;

    var query_str = "SELECT * FROM `LoginDetails` INNER JOIN Teachers on LoginDetails.teacher_id = Teachers.teacher_id WHERE username = ? ";
    var params = [username];

    console.log(req.body);

    try{
        db_services.query(query_str,params)
        .then((results)=>{
            console.log(results);
            if(results.length>0 && results[0]["pass"] == pass){
                const payload = { username:username, teacher_id: results[0]["teacher_id"],isAdmin:results[0]["admin"] };
                const token = jwt.sign(payload, secret, {
                expiresIn: '1h'
                });
                console.log(results[0]["admin"]);
                res.cookie('token', token, { httpOnly: true }).json({teacher_id: results[0]["teacher_id"],isAdmin: results[0]["admin"]});
            }else{
                res.status(500).send(error);
            }
        }).catch(e=>{
            res.status(500).send("error");
            console.log(e);
        });
    
}
catch(e){
    res.status(500).send("Internal server error");
    console.log("Internal server error");
}
})

router.get("/logout",(req,res)=>{
    console.log("Logout request");
    res.clearCookie("token").send(200);
})

module.exports = router;
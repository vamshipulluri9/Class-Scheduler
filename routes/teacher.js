var express = require('express');
var router = express.Router();
var db_services = require("../services/db");

const withAuth = require("./middleware");


router.get('/',withAuth,(req,res,next)=>{
    var query_str = "SELECT * FROM `Teachers` WHERE 1";

    try{
        db_services.query(query_str,[])
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

module.exports = router;
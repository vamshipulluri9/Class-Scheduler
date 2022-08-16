var express = require('express');
var router = express.Router();

const withAuth = require("./middleware");

router.get("/",withAuth,(req,res)=>{
    res.json({teacher_id:req.teacher_id , isAdmin:req.isAdmin})
})

module.exports = router;
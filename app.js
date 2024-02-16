const express = require('express')
const mongoose = require('mongoose')
const router = require("./router/router")
const bcrypt = require("bcrypt")
const app = express()

// server connect
const port = 3004


app.get("/save",(req,res)=>{
    res.send("hi hello world")
})
app.listen(port,()=>{
    console.log("server is listening On "+port);
})

// db connect 
const dburl = "mongodb://localhost:27017/Project1"
mongoose.connect(dburl)
.then((result)=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err)
})
app.use(express.json());
app.use(router)

module.exports =app
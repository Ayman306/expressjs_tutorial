const mongoose =require('mongoose')

mongoose.connect('mongodb://localhost:27017/expressjs_tutorial')
.then(()=>console.log("connected to db"))
.catch(()=>console.log("not connected"))

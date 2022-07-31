const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json());

const userRouter = require('./routes/userRoutes')
const noteRouter = require('./routes/noteRoutes')
app.use('/users',userRouter)
app.use('/notes',noteRouter)
// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
mongoose.connect("mongodb+srv://experience007:jgADEnQqC8MFFygn@cluster0.kpmnclp.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    app.listen(5000,()=>{
        console.log('Server is running')
    });
})
.catch((error)=>{
console.log(error)
});

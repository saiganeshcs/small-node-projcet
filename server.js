const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require("dotenv").config();
const app = express();
const connectDB = require('./config/dbconnection');

connectDB();

const PORT = process.env.PORT || 3000;

// app.get('/api/contacts',(req,res)=>{
//     res.status(200).json({'message':'welcome'})
// })

app.use(express.json())
app.use('/api/contacts',require("./routes/contactRoute"))
app.use('/api/users',require("./routes/userRoute"))
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
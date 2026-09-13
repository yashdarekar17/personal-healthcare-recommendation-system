require("dotenv").config();
const express = require("express");
const cors = require('cors');
const pool = require('./db');
const authRoutes = require('./routes/authRoutes');


const app = express();

app.use(cors({
    origin:[
        "localhost:5173",
    ]
}));

app.get('/',(req,res)=>{
    res.send("successfully connected to the backend");
})

app.use('/profile', authRoutes);

pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.error("Error executing query", err.stack);
    }
    else {
        console.log("Database connected successfully");
    }
})

const port = 3000
app.listen(port ,()=>{
   console.log(`server running on port ${port}`);
})
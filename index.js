require("dotenv").config();
const express = require("express");
const cors = require('cors');
const pool = require('./db');
const authRoutes = require('./routes/authRoutes');
const healthrouter = require('./routes/heathcareRoute');
const mlrouter = require('./routes/mlRoute');
const feedbackrouter = require('./routes/feedbackRoute');

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
    ]
}));

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("successfully connected to the backend");
})

app.use('/profile', authRoutes);
app.use('/health', healthrouter);
app.use('/ml', mlrouter);
app.use('/feedback', feedbackrouter);

pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.error("Error executing query", err.stack);
        res.status(500).json({message:"database connection failed"})
    }
    else {
        console.log("Database connected successfully");
    }
})

const port = 3000
app.listen(port ,()=>{
   console.log(`server running on port ${port}`);
})
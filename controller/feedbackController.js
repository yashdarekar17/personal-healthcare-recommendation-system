const pool = require('../db');

const feedbackcontroller = async(req , res)=>{
    try{
     const {user_id ,recommendation_id ,is_useful ,comments} = req.body;
     const query = (
        `INSERT INTO feedback (user_id ,recommendation_id ,is_useful ,comments)
        VALUES($1 ,$2 , $3 ,$4) RETURNING*`
     )
     const value = [user_id , recommendation_id , is_useful , comments];
     const result = await pool.query(query , value);
     res.status(200).json({
        message:"Feedback submitted successfully",
        feedback:result.rows[0]
     })
        
    }catch(err){
        res.status(500).json({message:"internal server error"})
    }
}

module.exports = {feedbackcontroller};
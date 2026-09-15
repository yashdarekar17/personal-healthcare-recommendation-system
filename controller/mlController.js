const pool = require('../db');
// const { runHealthPrediction } = require('../utils/jsMlModel');

const mlmodelcontroller = async(req ,res)=>{
    // try{
    //   const {user_id} = req.body
    //   const result = await pool.query(
    //     `SELECT * FROM health_profiles WHERE user_id = $1`,
    //     [user_id]
    //   )
    //   if(!result.rows[0]){
    //     return res.status(404).json({message:"health profile not found"});
    //   }

    //   const userProfile = result.rows[0];

    //   const mlPredictions = runHealthPrediction(userProfile);
    //   const query = (
    //     `INSERT INTO recommendations (user_id, category, content)
    //     VALUES 
    //     ($1, 'diet', $2),
    //     ($1, 'exercise', $3),
    //     ($1, 'wellness', $4)
    //     RETURNING *;`
    //   )

    //   const values = [
    //     user_id,
    //     mlPredictions.diet,
    //     mlPredictions.exercise,
    //     mlPredictions.wellness
    //   ]
    //   const savedRecommendations = await pool.query(query, values);
    //   res.status(200).json({
    //     message:"Recommendations generated successfully",
    //     recommendations: savedRecommendations.rows
    //   })

    // }catch(err){
    //     res.status(500).json({message:"internal server error"});
    // }
}

const getRecommendations = async(req , res)=>{
    // try{
    // const {user_id} = req.params;
    // const query = (
    //     `SELECT * FROM recommendations WHERE user_id = $1 ORDER BY created_at DESC`
    // )
    // const values = [user_id];
    // const result = await pool.query(query , values);
    // if(!result.rows[0]){
    //     res.status(404).json({
    //         message:"No recommendations found"
    //     })
    // }

    // res.status(200).json({
    //     message:"Recommendations fetched successfully",
    //     recommendations: result.rows[0]
    // })

    // }catch(err){
    //     res.status(500).json({message:"internal server error"});
    // }
}

module.exports = {mlmodelcontroller ,getRecommendations};
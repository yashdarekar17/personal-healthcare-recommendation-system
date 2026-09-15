const pool = require('../db');


const createHealthprofile = async (req , res)=>{
    try{
     const {user_id, height, weight, activity_level, sleep_hours, water_intake, diet_preference, symptoms} = req.body;
     const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
        const query = (
            `INSERT INTO health_profiles (user_id, height, weight, bmi ,activity_level, sleep_hours, water_intake, diet_preference, symptoms)
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
            ON CONFLICT (user_id) 
            DO UPDATE SET
                height = EXCLUDED.height,
                weight = EXCLUDED.weight,
                bmi = EXCLUDED.bmi,
                activity_level = EXCLUDED.activity_level,
                sleep_hours = EXCLUDED.sleep_hours,
                water_intake = EXCLUDED.water_intake,
                diet_preference = EXCLUDED.diet_preference,
                symptoms = EXCLUDED.symptoms,
                updated_at = CURRENT_TIMESTAMP
             RETURNING*`
        )

        const values = [
            user_id, height, weight, bmi , activity_level, sleep_hours, water_intake, diet_preference, symptoms
        ]

        const result  = await pool.query(query , values)
        res.status(200).json({
            message:"Health profile created successfully",
            user:result.rows[0],
        })

    }catch(err){
        res.status(500).json({message:"internal server error"})
    }
}


const getHealthprofile = async(req , res)=>{
   try{
    const {user_id} = req.params;
    const query = (
        `SELECT * FROM health_profiles WHERE profile_id = $1`
    )
    
    const value = user_id;
    const result =  await pool.query(query , value)
    if(!result.rows[0]){
        res.status(404).json({message:"health profile not found"});
    }

    res.status(200).json({
        message:"health successfully fetched",
        user:result.rows[0]
    })

   }catch(err){
    res.status(500).json({message:"internal server error"})
   }
}

const gethealthdashboard = async(req , res)=>{
   try{
     const {user_id} = req.params;
    const query = `
            SELECT 
                COUNT(u.id) AS total_users,
                ROUND(AVG(h.bmi), 2) AS average_bmi,
                ROUND(AVG(h.sleep_hours), 2) AS average_sleep,
                ROUND(AVG(h.water_intake), 2) AS average_water
            FROM users u
            LEFT JOIN health_profiles h ON u.id = h.user_id;
        `;
    
    const value = user_id;
    const result =  await pool.query(query , value)
    if(!result.rows[0]){
        res.status(404).json({message:"health profile not found"});
    }
   }catch(err){
    res.status(500).json({message:"internal server error"})
   }

   res.status(200).json({
        message:"health successfully fetched in dashboard",
        user:result.rows[0]
    })
}

module.exports = {createHealthprofile , getHealthprofile ,gethealthdashboard};
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
            user_id, height, weight, bmi , activity_level, sleep_hours, water_intake, diet_preference, JSON.stringify(symptoms)
        ]

        const result  = await pool.query(query , values)
        res.status(200).json({
            message:"Health profile created successfully",
            user:result.rows[0],
        })

    }catch(err){
        console.log(err.message);
        res.status(500).json({message:"internal server error"})
    }
}


const getHealthprofile = async(req , res)=>{
   try{
    const {id} = req.params;

        const query = `
            SELECT * FROM health_profiles
            WHERE profile_id = $1
        `;

    const result = await pool.query(query, [id]);
    if(!result.rows[0]){
        return res.status(404).json({message:"health profile not found"});
    }

    return res.status(200).json({
        message:"health successfully fetched",
        user:result.rows[0]
    })

   }catch(err){
    console.log(err.message);
    res.status(500).json({message:"internal server error"})
   }
}

const gethealthdashboard = async (req, res) => {
    try {
        const { user_id } = req.params;
        const query = `
            SELECT 
                u.id AS user_id,
                u.name,
                u.email,
                h.height,
                h.weight,
                h.bmi,
                h.activity_level,
                h.sleep_hours,
                h.water_intake,
                h.diet_preference,
                h.symptoms,
                h.updated_at
            FROM users u
            LEFT JOIN health_profiles h ON u.id = h.user_id
            WHERE u.id = $1;
        `;
    
        const result = await pool.query(query, [user_id]);
        
        if (!result.rows[0]) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Dashboard stats successfully fetched",
            dashboard: result.rows[0]
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {createHealthprofile , getHealthprofile ,gethealthdashboard};
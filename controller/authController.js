const pool = require('../db');
const bcrypt = require('bcryptjs');

const register = async(req,res) =>{
    try{
       const {name, email, password_hash, age, gender} = req.body;
       //bcrypt
       const hash = await bcrypt.hash(password_hash,10);
       const result = await pool.query(
        `INSERT INTO users (name , email, password_hash ,age, gender) 
        VALUES ($1, $2 , $3, $4 , $5) RETURNING *`, [name, email , hash , age , gender]
       );
       res.status(200).json({
        message:
        "User registered successfully",
        user:result.rows[0],
       })

    }catch(err){
      res.status(500).json({error:err.message});
    }
   

}

const login = async (req, res)=>{
    try{
       const{email, password_hash} = req.body;
       const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
       )
       // campare password
       const ismatch = bcrypt.compare(password_hash ,result.rows[0].password_hash)
       if(!ismatch){
         return res.status(401).json({message:'Invalid password'})
       }
       res.status(200).json({
        message:'Login successful',
        user:result.rows[0],
    })
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

module.exports = {login , register}
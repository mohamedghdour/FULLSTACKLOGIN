const route = require('express').Router();
const pool = require("../db");
const bcrypt = require('bcrypt');
const saltRound = 10;
const jwtGenerator = require('../utils/jwtGenerator')
const ValidInfo=require('../middleware/ValidInfo')
const authorization=require("../middleware/Auhtorization")
//------registerin-----------------
route.post('/register',ValidInfo ,async (req, res) => {
    try {
        // destricting
        const { nom, prenom, email, password, numero_de_telephone, grade } = req.body
        //verifiying if user exist in db
        const user = await pool.query('SELECT * FROM utilisateur WHERE email=$1', [email])
        if (user.rows.length !== 0) {
            return res.status(401).send("user already exists")
        }
        // hash password 
        const salt = await bcrypt.genSalt(saltRound)
        const hashPwd = await bcrypt.hash(password, salt)
        // inserting data
        const new_user = await pool.query('INSERT INTO utilisateur (nom, prenom, email, password, numero_de_telephone, grade) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
            [nom, prenom, email, hashPwd, numero_de_telephone, grade])
        // create a web token generator
        const token = jwtGenerator(new_user.rows[0].id)
        res.json({ token })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})
//------------------------login-------------------------
// Route de login dans votre fichier backend

route.post('/login', ValidInfo, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query('SELECT * FROM utilisateur WHERE email=$1', [email]);

    if (user.rows.length === 0) {
      console.log('Invalid email');
      return res.status(401).json({ email: "Invalid email" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      console.log('Invalid password');
      return res.status(401).json({ password: "Invalid password" });
    }

    const token = jwtGenerator(user.rows[0].id);

    console.log('Token generated:', token);
    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err.message);
    return res.status(500).json({ error: "Server error" });
  }
});

//---verifying if is true
route.get('/verify',authorization,(req,res) => {
    try {
        res.json(true)
    } catch (err) {
        console.error(err.message)
        return res.status(500).send("Not authorisad")  
    } 

 })
module.exports = route
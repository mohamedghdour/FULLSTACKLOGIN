const route = require('express').Router();
const Auhtorization = require('../middleware/Auhtorization')
const pool = require('../db')
const bcrypt = require('bcrypt')
const saltRound = 10;
//------------------
route.get('/', Auhtorization, async (req, res) => {
    try {
        const user = await pool.query('SELECT id,nom, prenom, email,numero_de_telephone, grade FROM utilisateur WHERE id=$1', [req.user])
        res.json(user.rows)
    } catch (err) {
        console.error('SERVER ERREUR')
        res.status(401).send('NOT AUTHORISAT')
    }
})
route.put('/modify', Auhtorization, async (req, res) => {
    try {
      const { password, newPassword, confirmationNewPassword } = req.body;
  
      const user = await pool.query('SELECT * FROM utilisateur WHERE id=$1', [req.user]);
      const comparePassword = await bcrypt.compare(password, user.rows[0].password);
  
      if (!comparePassword) {
        return res.status(401).json('Ancien mot de passe est incorrect');
      }
  
      if (newPassword === confirmationNewPassword) {
        const salt = await bcrypt.genSalt(saltRound);
        const hashPwd = await bcrypt.hash(newPassword, salt);
        const MaJ = await pool.query('UPDATE utilisateur SET password=$1 WHERE id=$2', [hashPwd, req.user]);
        return res.status(200).json('Mot de passe modifié avec succès');
      } else {
        return res.status(401).json('Les deux mots de passe ne sont pas identiques');
      }
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Internal Server Error');
    }
  });
  


module.exports = route


const Pool=require('pg').Pool
const pool=new Pool({
    user:"postgres",
    password:"1234",
    host:"127.0.0.1",
    port:"5432",
    database:"gestion_du_stock"
})
module.exports=pool;
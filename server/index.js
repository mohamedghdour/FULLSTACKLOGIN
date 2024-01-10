const express=require('express')
const app=express()
const cors=require('cors')
const port=4000
//midleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
//ROUTES

//dashboard

app.use("/dashboard",require('./route/dshboard'))

// registre and login auth
app.use('/auth',require('./route/JwtAuth'))



app.listen(port,()=>{
    console.log(`connected to ${port}`)
})
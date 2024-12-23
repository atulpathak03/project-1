import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoDB.js'
import  connectCloudinary  from './config/cloudinary.js'
import adminRouter from './routes/admin.routes.js'


//app config
const app= express()
const port = process.env.PORT|| 4000
connectDB()
connectCloudinary()

//middleware
app.use(express.json())
app.use(cors())//allow frontend to connect to backend

//api endpoint
app.use('/api/admin',adminRouter) 

app.get('/', (req,res)=>{
    res.send('APIworking')
})

app.listen(port,()=> console.log("servevr started",port))
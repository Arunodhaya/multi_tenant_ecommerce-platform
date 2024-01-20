import express from 'express'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import AuthRoutes from '../src/routes/authRoute'

dotenv.config({ path: __dirname + "/../.env.local" });
dotenv.config({ path: __dirname + "/../.env" });

const app= express();
const port = process.env.APP_PORT;

//Middleware to parse JSON requests
app.use(bodyParser.json())

app.get('/',(req,res)=>{
  res.send("Hello world!")
})

app.use('/auth',AuthRoutes)

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port} `)
})

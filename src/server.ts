import express from 'express'
import bodyParser from 'body-parser'

const app= express();
const port = 8000;

//Middleware to parse JSON requests
app.use(bodyParser.json())

app.get('/',(req,res)=>{
  res.send("Hello world!")
})



app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port} `)
})

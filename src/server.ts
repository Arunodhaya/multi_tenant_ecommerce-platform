import express from 'express'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import AuthRoutes from '../src/routes/authRoute'
import CustomerRoutes from '../src/routes/customerAuth'
import StoreRoutes from '../src/routes/storeRoute'
import ProductCategoryRoutes from '../src/routes/productCategoryRoutes'
import ProductRoutes from '../src/routes/productRoutes'
import CustomerOrderWorkFlowRoutes from '../src/routes/customerOrderWorkFlowRoutes'


dotenv.config({ path: __dirname + "/../.env.local" });
dotenv.config({ path: __dirname + "/../.env" });

const app= express();
const port = process.env.APP_PORT;

//Middleware to parse JSON requests
app.use(bodyParser.json())

app.get('/',(req,res)=>{
  res.send("Hello world!")
})

app.use('/admin/auth',AuthRoutes)
app.use('/admin/store',StoreRoutes)
app.use('/admin/product/product_categories',ProductCategoryRoutes)
app.use('/admin/product',ProductRoutes)

app.use('/customer/auth',CustomerRoutes)
app.use('/customer/orders',CustomerOrderWorkFlowRoutes)


app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port} `)
})

import express from 'express'
import productRouter from './routers/product.route';
import postRouter from './routers/post.route';
import connectDB from './configs/db_config';
import authRouter from "./routers/auth.route";
import commonRouter from "./routers/common.route"
import dotenv from "dotenv";
import path from "path"
dotenv.config();

const app = express();

// connect database:
connectDB();

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.join(__dirname,"uploads")))

app.get('/', (request, response)=> {
  response.send('Hello world')
})

app.use('/api/auth',authRouter);
app.use('/api/products', productRouter);
app.use('/api/posts', postRouter);
app.use('/api',commonRouter)


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
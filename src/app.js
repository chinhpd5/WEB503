import express from 'express'
import productRouter from './routers/product.route';
import postRouter from './routers/post.route';
import connectDB from './configs/db_config';
import authRouter from "./routers/auth.route";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// connect database:
connectDB();

app.use(express.json());

app.get('/', (request, response)=> {
  response.send('Hello world')
})

app.use('/api/auth',authRouter);
app.use('/api/products', productRouter);
app.use('/api/posts', postRouter)


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
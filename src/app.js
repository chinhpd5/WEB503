import express from 'express'
import connectDB from './configs/connectdb';
import dotenv from "dotenv";
dotenv.config();

const app = express();

// connect database:
connectDB();

app.use(express.urlencoded());
app.use(express.json());

app.get('/', (request, response)=> {
  response.send('Hello world')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
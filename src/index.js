import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// kết nối cơ sở dữ liệu
mongoose.connect(process.env.CONNECT_MONGODB_URL || `mongodb://localhost:27017/db_base`)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

app.use(express.json());
app.use(express.urlencoded());

app.get('/',(request, response)=>{
  return response.send("Hello web503")
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

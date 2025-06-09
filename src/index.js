import express from "express";
import mongoose from "mongoose";
import productRouter from './routers/product.router';
import authRouter from './routers/auth.router';
import commonRouter from './routers/common.router';
import path from 'path';
import dotenv from 'dotenv';
import categoryRouter from './routers/category.router';
dotenv.config();

const app = express();

// kết nối cơ sở dữ liệu
mongoose.connect(process.env.CONNECT_MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'uploads')));

app.get('/',(request, response)=>{
  return response.send("Hello chinhpd5")
})

app.use('/auth',authRouter);
app.use('/products',productRouter);
app.use('/category',categoryRouter);
app.use('/',commonRouter);

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});


// b1: mở vsc cùng thư mục web503b
// b2: mở terminal : npm init -y
// b3: cài đặt: npm i express
// b4: tạo file index.js và thêm nội dung
// b5: tại terminal chạy: node index.js
// b6: mở trình duyệt: http://localhost:3000 

// b7: cài đặt thư viện: npm install vite vite-plugin-node -D
// b8: tạo file: vite.config.ts và thêm nội dung
// b9: thay đổi nội dung trong index.js
// b10: thêm "dev": "vite" vào script trong package.json
// b11: npm run dev
import express from "express";
import productRouter from './routers/product.router'

const app = express();

app.use(express.json());
app.use(express.urlencoded())

app.get('/',(request, response)=>{
  return response.send("Hello chinhpd5")
})

app.use('/',productRouter);

app.listen(3000, () => {
    console.log(`Server is running on port http://localhost:3000`);
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
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// b1: mở vsc cùng thư mục web503
// b2: mở terminal : npm init -y
// b3: cài đặt: npm i express
// b4: tạo file index.js và thêm nội dung
// b5: tại terminal chạy: node index.js
// b6: mở trình duyệt: http://localhost:3000 
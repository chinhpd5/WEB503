# WEB503 

---
## Giới thiệu
Đây là `source base` thuộc môn học WEB503. Tài liệu này hướng dẫn cách thiết lập và chạy môi trường phát triển trên máy cá nhân.

---
## Yêu cầu hệ thống
Node.js (phiên bản mới nhất khuyến nghị)

---
## Các bước cài đặt
### Bước 1: Tải mã nguồn
Clone hoặc tải dự án từ GitHub về máy:
```bash
git clone https://github.com/chinhpd5/WEB503.git
```

Sau đó di chuyển vào thư mục dự án:
```bash
cd web503
```

### Bước 2: Cấu hình môi trường
Tạo file `.env` tại thư mục gốc của dự án và sao chép nội dung từ file `.env-copy`:

```bash
cp .env-copy .env
```
> Lưu ý: Đảm bảo file `.env` chứa đầy đủ các biến môi trường cần thiết để ứng dụng hoạt động.

### Bước 3: Cài đặt dependencies
Chạy câu lệnh sau để cài đặt toàn bộ thư viện cần thiết:
```bash
npm install
```

### Bước 4: Khởi chạy dự án
Sau khi cài đặt xong, chạy lệnh sau để khởi chạy ứng dụng ở chế độ phát triển:

```bash
npm run dev
```
>Dự án sẽ được chạy tại địa chỉ: `http://localhost:3000` (hoặc cổng mặc định được cấu hình trong .env).
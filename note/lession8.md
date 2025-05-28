# Authentication và Authorization trong Node.js

Authentication (Xác thực) và Authorization (Ủy quyền) là hai khái niệm cốt lõi trong bảo mật ứng dụng. Trong bài này, chúng ta sẽ tìm hiểu:

1. Authentication và Authorization là gì?
2. Các phương pháp xác thực phổ biến.

---
## 1. Authentication và Authorization là gì?

### 1.1 Authentication (Xác thực)

Xác thực (Authentication) là quá trình kiểm tra danh tính của người dùng hoặc hệ thống. Mục tiêu của xác thực là đảm bảo rằng người dùng thực sự là người họ đã đăng ký hay trả lời câu hỏi *"Bạn là ai?"*

Ví dụ: Một sinh viên hoặc giảng viên muốn vào lớp học. Họ cần xuất trình thẻ sinh viên hoặc thẻ giảng viên để chứng minh danh tính của mình.
Nếu thẻ hợp lệ, họ được phép vào lớp.

### 1.2 Authorization (Ủy quyền)

Ủy quyền `Authorization` là quá trình xác định quyền truy cập của người dùng hoặc hệ thống.
Nó trả lời câu hỏi: *"Bạn được phép làm gì?"*

Ví dụ: 
- Sinh viên được phép tham gia lớp học, nghe giảng, và làm bài tập.
- Giảng viên không chỉ được phép vào lớp học mà còn có quyền giảng bài, quản lý danh sách sinh viên, và chấm điểm.

---
## 2. Các phương pháp xác thực phổ biến

### 2.1 Basic Authentication
Đây là hình thức xác thực cơ bản và phổ biến nhất, nơi người dùng nhập:
- Tên đăng nhập (Username) hoặc email
- Mật khẩu (Password)

Server sẽ kiểm tra thông tin đăng nhập này so với dữ liệu lưu trữ (thường trong cơ sở dữ liệu), và nếu đúng thì cho phép truy cập.

Cách hoạt động cơ bản:
- Với mỗi `request`, phía `client` sẽ gửi thông tin `username` + `password` đã được mã hóa đến `server` thông qua (HTTP hoặc HTTPS).
- `Server` kiểm tra trong cơ sở dữ liệu:
+ Nếu đúng → xác thực thành công → cho phép thực hiện các tác vụ tiếp theo.
+ Nếu sai → trả lỗi `401` `Unauthorized`.


### 2.2 Cookie và Session Authentication
Cookie Authentication và Session Authentication là hai phương pháp phổ biến dùng để xác thực người dùng trong ứng dụng web. Chúng thường đi kèm với nhau, nhưng mỗi cái có vai trò khác nhau. Dưới đây là giải thích chi tiết và sự khác biệt.

Cách hoạt động cơ bản:

- `Cookie Authentication` là hình thức sử dụng HTTP cookie để lưu thông tin xác thực của người dùng trong trình duyệt. Cookie chỉ đơn giản là một nơi lưu trữ thông tin, ví dụ như:
  + `Session ID`
  + `Token` `(JWT)`
  + Dữ liệu tuỳ chỉnh (`rất hạn chế)
- Cookie sẽ được trình duyệt tự động gửi kèm theo mỗi request đến server có cùng domain.

- `Session Authentication` là một cơ chế xác thực
- Người dùng sau khi đăng nhập (gửi `username` + `password`).
- `Server` kiểm tra và tạo một phiên làm việc (session).
- Thông tin phiên `(session ID)` được lưu trong bộ nhớ `server` (Database,RAM, Redis...).
- Server gửi session ID về cho trình duyệt và lưu trữ trong cookie.
- Mỗi request tiếp theo, trình duyệt gửi lại `session ID` để server kiểm tra và xác định người dùng.

### 2.3 Token-based Authentication - JSON Web Token
Token-based Authentication là một phương pháp xác thực người dùng bằng cách sử dụng token thay vì lưu phiên làm việc (session) trên server. Một trong những dạng token phổ biến nhất là JWT (JSON Web Token).

Quy trình:
- Đăng nhập: Người dùng gửi `username/password` đến `server`.
- Tạo `Token`: Nếu hợp lệ, `server` tạo ra `JWT` chứa thông tin người dùng → trả về `client`.
ví dụ:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.
eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwicm9sZSI6ImFkbWluIn0
.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```
- Lưu `Token`: `Client` lưu `JWT` (thường là trong `localStorage`, `sessionStorage`, hoặc `cookie`).
- Gửi `Token`: Với mỗi `request` sau đó, `client` gửi token trong header:
```Authorization: Bearer <JWT>```
- Xác thực: `Server` giải mã `token`, kiểm tra tính hợp lệ (chữ ký, hạn dùng, thông tin...) → nếu đúng thì xử lý `request`.

#### Lưu JWT ở đâu: localStorage hay cookie?
Lưu trong localStorage:
- Ưu điểm:
  + Dễ sử dụng.
  + Không gửi tự động trong mỗi yêu cầu.
- Nhược điểm:
  +Dễ bị tấn công XSS (Cross-Site Scripting).

Lưu trong cookie:
- Ưu điểm:
  + Có thể bảo vệ bằng cách sử dụng HttpOnly và Secure.
  + Tự động gửi trong mỗi yêu cầu.
- Nhược điểm:
  + Dễ bị tấn công CSRF (Cross-Site Request Forgery).

---
## Ví dụ minh họa Sự khác nhau giữa JWT, Cookie và Session-based Authentication

Ví dụ minh họa: Sinh viên gửi xe
Hãy tưởng tượng một sinh viên đến trường và gửi xe. Ông bảo vệ sẽ xử lý theo 2 cách khác nhau:

- Session-based và Cookie-based Authentication:

Ông bảo vệ ghi thông tin xe (biển số, thời gian gửi) vào sổ (tương tự như lưu session trên máy chủ).
Sau đó, ông đưa cho sinh viên một vé xe (tương tự như cookie chứa session ID).
Khi sinh viên quay lại lấy xe, ông kiểm tra vé xe và đối chiếu với thông tin trong sổ.

- JWT-based Authentication:

Ông bảo vệ tạo một vé xe đặc biệt (JWT), trong đó thông tin xe được mã hóa và ký bằng một khóa bí mật.
Vé xe này được đưa cho sinh viên.
Khi sinh viên quay lại, ông bảo vệ kiểm tra tính hợp lệ của vé bằng cách giải mã và xác minh chữ ký, mà không cần lưu trữ thông tin xe ở đâu cả.

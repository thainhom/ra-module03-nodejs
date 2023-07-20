const http = require('fs');
const url = require('url');
const server = http.createServer((request, response) => {
    const { pathname } = url.parse(request.url);

    console.log("pastname", pathname)
    response.writeHead(200, {
        'Content-Type': 'text/html',
    });
    if (pathname === "/user") {
        response.write('Danh sach nguoi dung');
    } else if (pathname === "/products") {
        response.write('Danh sach san pham');
    } else if (pathname === "/order") {
        response.write('Danh sach san pham');
    } else {
        response.write('duong dan khong ton tai');
    }

    response.end();

})
server.listen(8080, '127.0.0.1', () => {
    console.log("server đang chạy trên cổng 8000, vui lòng try cập http://127.0.0.1:8080/ ");
})  
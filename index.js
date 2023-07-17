const http = require('http');
const server = http.createServer((request, response) => {
    const { patname, query } = url.parse(request.url, true);
    response.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF-8',
    });
    let html = '';
    html = `
    <form action=127.0.0.1:8080 method= 'GET' >
    <input type= 'text' name= keyword />
    <input type= 'text' name= course />
    <button type= 'submit'>Tìm kiếm</button>
    </form>
    <p> Tu Khoa:${query.keyword}</p>
    <p>Khoa hoc:${query.course}</p>
    `
    response.write(html);
    response.end();

})
server.listen(8080, '127.0.0.1', () => {
    console.log("server đang chạy trên cổng 8000, vui lòng try cập http://127.0.0.1:8080/ ");
})  
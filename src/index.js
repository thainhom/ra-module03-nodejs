// const express = require('express');
import express from 'express';// phai thêm type "module"
const application = express();
application.use(express.json())
application.use(express.urlencoded());
/////////////
// GET:  Khi lấy dữ liệu
// application.get();

// POST: Khi thêm mới dữ liệu, hoặc truyền lên dữ liệu nhạy cảm (ví dụ: mật khẩu, thông tin mật, ...)
// application.post();

// PUT: Thường sử dụng khi cập nhập dữ liệu
// application.put();

// DELETE: Dùng khi xóa dữ liệu
// application.delete();
///////////
application.get('/', function (req, res) {
    // dùng thuần
    // res.writeHead(200, { 'Content-Type': 'text.html;charset=utf-8' });
    // res.write('<h1>Hello</h1>');
    // res.end()
    // dùng của express
    res.send('<h1>Hello</h1>')
})



application.get('/users', (req, res) => {
    const users = [
        {
            id: 1,
            name: "Thai"
        },
        {
            id: 2,
            name: "Sang"
        },

    ];
    res.send(users);// đây là viết 
})
// đường dẫn tương đối
application.get('/about/*', function (req, res) {
    res.send("Trang đường dẫn tương đối")
})
// ví dụ về param 
application.get("/users/:id", function (req, res) {
    const users = [
        {
            id: 1,
            name: "Thai"
        },
        {
            id: 2,
            name: "Sang"
        },

    ];
    const id = req.params.id;
    const user = users.find(u => u.id == id);
    if (user) {
        res.send(user);
    } else {
        res.send({
            error: "trang không tồn tại"
        })
    }
})
// ví dụ : lấy query string

application.get("/products", (req, res) => {
    const products = [{ id: 1, name: "laptop" }, { id: 2, name: "iphone" }]
    const { keyword, id } = req.query
    const search = products.filter(product => {
        return (keyword && product.name.toLowerCase().includes(keyword.toLowerCase()))
            || product.id == id
    })

    res.send(
        search
    )
})

// Ví dụ: tạo form POST
application.get('/products/add', (req, res) => {
    res.send(`
        <form action="http://localhost:8000/products" method="POST">
            <input name="name" placeholder="Name"/>
            <input name="description" placeholder="Description"/>
            <input name="unit_price" placeholder="Unit price"/>
            <button type="submit">Add</button>
        </form>
    `);
});

// Với method GET: Khi submit thì sẽ nhận dữ liệu payload sẽ lấy thông qua res.query
// Với method POST: Khi submit thì sẽ nhận dữ liệu payload sẽ lấy thông qua res.body
// Ví dụ: POST method
application.post('/products', (req, res) => {
    res.send({
        body: req.body
    });
});

application.listen(8000, () => {
    console.log('server started');
})
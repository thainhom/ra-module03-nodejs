// const express = require('express');
import express from 'express';// phai thêm type "module"
const managaUsers = express();
managaUsers.use(express.json())
managaUsers.use(express.urlencoded());
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
// Quản lý người dùng
// trang chủ
managaUsers.get("/", (rep, res) => {
    const home = `<h1> Xin chao Admin 111 </h1>`
    res.send(home)
})
// searchUsers
managaUsers.get('/users', function (req, res) {
    const users = [{ id: 1, name: "Thai", email: "Thai@gmail.com" }, { id: 2, name: "No", email: "No@gmail.com" }]
    const { keyword } = req.query
    const searchUsers = users.filter(user => {
        return !keyword || (user.name.toLowerCase().includes(keyword.toLowerCase())
            || user.name.toLowerCase().includes(keyword.toLowerCase()));
    })
    res.send(searchUsers)
})
// Thêm mới users
managaUsers.get('/users/add', function (req, res) {
    res.send(`<form action="http://localhost:8000/users" method="POST">
    <input name="name" placeholder="Name"/>
    <input name="email" placeholder="email"/>
    <input name="password" placeholder="password"/>
    <button type="submit">Add</button>
</form>

    `
    )
})
// dung method post
managaUsers.post('/users', (rep, res) => {
    res.send({
        body: rep.body
    });
})
// Cập nhập user method PUT
managaUsers.put('users/:id', (rep, res) => {
    const users = [{ id: 1, name: "thai", email: "Thai@gmail.com" }, { id: 2, name: "no", email: "No@gmail.com" }]
    const id = rep.params.id
    const { name, email, password } = rep.body
    const user = users.pind(u => u.id == id)
    if (user) {
        users.name = name || users.name
        users.email = name || users.email
        users.password = name || users.password

    } else {
        res.status(404).send({
            error: "Đường dẫn không tồn tại "
        })
    }
})
/// delete users
managaUsers.delete('users/:id', (rep, res) => {
    const users = [{ id: 1, name: "thai", email: "Thai@gmail.com" }, { id: 2, name: "no", email: "No@gmail.com" }]
    const id = rep.params.id
    const usersIndex = users.findIndex(user => user.id == id)
    if (usersIndex !== -1) {
        const deleteUser = usersIndex.splice(usersIndex, 1)
        res.send(deleteUser)
    } else {
        res.status(404).send({
            error: 'Người dùng không tồn tại'
        })
    }

})
managaUsers.listen(8000, () => {
    console.log('server started');
})
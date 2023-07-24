// const express = require('express');
import express from 'express'; // Phải thêm "type": "module" ở package.json
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs';

const application = express();

// Cấu hình body parser
// parse application/x-www-form-urlencoded
application.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
application.use(bodyParser.json());

// Cấu hình morgan
const accessLogStream = fs.createWriteStream('src/logs/access.log', { flags: 'a' });
application.use(morgan('combined', { stream: accessLogStream }));

const getNextId = (items) => {
    // Trường hợp 1: nếu items rỗng thì next ID sẽ là 1
    if (items.length === 0) {
        return 1;
    }
    // Trường hợp 2: Nếu items không rỗng thì next ID sẽ bằng ID lớn nhất trong danh sách items + 1
    else {
        // Lấy tất cả ID trong danh sách items lưu vào mảng idList
        const idList = items.map(todo => {
            return todo.id;
        });

        // Lấy giá trị ID lớn nhất trong mảng idList
        const maxId = Math.max(...idList);

        // Trả về next ID: ID lớn nhất trong danh sách items + 1
        return maxId + 1;
    }
}

let users = []

// Search user
application.get('/users', (req, res) => {
    const keyword = req.query.keyword;

    if (keyword !== undefined) {
        const searchUsers = users.filter(user => {
            return user.username.toLowerCase().includes(keyword.toLowerCase())
                || user.email.toLowerCase().includes(keyword.toLowerCase())
                || user.first_name.toLowerCase().includes(keyword.toLowerCase())
                || user.last_name.toLowerCase().includes(keyword.toLowerCase())
        });
        res.send(searchUsers);
    } else {
        res.send(users);
    }
})

// Tạo user
application.post('/users', (req, res) => {
    users.push({
        ...req.body,
        id: getNextId(users),
        created_at: new Date(),
        updated_at: new Date()
    });

    res.status(201) // HTTP status code 201: CREATED
        .send(req.body);
});

// Lấy thông tin 1 user
application.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const user = users.find(user => user.id == id);

    if (user) {
        res.send(user);
    } else {
        res.status(404)
            .send({
                error: 'User not found'
            });
    }
});

application.put('/users/:id', (req, res) => {
    const { id } = req.params;

    // Kiểm tra user với param id có tồn tại không
    const user = users.find(user => user.id == id);

    // Nếu không tồn tại thì trả về lỗi
    if (!user) {
        res.status(404)
            .send({
                error: 'User not found'
            });
    }

    // Lấy request body
    const requestBody = req.body;
    let updatedUser = null;

    users = users.map(user => {
        if (user.id == id) {
            updatedUser = {
                ...user,
                first_name: requestBody.first_name,
                last_name: requestBody.last_name,
                password: requestBody.password ? requestBody.password : user.password,
                role: requestBody.role,
                updated_at: new Date()
            }
            return updatedUser;
        } else {
            return user;
        }
    });

    // Lấy lại user sau khi update
    // const userUpdated = users.find(user => user.id == id);
    res.send(updatedUser)
});

application.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    // Kiểm tra user với param id có tồn tại không
    const user = users.find(user => user.id == id);

    // Nếu không tồn tại thì trả về lỗi
    if (!user) {
        res.status(404)
            .send({
                error: 'User not found'
            });
    }

    users = users.filter(user => user.id != id);
    res.status(204).send(); // HTTP status code 204 (No Content) - thường được sử dụng để trả về sau khi xóa thành công
});

application.listen(8000, () => {
    console.log('Server started');
});
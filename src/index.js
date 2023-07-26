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

let products = [];

// Search prodducts
application.get('/products', (req, res) => {
    const keyword = req.query.keyword;

    if (keyword !== undefined) {
        const searchProduct = products.filter(product => {
            return product.name.toLowerCase().includes(keyword.toLowerCase())
                || product.price.toLowerCase().includes(keyword.toLowerCase())
                || product.color.toLowerCase().includes(keyword.toLowerCase())

        });
        res.send(searchProduct);
    } else {
        res.send(products);
    }
})

// Tạo Products
application.post('/products', (req, res) => {
    products.push({
        ...req.body,
        id: getNextId(products),
        created_at: new Date(),
        updated_at: new Date()
    });

    res.status(201) // HTTP status code 201: CREATED
        .send(req.body);
});
// lấy thông tin một sản phẩm 
application.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(product => product.id == id)
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({
            error: "Sản phẩm không tồn tại "
        })
    }
})
// Cập nhập products
application.put('/products/:id', (req, res) => {
    // kiểm tra lại id có tồn tại hay không
    const { id } = req.params;
    const product = products.find(product => product.id == id)
    if (!product) {
        res.status(404).send({
            error: "Sản phẩm không tồn tại "
        })
    }
    // lấy resquest body
    const requestBody = req.body
    let updateProduct = null;
    products = products.map(product => {
        if (product.id == id) {
            updateProduct = {
                ...product,
                name: requestBody.name || product.name,
                price: requestBody.price || product.price,
                color: requestBody.color || product.color,
                updated_at: new Date()
            }
            return updateProduct
        } else {
            return product
        }

    })

    res.send(updateProduct)


})
// Delete products
application.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(product => product.id == id)
    if (!product) {
        res.status(404).send({
            error: "Sản phẩm không tồn tại "
        })
    }
    products = products.filter(product => product.id != id)
    res.status(204).send(); // HTTP status code 204 (No Content) - thường được sử dụng để trả về sau khi xóa thành công
})



// application.put('/products/:id', (req, res) => {
//     const { id } = req.params;

//     // Kiểm tra user với param id có tồn tại không
//     const product = products.find(user => user.id == id);

//     // Nếu không tồn tại thì trả về lỗi
//     if (!product) {
//         res.status(404)
//             .send({
//                 error: 'User not found'
//             });
//     }

//     // Lấy request body
//     const requestBody = req.body;
//     let updatedProduct = null;

//     users = users.map(user => {
//         if (user.id == id) {
//             updatedProduct = {
//                 ...user,
//                 first_name: requestBody.first_name,
//                 last_name: requestBody.last_name,
//                 password: requestBody.password ? requestBody.password : user.password,
//                 role: requestBody.role,
//                 updated_at: new Date()
//             }
//             return updatedUser;
//         } else {
//             return user;
//         }
//     });

//     // Lấy lại user sau khi update
//     // const userUpdated = users.find(user => user.id == id);
//     res.send(updatedUser)
// });

// application.delete('/products/:id', (req, res) => {
//     const { id } = req.params;

//     // Kiểm tra user với param id có tồn tại không
//     const user = users.find(user => user.id == id);

//     // Nếu không tồn tại thì trả về lỗi
//     if (!user) {
//         res.status(404)
//             .send({
//                 error: 'User not found'
//             });
//     }

//     users = users.filter(user => user.id != id);
//     res.status(204).send(); // HTTP status code 204 (No Content) - thường được sử dụng để trả về sau khi xóa thành công
// });

application.listen(8000, () => {
    console.log('Server started');
});
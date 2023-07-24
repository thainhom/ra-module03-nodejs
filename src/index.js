// const express = require('express');
import express from 'express';// phai thêm type "module"
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs';
const managaUsers = express();
// managaUsers.use(express.json())
// managaUsers.use(express.urlencoded());
// cấu hình bodyParser
// parse application/x-www-form-urlencoded
managaUsers.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
managaUsers.use(bodyParser.json())
// cấu hình morgan
const accessLogStream = fs.createWriteStream('src/logs/access.log', { flags: 'a' });
managaUsers.use(morgan('combined', { stream: accessLogStream }))

managaUsers.get("/users", (req, res) => {

    res.send({
        users: []
    })
})
managaUsers.get('/users/:id', (req, res, next) => {

    if (req.params.id === '0') {
        next('route')
    } else {
        next()
    }
}, (req, res) => {

    res.send({
        id: req.params.id
    })
})
managaUsers.post("/users", (req, res) => {

    res.send({
        req: req.body
    })
})
managaUsers.listen(8000, () => {
    console.log('server started');
})
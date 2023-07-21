// const express = require('express');
import express from 'express';// phai thêm 
const application = express();
application.listen(8000, () => {
    console.log('server started');
})
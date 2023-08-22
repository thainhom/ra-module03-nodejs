import { Router } from "express";
import multer from 'multer';
import productController from '../application/controller/product.controller.js';
import orderController from '../application/controller/order.controller.js';
import contactController from '../application/controller/contact.controller.js';
import authMiddleware from "./middlewares/auth.middleware.js";

import uploadConfig from '../config/upload.config.js';

import authController from "./controller/auth.controller.js";
import userController from "./controller/user.controller.js";

// https://expressjs.com/en/resources/middleware/multer.html
const upload = multer(uploadConfig);

const router = Router();

router.use(authMiddleware);

// Authentication
router.post('/login', authController.login);
router.get('/auth', authController.getAuth); // Lấy thông tin người dùng đang đăng nhập
router.post('/logout', authController.logout);
router.post('/register', authController.register);

// User management
router.get('/users', userController.searchUsers);
router.post('/users', upload.single('avatar'), userController.addUser);
router.get('/users/:id', userController.getDetailUser);
router.put('/users/:id', upload.single('avatar'), userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// product management
router.get('/products', productController.searchProduct);
router.post('/products', upload.array('image'), productController.addProduct);
router.get('/products/:id', productController.getDetailProduct);
router.put('/products/:id', upload.array('image'), productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// order management
router.get('/orders', orderController.searchOrder);
router.post('/orders', orderController.addOrder);
router.get('/orders/:id', orderController.getDetailOrder);
router.put('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);

// contact management
router.get('/contacts', contactController.searchContact);
router.post('/contacts', contactController.addContact);
router.get('/contacts/:id', contactController.getDetailContact);
router.put('/contacts/:id', contactController.updateContact);
router.delete('/contacts/:id', contactController.deleteContact);

export default router;

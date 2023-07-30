import { Router } from "express";
import userController from "./controller/user.controller.js";
import productController from "./controller/product.controller.js";
import todoController from './controller/todolist.controller.js'
const router = Router();


// User management
router.get('/users', userController.searchUsers);
router.get('/users/new', userController.viewAddUser);
router.post('/users', userController.addUser);
router.get('/users/:id', userController.getDetailUser);
router.get('/users/:id/edit', userController.viewEditUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Product management
router.get('/products', productController.searchProducts);
router.get('/products/new', productController.viewAddProducts);
router.post('/products', productController.addProduct);
router.get('/products/:id', productController.getDetailProduct);
router.get('/products/:id/edit', productController.viewEditProducts);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
// Order management

// Contact management
// todolist management
router.get('/todoapps', todoController.searchtodoapps);
router.get('/todoapps/new', todoController.viewAddtodoapps);
router.post('/todoapps', todoController.addtodoapps);
router.get('/todoapps/:id', todoController.getDetailtodoapps);
router.get('/todoapps/:id/edit', todoController.viewEdittodoapps);
router.put('/todoapps/:id', todoController.updatetodoapps);
router.delete('/todoapps/:id', todoController.deletetodoapps);
// Order management

export default router;
import e from "express";
import getNextId from "../utilities/getNextId.js";
let products = [
    {
        id: 1,
        name: "iphone 11",
        price: 7000,
        color: "black",

    },
    {
        id: 2,
        name: "iphone 14",
        price: 1100,
        color: 'purple',
    }
];
// Trả về trang HTML hiên thị danh sach products

const searchProducts = (req, res) => {
    res.render('pages/products/index', {
        title: 'Danh sách Sản Phẩm',
        products: products

    })



}
// chuyển trang  Trả về cây HTML form Để thêm mới sản phẩm
const viewAddProducts = (req, res) => {
    res.render('pages/products/new')

}
// Thêm mới products từ form thêm mới products
const addProduct = (req, res) => {
    const input = req.body
    const newProducts = {
        ...input,
        id: getNextId(products),
    }
    products.push(newProducts)
    // chuyển về trang danh sách products dùng method redirect để chuyển 
    res.redirect('/products')
}
const getDetailProduct = (req, res) => {

}
const viewEditProducts = (req, res) => {
    const { id } = req.params
    const product = products.find(product => product.id == id)
    if (product) {
        res.render('pages/products/edit', {
            product: product
        })

    } else {
        res.render('errors/404', {
            msg: 'Người dùng không tồn tại'
        })
    }

}
const updateProduct = (req, res) => {
    const { id } = req.params
    const bodyProducts = req.body
    products = products.map(product => {
        if (product.id == id) {
            return {
                ...product,
                name: bodyProducts.name,
                price: bodyProducts.price,
                color: bodyProducts.color
            }
        } else {
            return product
        }

    })
    // chuyển hướng về trang danh sách sản phẩm
    res.redirect('/products')

}
// 
const deleteProduct = (req, res) => {
    const { id } = req.params
    const product = products.find(product => product.id == id)
    if (product) {
        products = products.filter(product => product.id != id)
        // chuyển hướng về danh sách sản phẩm
        res.redirect('/products')

    } else {
        res.redirect('error/404', {
            msg: 'người dùng không tồn tại'
        })
    }

}
export default {
    searchProducts,
    viewAddProducts,
    addProduct,
    getDetailProduct,
    viewEditProducts,
    updateProduct,
    deleteProduct

}

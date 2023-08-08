import productRepositories from "../repositories/product.repositories.js";

const searchProduct = (params, callback) => {
    if (!(/^[0-9]+$/.test(params.limit))) {
        callback({ message: 'limit phải là số' }, null)
    } else if (!(/^[0-9]+$/.test(params.page))) {
        callback({ message: 'Page phải là số' }, null)
    } else {
        productRepositories.searchProduct(params, (error, result) => {
            if (error) {
                callback(error, null)
            } else {
                callback(null, result)
            }
        })
    }


}
const addProduct = (request, response) => {

}
const getDetailProduct = (id, callback) => {
    if (!(/^[0-9]+$/.test(id))) {
        callback({
            message: 'ID phải là số'
        }, null)
    } else {
        productRepositories.getDetailProduct(id, (error, result) => {
            if (error) {
                callback(error, null)
            } else if (result.length === 0) {
                callback({
                    message: 'user not found'
                }, null)
            }
            else {
                callback(null, result)
            }
        })
    }

}
const updateProduct = (request, response) => {

}
const deleteProduct = (id, callback) => {
    if (!(/^[0-9]+$/.test(id))) {
        callback({ message: 'Id phải là số' }, null)
    } else {
        productRepositories.deleteProduct(id, (error, result) => {
            if (error) {
                callback(
                    error, null
                );
            } else {
                callback(null, result)
            }
        })
    }


}
export default {
    searchProduct,
    addProduct,
    getDetailProduct,
    updateProduct,
    deleteProduct
}
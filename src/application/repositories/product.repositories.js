import getConnection from "../../config/connection.database.js"
const searchProduct = (params, callback) => {
    const connection = getConnection()
    let sql = 'SELECT * FROM products';
    const bindParams = [];
    const page = params.page || 1;
    const limit = params.limit || 5
    const offset = (page - 1) * limit;
    if (params.name) {
        const name = '%' + params.name + '%';
        sql += ' WHERE name LIKE ?';
        bindParams.push(name)
    }
    sql += ` LIMIT ${limit} OFFSET ${offset}`
    connection.query(sql, bindParams, (error, result) => {
        if (error) {
            callback(error, null)
        } else {
            callback(null, result)
        }
    })

}
const addProduct = (request, response) => {

}
const getDetailProduct = (id, callback) => {
    const connection = getConnection();
    connection.query('SELECT * FROM products where product_id = ?', [id], (error, result) => {
        if (error) {
            callback(error, null)

        } else {
            callback(null, result)
        }
    });
    connection.end()
}
const updateProduct = (request, response) => {

}
const deleteProduct = (id, callback) => {
    const connection = getConnection();
    connection.query('DELETE FROM products WHERE product_id = ?', [id], (error, result) => {
        if (error) {
            callback(error, null)
        } else {
            callback(null, result)
        }
    })
    connection.end()
}
export default {
    searchProduct,
    addProduct,
    getDetailProduct,
    updateProduct,
    deleteProduct
}